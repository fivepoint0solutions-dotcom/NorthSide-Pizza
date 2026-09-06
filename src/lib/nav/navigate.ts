import { getContact } from "./contacts";
import type { Contact, NavResult } from "./types";

/**
 * The single navigation seam.
 *
 * Today: the client fuzzy-matches a spoken name to a contact id and calls this.
 * Later: Vapi calls `navigate_to(contact_id)` as a tool and hits the same
 * function. Nothing in the map or geocoding layer changes either way.
 */

type Opener = (result: Extract<NavResult, { ok: true }>) => void;

let opener: Opener | null = null;

/** Registered once by the app shell (routes to the Big Map view). */
export function setNavigationOpener(fn: Opener | null): void {
  opener = fn;
}

export async function navigateTo(
  contactId: string,
  preloaded?: Contact | null,
): Promise<NavResult> {
  const contact = preloaded ?? (await getContact(contactId));
  if (!contact) {
    return { ok: false, reason: "not_found", message: "I couldn't find that contact." };
  }
  if (contact.lat == null || contact.lng == null) {
    return {
      ok: false,
      reason: "no_location",
      message: `${contact.nickname ?? contact.name} doesn't have an address saved yet.`,
    };
  }

  const result = { ok: true as const, contact, coords: { lat: contact.lat, lng: contact.lng } };
  opener?.(result);
  return result;
}

/** Shape of the tool Vapi will call. Kept here so both paths stay identical. */
export const NAVIGATE_TO_TOOL = {
  name: "navigate_to",
  description: "Open the big map and start driving directions to a saved contact.",
  parameters: {
    type: "object",
    properties: {
      contact_id: { type: "string", description: "The contact's id from the contacts table." },
    },
    required: ["contact_id"],
  },
} as const;
