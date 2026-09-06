import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Accessibility preferences, stored per visitor and applied as data
 * attributes on <html>. The CSS in styles.css re-declares design tokens
 * under those attributes, so a preference changes the whole site
 * consistently instead of patching individual components.
 */

export type TextScale = "normal" | "large" | "xlarge";
export type ContrastMode = "normal" | "high";
export type MotionMode = "full" | "reduced";

export interface AccessibilityPrefs {
  textScale: TextScale;
  contrast: ContrastMode;
  motion: MotionMode;
}

const DEFAULTS: AccessibilityPrefs = { textScale: "normal", contrast: "normal", motion: "full" };
const STORAGE_KEY = "sidekick.a11y";

interface AccessibilityContextValue extends AccessibilityPrefs {
  setTextScale: (value: TextScale) => void;
  setContrast: (value: ContrastMode) => void;
  setMotion: (value: MotionMode) => void;
  reset: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function readStored(): AccessibilityPrefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<AccessibilityPrefs>) };
  } catch {
    return DEFAULTS;
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(DEFAULTS);

  useEffect(() => {
    setPrefs(readStored());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-text-scale", prefs.textScale);
    root.setAttribute("data-contrast", prefs.contrast);
    root.setAttribute("data-motion", prefs.motion);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* storage can be unavailable (private mode); preferences just don't persist */
    }
  }, [prefs]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...prefs,
      setTextScale: (textScale) => setPrefs((p) => ({ ...p, textScale })),
      setContrast: (contrast) => setPrefs((p) => ({ ...p, contrast })),
      setMotion: (motion) => setPrefs((p) => ({ ...p, motion })),
      reset: () => setPrefs(DEFAULTS),
    }),
    [prefs],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within an AccessibilityProvider");
  return ctx;
}

/** True when either the OS or the visitor has asked for calmer motion. */
export function usePrefersCalm(): boolean {
  const { motion } = useAccessibility();
  const [osReduced, setOsReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOsReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setOsReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return motion === "reduced" || osReduced;
}
