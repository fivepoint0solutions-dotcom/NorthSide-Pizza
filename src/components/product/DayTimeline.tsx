import { useState } from "react";
import { SENIOR_DAY, CAREGIVER_DAY, type DayMoment } from "@/lib/site/content";
import { formatTime, useLanguage, useT } from "@/lib/i18n";
import { adventureBySlug } from "@/lib/site/adventures";
import { at } from "@/lib/collections";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";

/**
 * "A day with Senior Sidekick", told from both sides of the relationship.
 *
 * Two parallel timelines the visitor clicks through. Keeping them side by
 * side is the point: the same Tuesday produces a full day for one person and
 * a quiet, unburdened one for the other.
 */
export function DayTimeline({ className }: { className?: string }) {
  const t = useT();
  const [side, setSide] = useState<"senior" | "caregiver">("senior");
  const moments = side === "senior" ? SENIOR_DAY : CAREGIVER_DAY;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = at(moments, activeIndex);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        role="tablist"
        aria-label="Whose day"
        className="inline-flex w-fit gap-1 rounded-full border border-border bg-card/60 p-1"
      >
        {(["senior", "caregiver"] as const).map((option) => (
          <button
            key={option}
            role="tab"
            aria-selected={side === option}
            type="button"
            onClick={() => {
              setSide(option);
              setActiveIndex(0);
            }}
            className={cn(
              "tap-target rounded-full px-6 py-2.5 text-[0.9375rem] font-semibold transition-refined",
              side === option
                ? "gradient-action gradient-motion text-white"
                : "text-muted-foreground",
            )}
          >
            {option === "senior" ? t("day.senior") : t("day.caregiver")}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <ol className="relative flex flex-col gap-1 border-l border-border pl-5">
          {moments.map((moment, index) => (
            <li key={moment.title} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-5 -left-[1.6rem] h-3 w-3 rounded-full border-2 transition-refined",
                  index === activeIndex
                    ? "border-primary bg-primary"
                    : "border-border bg-background",
                )}
              />
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex ? "step" : undefined}
                className={cn(
                  "w-full rounded-2xl px-4 py-3 text-left transition-refined",
                  index === activeIndex ? "bg-primary/10" : "hover:bg-secondary/70",
                )}
              >
                <TimeLabel moment={moment} />
                <span
                  className={cn(
                    "block text-[1.0625rem] font-semibold",
                    index === activeIndex ? "text-primary" : "text-foreground",
                  )}
                >
                  {moment.title}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <article className="card-elevated flex flex-col gap-4 p-6 lg:p-8">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Icon name={active.icon} className="h-7 w-7" />
          </span>
          <TimeLabel moment={active} className="text-primary" />
          <h3 className="text-subhead text-foreground">{active.title}</h3>
          <p className="text-lede text-muted-foreground">{active.body}</p>
          {active.adventure ? <AdventureTag slug={active.adventure} /> : null}
        </article>
      </div>
    </div>
  );
}

function TimeLabel({ moment, className }: { moment: DayMoment; className?: string }) {
  const { language } = useLanguage();
  return (
    <span className={cn("text-eyebrow block text-muted-foreground", className)}>
      {formatTime(language, moment.hour, moment.minute ?? 0)}
    </span>
  );
}

function AdventureTag({ slug }: { slug: string }) {
  const t = useT();
  const adventure = adventureBySlug(slug);
  if (!adventure) return null;
  return (
    <span
      className="badge-pill w-fit gradient-motion text-white"
      style={{ backgroundImage: adventure.gradient }}
    >
      <Icon name={adventure.icon} className="h-3.5 w-3.5" />
      {t(adventure.nameKey)}
    </span>
  );
}
