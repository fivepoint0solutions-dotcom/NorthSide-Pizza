/**
 * Best-effort voice selection for the browser's built-in speech synthesis.
 *
 * Left unset, `SpeechSynthesisUtterance` picks whatever the platform's
 * first-listed voice for that language is — on most Android/Chrome setups
 * that's a low-quality offline "compact" voice, even when a much better
 * network voice (Google, Natural, Enhanced, Neural) is available for the
 * same language right there in the list. This picks the best one available
 * rather than leaving it to chance.
 *
 * This is a genuine ceiling: it's still the browser's own synthesis engine,
 * not a studio voice. A real upgrade — matching what the production app's
 * own voice engine sounds like — means either a paid TTS API wired in behind
 * a server call, or pre-recorded audio for this demo's small, fixed set of
 * scripted answers. Both are real decisions (cost, and which service) that
 * need to be made deliberately, not defaulted into.
 */

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) cachedVoices = voices;
  return cachedVoices;
}

/** Call once on mount somewhere in the app — voice lists load async in some browsers. */
export function primeVoices(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

const QUALITY_HINTS = ["natural", "neural", "enhanced", "premium", "wavenet", "google"];
const LOW_QUALITY_HINTS = ["compact", "novelty", "eloquence"];

/** The best available voice for a BCP-47 locale, or null to let the browser pick. */
export function pickVoice(locale: string): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (!voices.length) return null;

  const lang = locale.split("-")[0]!.toLowerCase();
  const candidates = voices.filter(
    (v) => v.lang.toLowerCase() === locale.toLowerCase() || v.lang.toLowerCase().startsWith(lang),
  );
  if (!candidates.length) return null;

  const exact = candidates.filter((v) => v.lang.toLowerCase() === locale.toLowerCase());
  const pool = exact.length ? exact : candidates;

  const score = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    if (LOW_QUALITY_HINTS.some((hint) => name.includes(hint))) return -1;
    let s = 0;
    if (QUALITY_HINTS.some((hint) => name.includes(hint))) s += 2;
    if (!v.localService) s += 1; // network voices are usually the better ones
    return s;
  };

  return [...pool].sort((a, b) => score(b) - score(a))[0] ?? null;
}
