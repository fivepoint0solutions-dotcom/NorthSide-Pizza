/**
 * Dependency-free Supabase REST (PostgREST) client.
 *
 * Swap for `@supabase/supabase-js` later without touching callers: the only
 * surface used elsewhere is `sbSelect` / `sbUpsert` / `sbUpdate`.
 */

const URL_ = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const KEY_ = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export function supabaseConfigured(): boolean {
  return Boolean(URL_ && KEY_);
}

/** Set after login so RLS sees the user. Falls back to the anon key. */
let accessToken: string | null = null;
export function setSupabaseAccessToken(token: string | null): void {
  accessToken = token;
}

function headers(extra?: Record<string, string>): Record<string, string> {
  return {
    apikey: KEY_ ?? "",
    Authorization: `Bearer ${accessToken ?? KEY_ ?? ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  if (!URL_ || !KEY_) {
    throw new Error("Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).");
  }
  const res = await fetch(`${URL_}/rest/v1/${path}`, init);
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function sbSelect<T>(table: string, query = ""): Promise<T[]> {
  const q = query ? `?${query}` : "";
  return request<T[]>(`${table}${q}`, { method: "GET", headers: headers() });
}

export function sbUpsert<T>(table: string, row: Record<string, unknown>): Promise<T[]> {
  return request<T[]>(`${table}?on_conflict=id`, {
    method: "POST",
    headers: headers({ Prefer: "resolution=merge-duplicates,return=representation" }),
    body: JSON.stringify(row),
  });
}

export function sbUpdate<T>(
  table: string,
  filter: string,
  patch: Record<string, unknown>,
): Promise<T[]> {
  return request<T[]>(`${table}?${filter}`, {
    method: "PATCH",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(patch),
  });
}
