import { useEffect, useState } from "react";
import { ADVENTURES, type Adventure } from "@/lib/site/adventures";
import { affirmationAt } from "@/lib/site/affirmations";
import { formatLongDate, formatTime, useLanguage, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AmbientPhotos } from "./AmbientPhotos";
import { SidekickAvatar } from "./SidekickAvatar";
import { Icon } from "@/components/site/Icon";
import { Switch } from "@/components/ui/switch";

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

export function SeniorExperience({
  photos,
  className,
}: {
  /** Overrides the ambient background's photos — the senior's own library
   *  in the product, or whatever a visitor picked from their device. */
  photos?: string[] | undefined;
  className?: string;
}) {
  const [tab, setTab] = useState<Tab>("now");
  const [open, setOpen] = useState<Adventure | null>(null);
  /** A tile that opens its own screen rather than an adventure transcript. */
  const [screen, setScreen] = useState<"games" | null>(null);

  const closeAll = () => {
    setOpen(null);
    setScreen(null);
  };

  return (
    <div className={cn("relative flex min-h-full flex-col bg-background", className)}>
      <AmbientPhotos photos={photos} />

      <TabBar
        tab={tab}
        onChange={(next) => {
          setTab(next);
          closeAll();
        }}
      />

      <div className="relative z-10 flex-1 px-5 pt-5 pb-24 sm:px-6">
        {screen === "games" ? (
          <GamesScreen onBack={closeAll} />
        ) : open ? (
          <AdventureScreen adventure={open} onBack={closeAll} />
        ) : (
          <>
            {tab === "now" ? (
              <NowScreen onOpen={setOpen} onOpenGames={() => setScreen("games")} />
            ) : null}
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
        className="gradient-warm gradient-motion flex items-center rounded-full border-2 border-accent p-1"
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

/** Everything on the home screen besides orientation, Call Emergency and
 *  the permanent talk/caregiver controls — the part each family configures
 *  for the person using it, so nobody sees a tile that doesn't fit them. */
type HomeItemId =
  "to-do" | "who-am-i" | "where-am-i" | "talk" | "help" | "brain-games" | "music" | "my-day";

interface HomeTile {
  id: HomeItemId;
  label: string;
  note?: string;
  icon: string;
  /** A gradient utility class — the app pairs a different two colours per
   *  tile rather than running one ramp down the whole screen. */
  tone: string;
  /** Opens this adventure's detail view where one lines up. */
  adventure?: Adventure["slug"];
}

const HOME_TILES: HomeTile[] = [
  { id: "to-do", label: "To-Do-List", icon: "list", tone: "gradient-plum" },
  { id: "who-am-i", label: "Who am I?", icon: "user", tone: "gradient-tide" },
  { id: "where-am-i", label: "Where am I?", icon: "map-pin", tone: "gradient-earth" },
  {
    id: "talk",
    label: "Talk to Senior Sidekick",
    note: "Ask a question out loud",
    icon: "mic",
    tone: "gradient-tide",
    adventure: "talk",
  },
  {
    id: "help",
    label: "Help",
    note: "Get reassurance or call someone",
    icon: "life-buoy",
    tone: "gradient-sage",
  },
  {
    id: "brain-games",
    label: "Brain games",
    note: "Word find, photo match & family quiz",
    icon: "puzzle",
    tone: "gradient-plum",
    adventure: "games",
  },
  {
    id: "music",
    label: "Music",
    note: "Songs picked just for you",
    icon: "music",
    tone: "gradient-earth",
    adventure: "music",
  },
];

function NowScreen({
  onOpen,
  onOpenGames,
}: {
  onOpen: (adventure: Adventure) => void;
  onOpenGames: () => void;
}) {
  const { language } = useLanguage();
  const now = new Date();
  const [customizing, setCustomizing] = useState(false);
  // The affirmations change through the day in the product rather than
  // sitting on one line, so the demo rotates them too. Starts at 0 on both
  // server and client, then advances — picking at random on first render
  // would mismatch during hydration.
  const [affirmation, setAffirmation] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setAffirmation((n) => n + 1), 7000);
    return () => window.clearInterval(id);
  }, []);
  const [enabled, setEnabled] = useState<Record<HomeItemId, boolean>>(() => {
    const state = { "my-day": true } as Record<HomeItemId, boolean>;
    HOME_TILES.forEach((tile) => {
      state[tile.id] = true;
    });
    return state;
  });

  const toggle = (id: HomeItemId) => setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-display font-display text-[2rem] leading-tight">
            <span className="text-gradient gradient-motion italic">Good Morning,</span>
            <br />
            <span className="text-foreground italic">Margaret</span>
          </h3>
          <button
            type="button"
            onClick={() => setCustomizing((v) => !v)}
            aria-pressed={customizing}
            className={cn(
              "tap-target mt-1 shrink-0 gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-semibold transition-refined",
              customizing
                ? "gradient-warm gradient-motion border-accent text-white"
                : "border-accent/60 text-muted-foreground",
            )}
          >
            <Icon name="sliders-horizontal" className="h-4 w-4" />
            {customizing ? "Done" : "Customize"}
          </button>
        </div>
        <p
          key={affirmation}
          className="font-display animate-fade-in text-lg text-primary italic"
          aria-live="polite"
        >
          {affirmationAt(affirmation)}
        </p>
        <p className="mt-2 text-xl font-bold text-foreground">
          {formatLongDate(language, now)} · {formatTime(language, 8, 15)}
        </p>
      </header>

      {/* Orientation first — the single most reassuring thing on the screen,
          and never part of what gets turned off. */}
      <section className="gradient-warm gradient-motion rounded-3xl border-2 border-accent p-5 text-white">
        <p className="text-eyebrow text-white/85">Right now</p>
        <p className="font-display mt-1 text-3xl font-bold">You are at home.</p>
        <p className="mt-2 text-lg text-white/85">It's Tuesday morning. Nothing is due yet.</p>
      </section>

      {customizing ? (
        <p className="text-body text-muted-foreground">
          Every tile below is optional. Turn off anything that doesn't fit — the rest of the app
          works the same either way.
        </p>
      ) : null}

      {/* Emergency is the one tile that is always there, whatever else has
          been turned off — the baseline the screen can never fall below. */}
      <button
        type="button"
        className="tap-target w-full items-center gap-4 rounded-3xl border-2 border-accent bg-accent p-5 text-left text-accent-foreground"
      >
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/25">
          <Icon name="alert-circle" className="h-7 w-7" />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-2xl font-bold">Call Emergency</span>
          <span className="text-lg opacity-80">Police, fire or ambulance</span>
        </span>
      </button>

      {HOME_TILES.filter((tile) => customizing || enabled[tile.id]).map((tile) => (
        <div
          key={tile.id}
          className={cn(
            "gradient-motion relative rounded-3xl border-2 border-accent transition-refined",
            tile.tone,
            !enabled[tile.id] && customizing && "opacity-45",
          )}
        >
          {customizing ? (
            <Switch
              checked={enabled[tile.id]}
              onCheckedChange={() => toggle(tile.id)}
              aria-label={`Show ${tile.label} on the home screen`}
              className="pointer-events-none absolute top-3 right-3 z-10"
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              if (customizing) {
                toggle(tile.id);
                return;
              }
              if (tile.id === "brain-games") {
                onOpenGames();
                return;
              }
              const adventure = ADVENTURES.find((a) => a.slug === tile.adventure);
              if (adventure) onOpen(adventure);
            }}
            className="tap-target w-full items-center gap-4 p-5 text-left text-white"
          >
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <Icon name={tile.icon} className="h-7 w-7" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-2xl font-bold">{tile.label}</span>
              {tile.note ? <span className="text-lg text-white/85">{tile.note}</span> : null}
            </span>
          </button>
        </div>
      ))}

      {/* A plain line rather than a tile, the way the product has it. */}
      {customizing || enabled["my-day"] ? (
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            !enabled["my-day"] && customizing && "opacity-45",
          )}
        >
          <button
            type="button"
            onClick={() => customizing && toggle("my-day")}
            className="tap-target text-xl font-bold text-foreground/80"
          >
            View My Day (memory journal)
          </button>
          {customizing ? (
            <Switch
              checked={enabled["my-day"]}
              onCheckedChange={() => toggle("my-day")}
              aria-label="Show View My Day on the home screen"
            />
          ) : null}
        </div>
      ) : null}

      {/* Set large and centred with no card around it, the way the product
          closes the screen. Offset from the greeting's line so the two are
          never showing the same words. */}
      <p
        key={`quote-${affirmation}`}
        className="font-display text-gradient gradient-motion animate-fade-in px-2 py-6 text-center text-3xl leading-tight font-semibold italic"
      >
        “{affirmationAt(affirmation + 4)}”
      </p>
    </div>
  );
}

const DAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

function ScheduleScreen() {
  const { language } = useLanguage();
  // Fixed at first render so the server and the client agree, and so the
  // month grid doesn't shift under the visitor mid-session.
  const [today] = useState(() => new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [span, setSpan] = useState<"week" | "month">("month");
  const [selected, setSelected] = useState(today.getDate());
  const [hideFinished, setHideFinished] = useState(false);

  const items = [
    { hour: 9, title: "Morning tablets", note: "With breakfast", done: true },
    { hour: 11, title: "Call from Clare", note: "She rings most Tuesdays", done: true },
    { hour: 14, title: "Photos from the lake house", note: "Added by David", done: false },
    { hour: 16, title: "Walk, if it stays dry", note: "Twenty minutes is plenty", done: false },
  ];
  const visible = hideFinished ? items.filter((item) => !item.done) : items;
  const onToday = selected === today.getDate();

  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = today.toLocaleDateString(language === "en" ? "en-GB" : language, {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  // Week view shows only the row the selected day sits in.
  const weekStart = Math.max(1, selected - ((firstWeekday + selected - 1) % 7));
  const days =
    span === "month"
      ? Array.from({ length: daysInMonth }, (_, i) => i + 1)
      : Array.from({ length: 7 }, (_, i) => weekStart + i).filter((d) => d <= daysInMonth);
  const leadingBlanks = span === "month" ? firstWeekday : (firstWeekday + weekStart - 1) % 7;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="tap-target shrink-0 rounded-full border-2 border-accent bg-background px-4 py-2 text-base font-bold"
        >
          ‹ Back
        </button>
        <h3 className="font-display text-3xl font-bold text-foreground">
          {onToday ? "Today" : `${monthLabel.split(" ")[0]} ${selected}`}
        </h3>
        <button
          type="button"
          onClick={() => setHideFinished((v) => !v)}
          aria-pressed={hideFinished}
          className="tap-target shrink-0 rounded-full border-2 border-[color:var(--brand-teal)] bg-background px-4 py-2 text-base leading-tight font-bold"
        >
          {hideFinished ? "Show all" : "Hide finished"}
        </button>
      </div>

      <button
        type="button"
        className="gradient-plum gradient-motion tap-target w-full items-center gap-4 rounded-3xl border-2 border-accent p-5 text-left text-white"
      >
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-petrol)] text-3xl leading-none font-bold">
          +
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="font-display text-2xl font-bold">Add appointment</span>
          <span className="text-lg text-white/85">Put something new on the calendar</span>
        </span>
      </button>

      <section className="gradient-earth gradient-motion rounded-3xl border-2 border-accent p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-display text-2xl font-bold">Calendar</h4>
          <button
            type="button"
            onClick={() => setShowCalendar((v) => !v)}
            aria-expanded={showCalendar}
            className="tap-target rounded-full border-2 border-accent bg-white/85 px-5 py-2 text-base font-bold text-foreground"
          >
            {showCalendar ? "Hide" : "Show"}
          </button>
        </div>

        {showCalendar ? (
          <>
            <div className="mt-4 flex gap-2">
              {(["week", "month"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSpan(option)}
                  aria-pressed={span === option}
                  className={cn(
                    "tap-target rounded-full border-2 px-6 py-2 text-base font-bold capitalize",
                    span === option
                      ? "border-accent bg-[color:var(--brand-petrol)] text-white"
                      : "border-transparent bg-white/85 text-foreground",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="tap-target rounded-full bg-white/85 px-4 py-2 text-lg font-bold text-foreground">
                ‹
              </span>
              <p className="font-display text-2xl font-bold">{monthLabel}</p>
              <span className="tap-target rounded-full bg-white/85 px-4 py-2 text-lg font-bold text-foreground">
                ›
              </span>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
              {DAY_INITIALS.map((initial, index) => (
                <span key={index} className="py-1 text-base font-bold text-white/85">
                  {initial}
                </span>
              ))}
              {Array.from({ length: leadingBlanks }, (_, i) => (
                <span key={`blank-${i}`} />
              ))}
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelected(day)}
                  aria-current={day === selected ? "date" : undefined}
                  className={cn(
                    "rounded-2xl py-2.5 text-lg font-bold transition-refined",
                    day === selected
                      ? "border-2 border-accent bg-white text-foreground"
                      : "bg-white/25 text-white",
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {onToday && visible.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {visible.map((item, index) => (
            <li key={item.title}>
              <div
                className={cn(
                  "gradient-motion flex items-start gap-4 rounded-3xl border-2 p-4 text-white",
                  index % 2 === 0 ? "gradient-tide" : "gradient-earth",
                  index % 2 === 0 ? "border-accent" : "border-[color:var(--brand-teal)]",
                )}
              >
                <span className="inline-flex shrink-0 rounded-full bg-white/25 px-3 py-1.5 text-base font-bold">
                  {formatTime(language, item.hour)}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xl font-bold">{item.title}</span>
                  <span className="text-base text-white/85">{item.note}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="gradient-earth gradient-motion rounded-3xl border-2 border-accent p-5 text-2xl font-bold text-white">
          Nothing on this day.
        </p>
      )}
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
            className="gradient-earth gradient-motion flex items-center gap-4 rounded-3xl border-2 border-accent p-4 text-white"
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
  const prompts: { label: string; gradient: string }[] = [
    { label: "Where am I?", gradient: "var(--grad-explore)" },
    { label: "What's happening?", gradient: "var(--grad-talk)" },
    { label: "What do I do next?", gradient: "var(--grad-family)" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="gradient-warm gradient-motion tap-target w-full items-center gap-4 rounded-3xl border-2 border-accent p-5 text-left text-white"
      >
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/25">
          <Icon name="phone" className="h-7 w-7" />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-2xl font-bold">Call Caregiver</span>
          <span className="text-lg text-white/85">Sarah Anderson</span>
        </span>
      </button>
      <button
        type="button"
        className="tap-target w-full items-center gap-4 rounded-3xl border-2 border-accent bg-accent p-5 text-left text-accent-foreground"
      >
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/30">
          <Icon name="phone-call" className="h-7 w-7" />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-2xl font-bold">Request Help</span>
          <span className="text-lg opacity-80">Someone will talk with you</span>
        </span>
      </button>
      {prompts.map((question) => (
        <button
          key={question.label}
          type="button"
          className="gradient-motion tap-target w-full justify-start rounded-3xl border-2 border-accent px-5 py-4 text-left text-xl font-semibold text-white"
          style={{ backgroundImage: question.gradient }}
        >
          {question.label}
        </button>
      ))}
    </div>
  );
}

const GAMES: { title: string; note: string; tone: string; cool: boolean }[] = [
  {
    title: "Word Find",
    note: "Search for family names & favourite words",
    tone: "gradient-earth",
    cool: true,
  },
  { title: "Photo Match", note: "Flip cards to match faces", tone: "gradient-warm", cool: false },
  {
    title: "Family Quiz",
    note: "A gentle game about the people you love",
    tone: "gradient-plum",
    cool: true,
  },
  {
    title: "Crossword",
    note: "A small puzzle about your family",
    tone: "gradient-tide",
    cool: false,
  },
  {
    title: "Find Your Way Home",
    note: "A gentle little maze",
    tone: "gradient-sage",
    cool: true,
  },
];

/** Brain games — a list of its own rather than an adventure transcript,
 *  since that's what the tile opens in the product. */
function GamesScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="tap-target shrink-0 rounded-full border-2 border-accent bg-background px-4 py-2 text-base font-bold"
        >
          ‹ Back
        </button>
        <h3 className="font-display text-3xl font-bold text-foreground">Brain Games</h3>
      </div>

      {GAMES.map((game) => (
        <button
          key={game.title}
          type="button"
          className={cn(
            "gradient-motion tap-target w-full flex-col items-start gap-1 rounded-3xl border-2 p-5 text-left text-white",
            game.tone,
            game.cool ? "border-[color:var(--brand-teal)]" : "border-accent",
          )}
        >
          <span className="text-2xl font-bold">{game.title}</span>
          <span className="text-lg text-white/85">{game.note}</span>
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
        className="gradient-motion flex items-center gap-3 rounded-3xl border-2 border-accent p-4 text-white"
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
            className="tap-target rounded-2xl border-2 border-accent px-5 py-3.5 text-base font-semibold"
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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
      <span className="flex flex-col items-center gap-1">
        <span className="gradient-warm gradient-motion tap-target h-16 w-16 rounded-full border-2 border-[color:var(--brand-olive)] text-white shadow-raised">
          <Icon name="mic" className="h-7 w-7" />
        </span>
        <span className="text-sm font-bold text-foreground">Tap to talk</span>
      </span>
      <span className="gradient-sage gradient-motion tap-target rounded-full border-2 border-accent px-6 py-3 text-base font-bold text-white shadow-raised">
        Caregiver
      </span>
    </div>
  );
}
