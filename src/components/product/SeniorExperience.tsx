import { useState } from "react";
import { ADVENTURES, type Adventure } from "@/lib/site/adventures";
import { formatLongDate, formatTime, useLanguage, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SidekickAvatar } from "./SidekickAvatar";
import { Icon } from "@/components/site/Icon";

/**
 * The senior-facing interface, rendered as live markup inside a device frame
 * and modelled on the shipping product: four tabs (Now, Schedule, People,
 * Help), a permanent "Tap to talk" control, and a caregiver door.
 *
 * Everything here runs one step larger than the marketing site around it:
 * 60px+ targets, no icon without a word beside it, and never more than a
 * handful of things on screen at once.
 */

type Tab = "now" | "schedule" | "people" | "help";

const TABS: { id: Tab; label: string }[] = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "people", label: "People" },
  { id: "help", label: "Help" },
];

export function SeniorExperience({ className }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("now");
  const [open, setOpen] = useState<Adventure | null>(null);

  return (
    <div className={cn("relative flex min-h-full flex-col bg-background", className)}>
      <TabBar
        tab={tab}
        onChange={(next) => {
          setTab(next);
          setOpen(null);
        }}
      />

      <div className="flex-1 px-5 pt-5 pb-24 sm:px-6">
        {open ? (
          <AdventureScreen adventure={open} onBack={() => setOpen(null)} />
        ) : (
          <>
            {tab === "now" ? <NowScreen onOpen={setOpen} /> : null}
            {tab === "schedule" ? <ScheduleScreen /> : null}
            {tab === "people" ? <PeopleScreen /> : null}
            {tab === "help" ? <HelpScreen /> : null}
          </>
        )}
      </div>

      <TalkBar />
    </div>
  );
}

function TabBar({ tab, onChange }: { tab: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div className="sticky top-0 z-10 bg-background/90 px-4 py-3 backdrop-blur">
      <div
        role="tablist"
        aria-label="Sidekick sections"
        className="gradient-action gradient-motion flex items-center rounded-full border-2 border-border-strong p-1"
      >
        {TABS.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={tab === item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "font-display flex-1 rounded-full px-3 py-2.5 text-lg font-semibold transition-refined",
              tab === item.id ? "bg-background text-foreground shadow-subtle" : "text-white/90",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function NowScreen({ onOpen }: { onOpen: (adventure: Adventure) => void }) {
  const t = useT();
  const { language } = useLanguage();
  const now = new Date();

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h3 className="text-display font-display text-[2rem] leading-tight">
          <span className="text-gradient gradient-motion italic">Good Morning,</span>
          <br />
          <span className="text-foreground italic">Margaret</span>
        </h3>
        <p className="font-display text-lg text-primary italic">
          You are loved more than words can say.
        </p>
        <p className="mt-2 text-xl font-bold text-foreground">
          {formatLongDate(language, now)} · {formatTime(language, 8, 15)}
        </p>
      </header>

      {/* Orientation first — the single most reassuring thing on the screen. */}
      <section className="gradient-action gradient-motion rounded-3xl border-2 border-border-strong p-5 text-white">
        <p className="text-eyebrow text-white/85">Right now</p>
        <p className="font-display mt-1 text-3xl font-bold">You are at home.</p>
        <p className="mt-2 text-lg text-white/85">It's Tuesday morning. Nothing is due yet.</p>
      </section>

      <button
        type="button"
        className="tap-target gradient-calm gradient-motion w-full justify-start rounded-3xl border-2 border-border-strong px-5 py-4 text-left text-xl font-semibold text-white"
      >
        Songs picked just for you
      </button>

      <button
        type="button"
        className="tap-target w-full justify-start rounded-3xl border-2 border-border px-5 py-4 text-left text-xl font-semibold text-foreground"
      >
        View My Day (memory journal)
      </button>

      <section className="flex flex-col gap-3">
        <h4 className="text-title text-foreground">{t("adventures.title")}</h4>
        <ul className="grid grid-cols-2 gap-3">
          {ADVENTURES.map((adventure) => (
            <li key={adventure.slug}>
              <button
                type="button"
                onClick={() => onOpen(adventure)}
                className="tap-target hover-lift w-full flex-col gap-2 rounded-3xl border-2 border-border p-4 text-center"
              >
                <span
                  className="gradient-motion inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundImage: adventure.gradient }}
                >
                  <Icon name={adventure.icon} className="h-6 w-6" />
                </span>
                <span className="text-base leading-tight font-semibold text-foreground">
                  {t(adventure.nameKey)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="font-display rounded-3xl border-2 border-border p-5 text-center text-2xl text-primary italic">
        “Your family is always thinking of you.”
      </p>
    </div>
  );
}

function ScheduleScreen() {
  const { language } = useLanguage();
  const items = [
    { hour: 9, title: "Morning tablets", note: "With breakfast", icon: "clock" },
    { hour: 11, title: "Call from Clare", note: "She rings most Tuesdays", icon: "phone-call" },
    { hour: 14, title: "Photos from the lake house", note: "Added by David", icon: "images" },
    { hour: 16, title: "Walk, if it stays dry", note: "Twenty minutes is plenty", icon: "sun" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-3xl font-bold text-foreground">Today</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-4 rounded-3xl border-2 border-border p-4"
          >
            <span className="gradient-calm gradient-motion inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white">
              <Icon name={item.icon} className="h-6 w-6" />
            </span>
            <span className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                {formatTime(language, item.hour)}
              </span>
              <span className="text-lg text-foreground">{item.title}</span>
              <span className="text-base text-muted-foreground">{item.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PeopleScreen() {
  const people = [
    { name: "Sarah", relation: "Your daughter", initials: "S" },
    { name: "David", relation: "Your son", initials: "D" },
    { name: "Jean", relation: "Your neighbour", initials: "J" },
    { name: "Dr. Patel", relation: "Your doctor", initials: "P" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg text-muted-foreground">
        Tap a card to call. Tap the pencil to change it.
      </p>
      <ul className="flex flex-col gap-3">
        {people.map((person) => (
          <li
            key={person.name}
            className="gradient-action gradient-motion flex items-center gap-4 rounded-3xl border-2 border-border-strong p-4 text-white"
          >
            <span className="font-display inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/60 bg-white/20 text-2xl font-bold">
              {person.initials}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-xl font-bold">{person.name}</span>
              <span className="text-base text-white/85">{person.relation}</span>
            </span>
            <span className="tap-target ml-auto rounded-full bg-white/90 px-3 py-3 text-primary">
              <Icon name="phone" className="h-5 w-5" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HelpScreen() {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="tap-target w-full flex-col items-start gap-1 rounded-3xl border-2 border-border-strong bg-highlight p-5 text-left text-white"
      >
        <span className="text-2xl font-bold">Call Caregiver</span>
        <span className="text-lg text-white/85">Sarah Anderson</span>
      </button>
      <button
        type="button"
        className="tap-target w-full flex-col items-start gap-1 rounded-3xl border-2 border-border-strong bg-accent p-5 text-left text-accent-foreground"
      >
        <span className="text-2xl font-bold">Request Help</span>
        <span className="text-lg opacity-80">Someone will talk with you</span>
      </button>
      {["Where am I?", "What's happening?", "What do I do next?"].map((question) => (
        <button
          key={question}
          type="button"
          className="tap-target gradient-action gradient-motion w-full justify-start rounded-3xl border-2 border-border-strong px-5 py-4 text-left text-xl font-semibold text-white"
        >
          {question}
        </button>
      ))}
    </div>
  );
}

function AdventureScreen({ adventure, onBack }: { adventure: Adventure; onBack: () => void }) {
  const t = useT();

  return (
    <div className="flex flex-col gap-4">
      <div
        className="gradient-motion flex items-center gap-3 rounded-3xl border-2 border-border-strong p-4 text-white"
        style={{ backgroundImage: adventure.gradient }}
      >
        <button
          type="button"
          onClick={onBack}
          className="tap-target rounded-full bg-white/25 px-4 py-3 text-base font-semibold text-white"
        >
          <Icon name="chevron-right" className="h-5 w-5 rotate-180" />
          <span className="ml-1">{t("common.back")}</span>
        </button>
        <p className="font-display text-2xl font-bold">{t(adventure.nameKey)}</p>
      </div>

      {adventure.beats.map((beat, index) => (
        <div key={index} className="flex flex-col gap-3">
          <p className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-5 py-3 text-right text-lg font-medium text-primary-foreground">
            {beat.said}
          </p>
          <div className="flex items-start gap-3">
            <SidekickAvatar state="speaking" size={32} className="mt-1" />
            <p className="text-senior max-w-[92%] text-foreground">{beat.replied}</p>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        {["Keep going", "Save this", "Something else"].map((label) => (
          <button
            key={label}
            type="button"
            onClick={label === "Something else" ? onBack : undefined}
            className="tap-target rounded-2xl border-2 border-border-strong px-5 py-3.5 text-base font-semibold"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** The two controls that are always reachable, wherever you are in the app. */
function TalkBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
      <span className="flex flex-col items-center gap-1">
        <span className="gradient-action gradient-motion tap-target h-16 w-16 rounded-full border-2 border-border-strong text-white shadow-raised">
          <Icon name="mic" className="h-7 w-7" />
        </span>
        <span className="text-sm font-bold text-foreground">Tap to talk</span>
      </span>
      <span className="gradient-sunrise gradient-motion tap-target rounded-full border-2 border-border-strong px-6 py-3 text-base font-bold text-white shadow-raised">
        Caregiver
      </span>
    </div>
  );
}
