import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";

type View = "home" | "asking" | "directions";

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

      <div className="relative flex-1 p-5">
        {/* The map is intentionally abstract, never a real tile provider —
            it's a reassurance graphic, not a tracking display. */}
        <MapGround active={view === "directions"} />

        <div className="relative z-10 flex h-full flex-col gap-4">
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

/** A soft, non-literal map ground — reassurance, not surveillance. */
function MapGround({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 400"
      className="pointer-events-none absolute inset-5 opacity-[0.16]"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="currentColor" strokeWidth="2" className="text-foreground">
        <path d="M0 60 H300" /> <path d="M0 160 H300" /> <path d="M0 260 H300" />{" "}
        <path d="M0 360 H300" />
        <path d="M70 0 V400" /> <path d="M160 0 V400" /> <path d="M230 0 V400" />
      </g>
      {active ? (
        <path
          d="M70 360 L70 260 L160 260 L160 60"
          fill="none"
          stroke="var(--brand-rose)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 14"
          opacity="0.7"
        />
      ) : null}
    </svg>
  );
}
