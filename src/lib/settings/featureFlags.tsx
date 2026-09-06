import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sbSelect, sbUpdate, supabaseConfigured } from "@/lib/supabase/client";

/**
 * Per-profile feature toggles, stored in `profiles.settings` (jsonb).
 * Each home-screen button reads its own flag and renders or hides itself.
 */

export interface FeatureFlags {
  brain_games: boolean;
  mapping: boolean;
  camera_id: boolean;
  contacts: boolean;
  voice_nav: boolean;
  caregiver_mode: boolean;
}

export type FeatureKey = keyof FeatureFlags;

export const DEFAULT_FLAGS: FeatureFlags = {
  brain_games: true,
  mapping: true,
  camera_id: true,
  contacts: true,
  voice_nav: true,
  caregiver_mode: false,
};

/** Labels the caregiver sees on the settings screen. */
export const FEATURE_LABELS: Record<FeatureKey, { title: string; hint: string }> = {
  brain_games: { title: "Brain games", hint: "Puzzles and memory games on the home screen." },
  mapping: { title: "Maps & directions", hint: "The big map and driving directions." },
  camera_id: { title: "Camera ID", hint: "Point the camera at a person or object to identify it." },
  contacts: { title: "Contacts", hint: "The saved list of people and their addresses." },
  voice_nav: {
    title: "Voice navigation",
    hint: 'Say a name — "take me to Johnny" — to start a trip.',
  },
  caregiver_mode: {
    title: "Caregiver mode",
    hint: "Show the settings screen and caregiver tools.",
  },
};

const STORAGE_KEY = "feature_flags";

export function mergeFlags(raw: unknown): FeatureFlags {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_FLAGS };
  const record = raw as Record<string, unknown>;
  const merged = { ...DEFAULT_FLAGS };
  for (const key of Object.keys(DEFAULT_FLAGS) as FeatureKey[]) {
    const value = record[key];
    if (typeof value === "boolean") merged[key] = value;
  }
  return merged;
}

function readLocal(): FeatureFlags {
  if (typeof window === "undefined") return { ...DEFAULT_FLAGS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? mergeFlags(JSON.parse(raw)) : { ...DEFAULT_FLAGS };
  } catch {
    return { ...DEFAULT_FLAGS };
  }
}

function writeLocal(flags: FeatureFlags): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch {
    /* storage unavailable — flags stay in memory */
  }
}

export async function fetchFlags(profileId: string): Promise<FeatureFlags> {
  if (!supabaseConfigured()) return readLocal();
  const rows = await sbSelect<{ settings: unknown }>(
    "profiles",
    `select=settings&id=eq.${profileId}&limit=1`,
  );
  return mergeFlags(rows[0]?.settings);
}

export async function persistFlags(profileId: string, flags: FeatureFlags): Promise<void> {
  writeLocal(flags);
  if (!supabaseConfigured()) return;
  await sbUpdate("profiles", `id=eq.${profileId}`, { settings: flags });
}

interface FeatureFlagsContextValue {
  flags: FeatureFlags;
  loading: boolean;
  setFlag: (key: FeatureKey, value: boolean) => void;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextValue>({
  flags: DEFAULT_FLAGS,
  loading: false,
  setFlag: () => {},
});

export function FeatureFlagsProvider({
  profileId,
  children,
}: {
  profileId?: string | null;
  children: ReactNode;
}) {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS);
  const [loading, setLoading] = useState(Boolean(profileId));

  useEffect(() => {
    let cancelled = false;
    if (!profileId) {
      setFlags(readLocal());
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchFlags(profileId)
      .then((f) => !cancelled && setFlags(f))
      .catch(() => !cancelled && setFlags(readLocal()))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [profileId]);

  const setFlag = useCallback(
    (key: FeatureKey, value: boolean) => {
      setFlags((prev) => {
        const next = { ...prev, [key]: value };
        void persistFlags(profileId ?? "", next).catch(() => {});
        return next;
      });
    },
    [profileId],
  );

  const value = useMemo(() => ({ flags, loading, setFlag }), [flags, loading, setFlag]);
  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>;
}

export function useFeatureFlags(): FeatureFlagsContextValue {
  return useContext(FeatureFlagsContext);
}

export function useFeature(key: FeatureKey): boolean {
  return useFeatureFlags().flags[key];
}

/** Wrap a home-screen button: it renders itself only when its flag is on. */
export function FeatureGate({ flag, children }: { flag: FeatureKey; children: ReactNode }) {
  return useFeature(flag) ? <>{children}</> : null;
}
