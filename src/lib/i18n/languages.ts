/**
 * Supported languages for the Senior Sidekick global experience.
 *
 * Launch set: English, French, Spanish, Hindi. Each entry carries the
 * locale tag used for date/number formatting and the writing direction,
 * so localisation is never just a swapped string table.
 */
export type LanguageCode = "en" | "fr" | "es" | "hi";

export interface LanguageOption {
  code: LanguageCode;
  /** BCP-47 tag used for Intl date/number formatting. */
  locale: string;
  englishName: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  /** Sample voice name shown in the language picker. */
  voice: string;
}

/** The canonical fallback, also the first entry of LANGUAGES. */
const ENGLISH: LanguageOption = {
  code: "en",
  locale: "en-US",
  englishName: "English",
  nativeName: "English",
  dir: "ltr",
  voice: "Ellis",
};

export const LANGUAGES: LanguageOption[] = [
  ENGLISH,
  {
    code: "fr",
    locale: "fr-FR",
    englishName: "French",
    nativeName: "Français",
    dir: "ltr",
    voice: "Amélie",
  },
  {
    code: "es",
    locale: "es-ES",
    englishName: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    voice: "Mateo",
  },
  {
    code: "hi",
    locale: "hi-IN",
    englishName: "Hindi",
    nativeName: "हिन्दी",
    dir: "ltr",
    voice: "Aarav",
  },
];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function isLanguageCode(value: string): value is LanguageCode {
  return LANGUAGES.some((l) => l.code === value);
}

export function languageOption(code: LanguageCode): LanguageOption {
  return LANGUAGES.find((l) => l.code === code) ?? ENGLISH;
}

/** Best-effort match of a browser locale (e.g. "fr-CA", "hi-IN") to a supported language. */
export function detectBrowserLanguage(): LanguageCode {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  for (const raw of navigator.languages ?? [navigator.language]) {
    const short = raw.slice(0, 2).toLowerCase();
    if (isLanguageCode(short)) return short;
  }
  return DEFAULT_LANGUAGE;
}

/** Locale-correct long date — one of the small things that makes a product feel local. */
export function formatLongDate(code: LanguageCode, date: Date): string {
  return new Intl.DateTimeFormat(languageOption(code).locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

/** Locale-correct clock time, 12h or 24h per the region's own convention. */
export function formatTime(code: LanguageCode, hour: number, minute = 0): string {
  const d = new Date(2024, 0, 1, hour, minute);
  return new Intl.DateTimeFormat(languageOption(code).locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}
