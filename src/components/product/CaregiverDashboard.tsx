import { useState } from "react";
import { PERMISSIONS } from "@/lib/site/trust";
import { demoPhoto } from "@/lib/site/demoPhotos";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";

type Tab = "overview" | "location" | "people" | "trusted" | "permissions" | "music";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "location", label: "Location" },
  { id: "people", label: "People & Places" },
  { id: "trusted", label: "Trusted Locations" },
  { id: "permissions", label: "Permissions" },
  { id: "music", label: "Music" },
];

/**
 * Caregiver mode — the same app, unlocked with the caregiver code, on the
 * same phone. Not a separate desktop product: whoever helps set things up
 * does it from here, on the device in their hand.
 *
 * The design brief for this screen was: it must be impossible to mistake
 * for a surveillance product. No vitals, no scores, no movement history and
 * no timeline of everything they did — the things a family actually
 * maintains (who's in their life, where they go, what plays, what's
 * coming), and the permissions that make the limits visible. Location
 * appears only where the senior has granted it.
 */
export function CaregiverDashboard({ className }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className={cn("relative flex min-h-full flex-col bg-background", className)}>
      <div className="sticky top-0 z-10 flex flex-col gap-3 bg-background/90 px-4 py-3 backdrop-blur">
        <span className="gradient-tide gradient-motion mx-auto rounded-full border-2 border-accent px-6 py-2 text-base font-bold text-white">
          Exit caregiver
        </span>

        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            className="tap-target shrink-0 rounded-full border-2 border-accent bg-background px-4 py-2 text-base font-bold"
          >
            ‹ Back
          </button>
          <div className="min-w-0 text-center">
            <p className="text-eyebrow text-accent-foreground/80">Caregiver mode</p>
            <p className="font-display text-2xl leading-tight font-bold text-foreground">
              Sharon's dashboard
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-full border-2 border-border bg-background px-3 py-1.5 text-sm font-bold">
            <Initial>T</Initial>
            Todd
          </span>
        </div>

        <nav aria-label="Caregiver sections" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? "page" : undefined}
              className={cn(
                "tap-target shrink-0 rounded-full border-2 px-5 py-2 text-base font-bold whitespace-nowrap transition-refined",
                tab === item.id
                  ? "gradient-warm gradient-motion border-accent text-white"
                  : "border-accent/70 bg-background text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="relative z-10 flex-1 px-4 pt-2 pb-6">
        {tab === "overview" ? <Overview /> : null}
        {tab === "location" ? <LocationTab /> : null}
        {tab === "people" ? <PeopleTab /> : null}
        {tab === "trusted" ? <TrustedTab /> : null}
        {tab === "permissions" ? <PermissionsTab /> : null}
        {tab === "music" ? <MusicTab /> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Shared pieces
 * ------------------------------------------------------------------ */

/** The dark circular monogram the app uses wherever there's no photo. */
function Initial({ children }: { children: string }) {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-petrol)] text-sm font-bold text-white">
      {children}
    </span>
  );
}

/** The solid deep-teal button the app uses for every "add" action. */
function SolidAction({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="tap-target w-full justify-center rounded-3xl bg-[color:var(--brand-petrol)] px-5 py-4 text-lg font-bold text-white"
    >
      {children}
    </button>
  );
}

/** A gradient card. Borders alternate warm/cool down a list, the way the
 *  product's do, so a stack of them never reads as one block. */
function Card({
  tone,
  cool,
  className,
  children,
}: {
  tone: string;
  cool?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "gradient-motion rounded-3xl border-2 p-5 text-white",
        tone,
        cool ? "border-[color:var(--brand-teal)]" : "border-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The pencil / minus pair sitting at the bottom-right of every editable card. */
function CardControls() {
  return (
    <span className="mt-3 flex justify-end gap-2">
      {["settings-2", "x"].map((icon) => (
        <span
          key={icon}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/85 text-[color:var(--brand-petrol)]"
        >
          <Icon name={icon} className="h-4.5 w-4.5" />
        </span>
      ))}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-eyebrow text-white/85">{children}</p>;
}

/* ------------------------------------------------------------------ *
 * Tabs
 * ------------------------------------------------------------------ */

function Overview() {
  return (
    <div className="flex flex-col gap-4">
      <Card tone="gradient-earth">
        <Label>Profile</Label>
        <div className="mt-2 flex items-start gap-4">
          <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--brand-petrol)] text-2xl font-bold">
            S
          </span>
          <div className="min-w-0">
            <p className="text-2xl font-bold">Sharon Fraser</p>
            <p className="text-lg text-white/85">Tap to add a short bio and a photo.</p>
          </div>
        </div>
        <div className="mt-4">
          <SolidAction>Edit bio &amp; photo</SolidAction>
        </div>
      </Card>

      <Card tone="gradient-plum" cool>
        <Label>Greeting on the Now screen</Label>
        <p className="mt-1 text-2xl font-bold">My Beautiful Mother</p>
      </Card>

      <Card tone="gradient-warm">
        <Label>Home address</Label>
        <p className="mt-1 text-2xl font-bold">515–10th Street</p>
      </Card>

      <Card tone="gradient-tide" cool>
        <Label>Primary caregiver</Label>
        <p className="mt-1 text-2xl font-bold">Donald Fraser</p>
      </Card>

      <p className="text-body flex items-start gap-2 rounded-2xl border border-border bg-surface/60 p-4 text-muted-foreground">
        <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0" />
        What Sharon says in a private conversation is never shown here. There is no setting that
        would change that.
      </p>
    </div>
  );
}

function LocationTab() {
  const places = [
    "Home",
    "Sarah's house",
    "Maple Street Grocery",
    "Dr. Patel's office",
    "Community Garden",
  ];
  return (
    <div className="flex flex-col gap-4">
      <Card tone="gradient-tide" cool>
        <Label>Current location</Label>
        <p className="mt-1 text-3xl font-bold">Home</p>
        <p className="mt-2 text-lg text-white/85">
          Updates automatically on Sharon's Now screen — no one needs to edit it by hand.
        </p>
      </Card>

      <p className="text-eyebrow text-accent-foreground/80">Recent movement</p>
      <Card tone="gradient-earth">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold">8:45 AM</span>
          <span className="text-xl font-bold">Arrived at Home</span>
        </div>
      </Card>

      <ul className="flex flex-wrap gap-2">
        {places.map((place, index) => (
          <li key={place}>
            <span
              className={cn(
                "inline-flex rounded-full px-5 py-2.5 text-base font-bold",
                index === 0
                  ? "bg-[color:var(--brand-petrol)] text-white"
                  : "border-2 border-border bg-background text-foreground",
              )}
            >
              {place}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-body flex items-start gap-2 rounded-2xl border border-border bg-surface/60 p-4 text-muted-foreground">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
        Shown only because Sharon granted it, and she can withdraw it by saying so. No history is
        kept beyond the last arrival.
      </p>
    </div>
  );
}

const ENTRIES: { name: string; relation: string; kind: "Person" | "Pet" | "Place" }[] = [
  { name: "Sarah", relation: "Your daughter", kind: "Person" },
  { name: "David", relation: "Your son", kind: "Person" },
  { name: "Biscuit", relation: "Your dog", kind: "Pet" },
  { name: "Jean", relation: "Your neighbour", kind: "Person" },
  { name: "The Marina", relation: "A place you like to walk", kind: "Place" },
  { name: "Dr. Patel", relation: "Your doctor", kind: "Person" },
];

function PeopleTab() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body text-muted-foreground">
        Tap any card to change the name, photo, phone or address.
      </p>

      {ENTRIES.map((entry, index) => (
        <Card
          key={entry.name}
          tone={index % 2 === 0 ? "gradient-earth" : "gradient-tide"}
          cool={index % 2 === 0}
        >
          <div className="flex items-start gap-4">
            <img
              src={demoPhoto(index)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-bold">{entry.name}</p>
              <p className="text-lg text-white/85">{entry.relation}</p>
            </div>
            <span className="shrink-0 rounded-full bg-white/25 px-3 py-1 text-xs font-bold tracking-wide uppercase">
              {entry.kind}
            </span>
          </div>
          <CardControls />
        </Card>
      ))}

      <SolidAction>Add a person, pet, or place</SolidAction>
    </div>
  );
}

function TrustedTab() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body text-muted-foreground">
        Save the addresses Sharon travels to. She can then press Talk and say “Take me to Todd's” or
        “I want to go home”, and the way there appears on her main screen.
      </p>

      <Card tone="gradient-tide" cool>
        <p className="text-2xl font-bold">Todd's</p>
        <p className="text-lg text-white/85">1503–10th Street, Cold Lake, Alberta</p>
        <CardControls />
      </Card>

      <SolidAction>Add a trusted location</SolidAction>
    </div>
  );
}

function PermissionsTab() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body text-muted-foreground">
        Set by Sharon, shown to her in these same words, and changeable by her at any time.
      </p>
      <ul className="flex flex-col gap-3">
        {PERMISSIONS.map((row, index) => (
          <Card
            key={row.what}
            tone={index % 2 === 0 ? "gradient-plum" : "gradient-sage"}
            cool={index % 2 === 1}
            className="p-4"
          >
            <li className="flex flex-wrap items-start gap-3">
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold">{row.what}</span>
                <span className="block text-base text-white/85">{row.detail}</span>
              </span>
              <PermissionBadge value={row.familyDefault} />
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
}

function PermissionBadge({ value }: { value: "always" | "with-permission" | "never" }) {
  const map = {
    always: { label: "Shared", icon: "check" },
    "with-permission": { label: "Her choice", icon: "user-check" },
    never: { label: "Never shared", icon: "eye-off" },
  } as const;
  const entry = map[value];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-bold tracking-wide uppercase">
      <Icon name={entry.icon} className="h-3.5 w-3.5" />
      {entry.label}
    </span>
  );
}

function MusicTab() {
  const songs = [
    { title: "The Lion Sleeps Tonight", meta: "The Tokens · added by Todd" },
    { title: "California Dreamin'", meta: "The Mamas & The Papas · added by Todd" },
    { title: "Stand By Me", meta: "Ben E. King · added by Sarah" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body text-muted-foreground">
        Upload an MP3 and Sidekick reads the song's own details from the file. Review them, save,
        and it shows up on Sharon's Music screen as a big, simple button.
      </p>

      {songs.map((song, index) => (
        <Card
          key={song.title}
          tone={index % 2 === 0 ? "gradient-earth" : "gradient-plum"}
          cool={index % 2 === 0}
        >
          <p className="text-xl font-bold">{song.title}</p>
          <p className="text-base text-white/85">{song.meta}</p>
          <CardControls />
        </Card>
      ))}

      <SolidAction>Add a song</SolidAction>
    </div>
  );
}
