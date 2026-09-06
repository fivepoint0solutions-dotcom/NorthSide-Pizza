import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  detectBrowserLanguage,
  isLanguageCode,
  languageOption,
  type LanguageCode,
} from "./languages";
import { TRANSLATIONS, type TranslationKey } from "./translations";

export type { LanguageCode, LanguageOption } from "./languages";
export { LANGUAGES, formatLongDate, formatTime, languageOption } from "./languages";
export type { TranslationKey } from "./translations";

const STORAGE_KEY = "sidekick.language";

/** Plain (non-hook) lookup usable outside React. */
export function translate(
  language: LanguageCode,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  const raw = TRANSLATIONS[language]?.[key] ?? TRANSLATIONS[DEFAULT_LANGUAGE][key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}

/**
 * Resolution order: an explicit `?lang=` in the URL, then the visitor's
 * stored choice, then their browser. The URL wins so a localised page can be
 * linked, shared and crawled — which is also what the hreflang alternates in
 * `lib/site/seo.ts` point at.
 */
function readInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl && isLanguageCode(fromUrl)) return fromUrl;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isLanguageCode(stored)) return stored;
  return detectBrowserLanguage();
}

/** Keeps `?lang=` in step with the choice, without a navigation. */
function syncLanguageParam(language: LanguageCode) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (language === DEFAULT_LANGUAGE) url.searchParams.delete("lang");
  else url.searchParams.set("lang", language);
  window.history.replaceState(window.history.state, "", url);
}

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start from the default so SSR markup and first client paint agree;
  // the stored/browser preference is applied in an effect.
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    setLanguageState(readInitialLanguage());
  }, []);

  // Keep the document in sync so screen readers announce content in the right
  // language and `lang`-scoped typography rules apply.
  useEffect(() => {
    const option = languageOption(language);
    document.documentElement.lang = language;
    document.documentElement.dir = option.dir;
  }, [language]);

  const setLanguage = useCallback((next: LanguageCode) => {
    setLanguageState(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: the choice still applies, it just doesn't persist */
    }
    syncLanguageParam(next);
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

export type TFunction = (key: TranslationKey, vars?: Record<string, string | number>) => string;

export function useT(): TFunction {
  const { language } = useLanguage();
  return useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => translate(language, key, vars),
    [language],
  );
}
