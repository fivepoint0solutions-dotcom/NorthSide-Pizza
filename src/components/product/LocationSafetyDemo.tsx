import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";
import { SidekickMap, type LatLng, type LatLngTuple } from "./SidekickMap";

type View = "home" | "asking" | "directions";

/* The demo runs on Cold Lake, Alberta — the same ground the product was
   built and tested on, rather than a stock city that means nothing. */
const HOME: LatLng = { lat: 54.4648, lng: -110.1817 };
const SARAHS: LatLng = { lat: 54.4712, lng: -110.1699 };

/** The walk between them, as the route the app would draw. */
const ROUTE: LatLngTuple[] = [
  [54.4648, -110.1817],
  [54.4661, -110.1806],
  [54.4673, -110.1778],
  [54.4688, -110.1749],
  [54.4701, -110.1719],
  [54.4712, -110.1699],
];

/**
 * FLAGSHIP FEATURE — Location Safety.
 *
 * The first thing this product answers, before any conversation starts:
 * where am I. Not a location a caregiver watches from afar by default — a
 * question the senior can ask, and get a plain answer to, on their own
 * screen, in their own words.
 */
export function LocationSafetyDemo({ className }: { className?: string }) {
  const [view, setView] = useState<View>("home");

  return (
    <div className={cn("flex flex-col bg-background", className)}>
      <header
        className="gradient-motion flex items-center justify-between gap-3 p-5 text-white"
        style={{ backgroundImage: "var(--grad-explore)" }}
      >
        <div>
          <p className="text-eyebrow text-white/75">Location Safety</p>
          <p className="font-display text-2xl font-bold">Right now</p>
        </div>
        <Icon name="map-pin" className="h-8 w-8 text-white/85" />
      </header>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* The real map from the app — the route only appears once she's
            actually going somewhere, so the resting state is a place, not a
            tracking display. */}
        <SidekickMap
          points={view === "directions" ? ROUTE : []}
          from={HOME}
          to={view === "directions" ? SARAHS : null}
          height={168}
          radius={24}
          lineColor="var(--brand-rust, #9C6455)"
          accent="var(--brand-ochre, #CC7F3B)"
        />

        <div className="flex flex-1 flex-col gap-4">
          {view === "home" ? (
            <>
              <div
                className="gradient-motion rounded-3xl border-2 border-border-strong p-5 text-white"
                style={{ backgroundImage: "var(--grad-explore)" }}
              >
                <p className="text-eyebrow text-white/80">You are</p>
                <p className="font-display text-3xl font-bold">Home</p>
                <p className="mt-1 text-white/85">1503 10th Street</p>
              </div>
              <button
                type="button"
                onClick={() => setView("asking")}
                className="tap-target gradient-action gradient-motion w-full justify-start gap-3 rounded-3xl border-2 border-border-strong px-5 py-4 text-left text-xl font-semibold text-white"
              >
                <Icon name="navigation" className="h-6 w-6" />
                Where am I going today?
              </button>
              <p className="text-caption mt-auto text-center text-muted-foreground">
                A caregiver sees this only if you've said they can.
              </p>
            </>
          ) : null}

          {view === "asking" ? (
            <>
              <p className="text-senior text-foreground">Who would you like to visit?</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "Sarah", relation: "Your daughter" },
                  { name: "Dr. Patel", relation: "Your doctor" },
                  { name: "The pharmacy", relation: "On Main Street" },
                ].map((place) => (
                  <button
                    key={place.name}
                    type="button"
                    onClick={() => setView("directions")}
                    className="tap-target w-full justify-start gap-3 rounded-2xl border-2 border-border px-4 py-3.5 text-left"
                  >
                    <span className="text-lg font-semibold text-foreground">{place.name}</span>
                    <span className="text-caption ml-auto text-muted-foreground">
                      {place.relation}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setView("home")}
                className="tap-target mt-auto rounded-2xl border-2 border-border px-5 py-3.5 text-base font-semibold"
              >
                Never mind
              </button>
            </>
          ) : null}

          {view === "directions" ? (
            <>
              <div
                className="gradient-motion rounded-3xl border-2 border-border-strong p-5 text-white"
                style={{ backgroundImage: "var(--grad-explore)" }}
              >
                <p className="text-eyebrow text-white/80">Going to</p>
                <p className="font-display text-2xl font-bold">Sarah's house</p>
                <p className="mt-1 text-white/85">1809 Birchwood Ave, 12 minutes away</p>
              </div>
              <div className="flex flex-col gap-2.5 rounded-3xl border-2 border-border p-4">
                {[
                  "Head out the front door and turn left.",
                  "Straight for two blocks, past the church.",
                  "Turn right onto Birchwood — it's the third house.",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-body text-foreground">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex gap-3">
                <button
                  type="button"
                  onClick={() => setView("home")}
                  className="tap-target flex-1 rounded-2xl border-2 border-border px-5 py-3.5 text-base font-semibold"
                >
                  I'm here
                </button>
                <button
                  type="button"
                  className="tap-target flex-1 gap-2 rounded-2xl border-2 border-border-strong bg-highlight px-5 py-3.5 text-base font-semibold text-white"
                >
                  <Icon name="phone-call" className="h-4.5 w-4.5" />
                  Call Sarah
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
