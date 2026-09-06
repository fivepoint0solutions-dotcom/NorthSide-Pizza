import { sbSelect, sbUpsert, supabaseConfigured } from "@/lib/supabase/client";
import { geocodeAddress } from "./geocode";
import type { Contact } from "./types";

const TABLE = "contacts";
const SELECT = "id,user_id,name,nickname,phone,address,lat,lng,geocoded_address,geocoded_at";

export async function listContacts(userId?: string): Promise<Contact[]> {
  if (!supabaseConfigured()) return [];
  const filter = userId ? `&user_id=eq.${userId}` : "";
  return sbSelect<Contact>(TABLE, `select=${SELECT}${filter}&order=name.asc`);
}

export async function getContact(id: string): Promise<Contact | null> {
  const rows = await sbSelect<Contact>(TABLE, `select=${SELECT}&id=eq.${id}&limit=1`);
  return rows[0] ?? null;
}

/** True when the stored coords are still valid for the address on the row. */
export function isGeocodeCurrent(
  contact: Pick<Contact, "address" | "lat" | "lng" | "geocoded_address">,
): boolean {
  if (contact.lat == null || contact.lng == null) return false;
  const address = (contact.address ?? "").trim();
  if (!address) return false;
  return (contact.geocoded_address ?? "").trim() === address;
}

/**
 * Save a contact, geocoding the address exactly once.
 *
 * The Mapbox call fires only when the address is new or changed; an unchanged
 * address reuses the stored lat/lng forever, so no trip ever re-geocodes.
 */
export async function saveContact(input: Partial<Contact> & { name: string }): Promise<Contact> {
  const row: Record<string, unknown> = { ...input };
  const address = (input.address ?? "").trim();

  if (address && !isGeocodeCurrent(input)) {
    const hit = await geocodeAddress(address);
    if (hit) {
      row["lat"] = hit.lat;
      row["lng"] = hit.lng;
      row["geocoded_address"] = address;
      row["geocoded_at"] = new Date().toISOString();
    } else {
      row["lat"] = null;
      row["lng"] = null;
      row["geocoded_address"] = null;
      row["geocoded_at"] = null;
    }
  }
  if (!address) {
    row["address"] = null;
  }

  const saved = await sbUpsert<Contact>(TABLE, row);
  const first = saved[0];
  if (!first) throw new Error("Contact save returned no row.");
  return first;
}

/** One-off repair pass: geocode rows that have an address but no coords. */
export async function backfillGeocodes(userId?: string): Promise<number> {
  const contacts = await listContacts(userId);
  let count = 0;
  for (const c of contacts) {
    if ((c.address ?? "").trim() && !isGeocodeCurrent(c)) {
      await saveContact(c);
      count += 1;
    }
  }
  return count;
}
