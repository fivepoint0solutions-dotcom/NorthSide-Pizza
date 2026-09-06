export interface Contact {
  id: string;
  user_id?: string;
  name: string;
  /** Short spoken name — "Johnny" matches even when name is "Johnny Smith". */
  nickname?: string | null;
  phone?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  /** Address string that produced lat/lng. Guards against re-geocoding. */
  geocoded_address?: string | null;
  geocoded_at?: string | null;
}

export interface Coords {
  lat: number;
  lng: number;
}

export type NavFailure =
  | { ok: false; reason: "not_found"; message: string }
  | { ok: false; reason: "no_location"; message: string };

export type NavResult = { ok: true; contact: Contact; coords: Coords } | NavFailure;

export interface MatchResult {
  contact: Contact;
  score: number;
  matchedOn: string;
}
