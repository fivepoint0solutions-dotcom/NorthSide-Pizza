import { useState } from "react";
import { REGIONS, type Region } from "@/lib/site/content";
import { firstOf } from "@/lib/collections";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";

const STATUS_STYLE: Record<Region["status"], { label: string; dot: string; badge: string }> = {
  live: { label: "Available now", dot: "bg-success", badge: "bg-success/15 text-success" },
  beta: { label: "In beta", dot: "bg-accent", badge: "bg-accent/20 text-accent-foreground" },
  planned: {
    label: "In localisation",
    dot: "bg-highlight",
    badge: "bg-highlight/20 text-foreground",
  },
};

/**
 * Global availability, as a map you can interrogate rather than a list of
 * flags. The map is a stylised abstraction — dots positioned on a plain
 * gradient field — which keeps it light (no tile requests, no map library)
 * and avoids the political problems of drawing borders.
 *
 * The region list beneath is the accessible equivalent, not a fallback: it
 * is the same data, keyboard-navigable, and it drives the same selection.
 */
export function WorldMap({ className }: { className?: string }) {
  const [active, setActive] = useState<Region>(firstOf(REGIONS));

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1.35fr_1fr]", className)}>
      <div className="card-soft card-tint-cool relative overflow-hidden p-4">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-primary/8">
          <div
            aria-hidden="true"
            className="gradient-motion absolute inset-0 opacity-25"
            style={{ backgroundImage: "var(--grad-explore)" }}
          />
          {/* latitude/longitude guides, purely decorative */}
          <div aria-hidden="true" className="absolute inset-0">
            {[25, 50, 75].map((y) => (
              <span
                key={y}
                className="absolute inset-x-0 h-px bg-foreground/8"
                style={{ top: `${y}%` }}
              />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <span
                key={x}
                className="absolute inset-y-0 w-px bg-foreground/8"
                style={{ left: `${x}%` }}
              />
            ))}
          </div>

          {REGIONS.map((region) => {
            const selected = region.name === active.name;
            return (
              <button
                key={region.name}
                type="button"
                onClick={() => setActive(region)}
                aria-pressed={selected}
                // Padding, not dot size, carries the 44px target the dot is too small to provide.
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-4 transition-refined"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
              >
                <span className="sr-only">{region.name}</span>
                <span
                  className={cn(
                    "block rounded-full transition-refined",
                    STATUS_STYLE[region.status].dot,
                    selected ? "h-4 w-4 ring-4 ring-white/60" : "h-3 w-3",
                  )}
                />
                {selected ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "animate-pulse-ring absolute inset-0 m-auto h-4 w-4 rounded-full",
                      STATUS_STYLE[region.status].dot,
                    )}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <ul className="mt-4 flex flex-wrap gap-4">
          {(Object.keys(STATUS_STYLE) as Region["status"][]).map((status) => (
            <li key={status} className="text-caption flex items-center gap-2 text-muted-foreground">
              <span className={cn("h-2.5 w-2.5 rounded-full", STATUS_STYLE[status].dot)} />
              {STATUS_STYLE[status].label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <article className="card-elevated flex flex-col gap-3 p-6" aria-live="polite">
          <span className={cn("badge-pill w-fit", STATUS_STYLE[active.status].badge)}>
            {STATUS_STYLE[active.status].label}
          </span>
          <h3 className="text-subhead text-foreground">{active.name}</h3>
          <p className="text-body text-muted-foreground">{active.note}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {active.languages.map((language) => (
              <li key={language} className="badge-pill bg-secondary text-secondary-foreground">
                <Icon name="globe" className="h-3.5 w-3.5" />
                {language}
              </li>
            ))}
          </ul>
        </article>

        <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto pr-1">
          {REGIONS.map((region) => (
            <li key={region.name}>
              <button
                type="button"
                onClick={() => setActive(region)}
                aria-current={region.name === active.name ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.9375rem] transition-refined",
                  region.name === active.name
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-secondary",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    STATUS_STYLE[region.status].dot,
                  )}
                />
                {region.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
