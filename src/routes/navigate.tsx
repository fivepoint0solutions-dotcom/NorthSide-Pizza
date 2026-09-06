import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { BigMapView } from "@/components/nav/BigMapView";
import { VoiceNavButton } from "@/components/nav/VoiceNavButton";
import { listContacts } from "@/lib/nav/contacts";
import { navigateTo, setNavigationOpener } from "@/lib/nav/navigate";
import type { Contact, Coords, NavResult } from "@/lib/nav/types";
import { useFeature } from "@/lib/settings/featureFlags";

type Active = { contact: Contact; coords: Coords };

/** Shown when Supabase isn't wired yet, so the screen is still testable. */
const DEMO_CONTACTS: Contact[] = [
  {
    id: "demo-johnny",
    name: "Johnny Smith",
    nickname: "Johnny",
    address: "1 Ferry Building, San Francisco, CA",
    lat: 37.7955,
    lng: -122.3937,
  },
  {
    id: "demo-margaret",
    name: "Margaret Doyle",
    nickname: "Maggie",
    address: "Golden Gate Park, San Francisco, CA",
    lat: 37.7694,
    lng: -122.4862,
  },
];

function NavigateScreen() {
  const mappingOn = useFeature("mapping");
  const voiceOn = useFeature("voice_nav");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    let cancelled = false;
    listContacts()
      .then((rows) => !cancelled && setContacts(rows.length ? rows : DEMO_CONTACTS))
      .catch(() => !cancelled && setContacts(DEMO_CONTACTS));
    return () => {
      cancelled = true;
    };
  }, []);

  const open = useCallback((result: Extract<NavResult, { ok: true }>) => {
    setActive({ contact: result.contact, coords: result.coords });
  }, []);

  // One seam for both paths: the mic today, a Vapi `navigate_to` tool later.
  useEffect(() => {
    setNavigationOpener(open);
    (window as unknown as { navigate_to?: (id: string) => Promise<NavResult> }).navigate_to = (
      id,
    ) => navigateTo(id);
    return () => setNavigationOpener(null);
  }, [open]);

  if (!mappingOn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-2xl text-muted-foreground">Maps are turned off for this profile.</p>
      </div>
    );
  }

  if (active) {
    return (
      <BigMapView
        destination={active.coords}
        label={active.contact.nickname ?? active.contact.name}
        address={active.contact.address ?? null}
        onExit={() => setActive(null)}
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10 px-4 py-12">
      <h1 className="text-center text-4xl font-bold text-foreground">Where are we going?</h1>

      {voiceOn ? <VoiceNavButton contacts={contacts} onNavigate={open} /> : null}

      <div className="grid w-full gap-4">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            type="button"
            onClick={() => void navigateTo(contact.id, contact)}
            className="rounded-2xl border border-border px-6 py-6 text-left text-2xl font-semibold text-foreground transition-colors hover:bg-accent"
          >
            {contact.nickname ?? contact.name}
            <span className="mt-1 block text-base font-normal text-muted-foreground">
              {contact.address ?? "No address saved"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/navigate")({
  head: () => ({ meta: [{ title: "Directions" }] }),
  component: NavigateScreen,
});
