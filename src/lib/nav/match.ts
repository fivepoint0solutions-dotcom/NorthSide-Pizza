import type { Contact, MatchResult } from "./types";

/** Phrases people say around a name; stripped before matching. */
const LEAD_PHRASES = [
  "take me to",
  "take me over to",
  "navigate to",
  "navigate me to",
  "directions to",
  "drive to",
  "drive me to",
  "go to",
  "get me to",
  "let's go to",
  "lets go to",
  "i want to go to",
  "i want to see",
  "head to",
  "over to",
  "to",
];

/** Spoken honorifics, folded onto how they're usually typed in a contact list. */
const HONORIFICS: Record<string, string> = {
  doctor: "dr",
  mister: "mr",
  missus: "mrs",
  misses: "mrs",
  miss: "ms",
  aunty: "aunt",
  auntie: "aunt",
  grandmother: "grandma",
  grandfather: "grandpa",
};

const TRAIL_WORDS = ["house", "home", "place", "apartment", "condo", "s house", "s place"];

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((token) => HONORIFICS[token] ?? token)
    .join(" ");
}

/** Drop a leading title so "patel" still finds "Dr. Patel". */
function stripHonorific(text: string): string {
  const [first, ...rest] = text.split(" ");
  if (rest.length && first && Object.values(HONORIFICS).includes(first)) return rest.join(" ");
  return text;
}

/** Pull the likely name out of a spoken phrase. */
export function extractName(transcript: string): string {
  let t = normalize(transcript);
  for (const phrase of LEAD_PHRASES) {
    const p = `${phrase} `;
    if (t.startsWith(p)) {
      t = t.slice(p.length);
      break;
    }
  }
  for (const word of TRAIL_WORDS) {
    if (t.endsWith(` ${word}`)) t = t.slice(0, -(word.length + 1));
  }
  return t.trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min((row[j - 1] ?? 0) + 1, (prev[j] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
    }
    prev = row;
  }
  return prev[b.length] ?? 0;
}

/** 0..1 similarity between two normalized strings. */
export function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const longest = Math.max(a.length, b.length);
  return 1 - levenshtein(a, b) / longest;
}

/** Best score of a spoken phrase against one candidate label. */
function scoreCandidate(spoken: string, candidate: string): number {
  const c = normalize(candidate);
  if (!c) return 0;
  if (spoken === c) return 1;

  let best = similarity(spoken, c);

  // Token-level: "johnny" should hit "johnny smith" hard.
  for (const token of c.split(" ")) {
    if (!token) continue;
    if (token === spoken) best = Math.max(best, 0.97);
    else if (token.startsWith(spoken) && spoken.length >= 3) best = Math.max(best, 0.9);
    else best = Math.max(best, similarity(spoken, token) * 0.95);
  }
  if (c.startsWith(spoken) && spoken.length >= 3) best = Math.max(best, 0.92);

  const bareCandidate = stripHonorific(c);
  const bareSpoken = stripHonorific(spoken);
  if (bareCandidate !== c || bareSpoken !== spoken) {
    best = Math.max(best, similarity(bareSpoken, bareCandidate) * 0.95);
  }
  return best;
}

export interface MatchOptions {
  /** Below this, treat as "I didn't catch a name". */
  threshold?: number;
  /** Top two within this gap -> ambiguous, ask which one. */
  ambiguityGap?: number;
}

export interface MatchOutcome {
  status: "match" | "ambiguous" | "none";
  best?: MatchResult;
  runnerUp?: MatchResult;
}

/**
 * Fuzzy-match a transcript against nickname + name.
 * Pure and client-side: same list the Vapi tool will later resolve server-side.
 */
export function matchContact(
  transcript: string,
  contacts: Contact[],
  options: MatchOptions = {},
): MatchOutcome {
  const threshold = options.threshold ?? 0.72;
  const gap = options.ambiguityGap ?? 0.06;
  const spoken = extractName(transcript);
  if (!spoken) return { status: "none" };

  const scored: MatchResult[] = [];
  for (const contact of contacts) {
    const labels = [contact.nickname ?? "", contact.name];
    let best = 0;
    let matchedOn = contact.name;
    for (const label of labels) {
      const s = scoreCandidate(spoken, label);
      if (s > best) {
        best = s;
        matchedOn = label;
      }
    }
    scored.push({ contact, score: best, matchedOn });
  }

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score < threshold) return { status: "none" };

  const runnerUp = scored[1];
  if (runnerUp && best.score - runnerUp.score < gap) {
    return { status: "ambiguous", best, runnerUp };
  }
  return { status: "match", best };
}

export const NO_MATCH_MESSAGE = "I didn't catch a name — try again";
