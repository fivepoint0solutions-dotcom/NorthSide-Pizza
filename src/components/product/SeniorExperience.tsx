import { useState } from "react";
import { ADVENTURES, type Adventure } from "@/lib/site/adventures";
import { formatLongDate, formatTime, useLanguage, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SidekickAvatar } from "./SidekickAvatar";
import { Icon } from "@/components/site/Icon";

/**
 * The senior-facing interface, rendered as live markup inside a device
 * frame. Everything here is one step larger than the marketing site around
 * it: 60px+ targets, no icon without a word beside it, and never more than
 * six things on screen at once.
 */
export function SeniorExperience({ className }: { className?: string }) {
  const [open, setOpen] = useState<Adventure | null>(null);

  return (
    <div className={cn("bg-background", className)}>
      {open ? (
        <AdventureScreen adventure={open} onBack={() => setOpen(null)} />
      ) : (
        <HomeScreen onOpen={setOpen} />
      )}
    </div>
  );
}

function HomeScreen({ onOpen }: { onOpen: (adventure: Adventure) => void }) {
  const t = useT();
  const { language } = useLanguage();
  const today = formatLongDate(language, new Date());

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8">
      <header className="flex items-center gap-4">
        <SidekickAvatar state="idle" size={64} />
        <div className="min-w-0">
          <p className="text-caption text-muted-foreground">{today}</p>
          <p className="text-subhead text-foreground">Good morning, Margaret.</p>
        </div>
        <button
          type="button"
          className="tap-target ml-auto rounded-full border border-border px-4 py-3 text-base font-semibold text-foreground"
        >
          <Icon name="circle-help" className="mr-2 h-5 w-5" />
          Help
        </button>
      </header>

      {/* Today's suggestion — one thing, not a feed */}
      <section className="card-soft card-tint-warm flex flex-col gap-4 p-5">
        <p className="text-eyebrow text-primary">Today</p>
        <p className="text-senior text-foreground">
          Clare sent a photo of the children last night. Would you like to see it, or shall we start
          with some music?
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="tap-target gradient-hero gradient-motion rounded-2xl px-6 py-4 text-lg font-semibold text-white"
          >
            See the photo
          </button>
          <button
            type="button"
            className="tap-target rounded-2xl border-2 border-border-strong px-6 py-4 text-lg font-semibold text-foreground"
          >
            Play music
          </button>
        </div>
      </section>

      {/* The adventure grid — the whole product, six words at a time */}
      <section className="flex flex-col gap-3">
        <h3 className="text-title text-foreground">{t("adventures.title")}</h3>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ADVENTURES.map((adventure) => (
            <li key={adventure.slug}>
              <button
                type="button"
                onClick={() => onOpen(adventure)}
                className="tap-target hover-lift w-full flex-col gap-2 rounded-3xl border border-border p-4 text-center"
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

      {/* The permanent voice affordance */}
      <footer className="flex items-center gap-3 rounded-3xl border border-border bg-surface/70 p-4">
        <span className="gradient-hero gradient-motion tap-target h-14 w-14 rounded-full text-white">
          <Icon name="mic" className="h-6 w-6" />
        </span>
        <p className="text-body text-muted-foreground">
          Or just say <span className="font-semibold text-foreground">“Hey Sidekick…”</span>
        </p>
      </footer>
    </div>
  );
}

function AdventureScreen({ adventure, onBack }: { adventure: Adventure; onBack: () => void }) {
  const t = useT();
  const { language } = useLanguage();

  return (
    <div className="flex flex-col">
      <header
        className="gradient-motion flex items-center gap-4 p-6 text-white"
        style={{ backgroundImage: adventure.gradient }}
      >
        <button
          type="button"
          onClick={onBack}
          className="tap-target rounded-full bg-white/20 px-4 py-3 text-base font-semibold text-white"
        >
          <Icon name="chevron-right" className="h-5 w-5 rotate-180" />
          <span className="ml-1">{t("common.back")}</span>
        </button>
        <div>
          <p className="text-eyebrow text-white/75">{formatTime(language, 14, 20)}</p>
          <p className="text-subhead text-white">{t(adventure.nameKey)}</p>
        </div>
      </header>

      <div className="flex flex-col gap-4 p-6">
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

        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            className="tap-target rounded-2xl border-2 border-border-strong px-5 py-3.5 text-base font-semibold"
          >
            Keep going
          </button>
          <button
            type="button"
            className="tap-target rounded-2xl border-2 border-border-strong px-5 py-3.5 text-base font-semibold"
          >
            Save this
          </button>
          <button
            type="button"
            onClick={onBack}
            className="tap-target rounded-2xl border-2 border-border-strong px-5 py-3.5 text-base font-semibold"
          >
            Something else
          </button>
        </div>
      </div>
    </div>
  );
}
