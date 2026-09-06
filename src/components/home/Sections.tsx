import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { useT } from "@/lib/i18n";
import { ADVENTURES } from "@/lib/site/adventures";
import {
  CAREGIVER_VALUE,
  COMPARISON,
  PRODUCT_JOURNEY,
  SENIOR_VALUE,
  TESTIMONIALS,
  TRUST_PILLARS,
} from "@/lib/site/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import {
  Section,
  SectionHeading,
  FeatureCard,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Icon } from "@/components/site/Icon";
import { AdventureCard } from "@/components/adventures/AdventureCard";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";
import { DeviceFrame } from "@/components/product/DeviceFrame";
import { SeniorExperience } from "@/components/product/SeniorExperience";
import { CaregiverDashboard } from "@/components/product/CaregiverDashboard";
import { DayTimeline } from "@/components/product/DayTimeline";
import { WorldMap } from "@/components/product/WorldMap";

/* ------------------------------------------------------------------ *
 * Meet your Sidekick
 * ------------------------------------------------------------------ */

export function MeetSection() {
  const t = useT();
  const traits = [
    {
      icon: "message-circle",
      title: "It talks",
      body: "Full conversation, not commands. Interrupt it, change the subject, trail off — it copes.",
    },
    {
      icon: "mic",
      title: "It listens",
      body: "Voice-first everywhere. Nothing in the product requires typing, including setup.",
    },
    {
      icon: "user-check",
      title: "It knows you",
      body: "Your name, your era, your people, your preferences — and it uses them naturally.",
    },
    {
      icon: "clock",
      title: "It's there",
      body: "Four in the afternoon, three in the morning, the Tuesday after everyone's gone home.",
    },
    {
      icon: "trending-up",
      title: "It grows",
      body: "Month four is noticeably better than week one. More personal, never more complicated.",
    },
    {
      icon: "heart",
      title: "It knows its place",
      body: "It will suggest calling your daughter far more often than it suggests talking to it.",
    },
  ];

  return (
    <Section id="meet">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <Reveal className="flex justify-center lg:justify-start">
          <div className="relative">
            <SidekickAvatar state="speaking" size={220} />
            <span
              aria-hidden="true"
              className="absolute -top-4 -right-6 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-raised"
            >
              “Hey Sidekick…”
            </span>
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow={t("meet.eyebrow")}
            title={t("meet.title")}
            lede={t("meet.lede")}
          />
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {traits.map((trait, index) => (
          <FeatureCard key={trait.title} {...trait} delay={index * 60} />
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * The product, on both sides of the relationship
 * ------------------------------------------------------------------ */

export function ProductShowcase() {
  const [view, setView] = useState<"senior" | "family">("senior");

  return (
    <Section tone="surface" id="product">
      <SectionHeading
        eyebrow="Real product, not a screenshot"
        title="Two experiences, built for two different people."
        lede="Everything below is the live interface. Change the text size or contrast in the header and these screens change with it — because that's how the product actually behaves."
      />

      <div
        role="tablist"
        aria-label="Which experience"
        className="mt-8 inline-flex gap-1 rounded-full border border-border bg-card/70 p-1"
      >
        {(
          [
            { id: "senior", label: "The senior experience", icon: "user" },
            { id: "family", label: "The family dashboard", icon: "layout-dashboard" },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={view === option.id}
            onClick={() => setView(option.id)}
            className={cn(
              "tap-target gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-semibold transition-refined",
              view === option.id
                ? "gradient-hero gradient-motion text-white"
                : "text-muted-foreground",
            )}
          >
            <Icon name={option.icon} className="h-4.5 w-4.5" />
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {view === "senior" ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,30rem)_1fr] lg:items-center">
            <Reveal>
              <DeviceFrame kind="tablet">
                <SeniorExperience />
              </DeviceFrame>
            </Reveal>
            <Reveal delay={80} className="flex flex-col gap-5">
              <h3 className="text-subhead text-foreground">
                Six choices, sixty-pixel targets, and a microphone that's always the easiest thing
                on the screen.
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "One suggestion for today — not a feed to scroll",
                  "Every adventure reachable in a single tap or a single sentence",
                  "No icon without a word beside it",
                  "Help is a permanent, oversized button, never a hidden menu",
                  "Nothing to install, no updates, no passwords",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-body text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <SecondaryAction to="/seniors" icon="arrow-right" size="md">
                Explore the senior experience
              </SecondaryAction>
            </Reveal>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center">
            <Reveal>
              <DeviceFrame kind="desktop" label="family.srsidekick.org — Margaret">
                <CaregiverDashboard />
              </DeviceFrame>
            </Reveal>
            <Reveal delay={80} className="flex flex-col gap-5">
              <h3 className="text-subhead text-foreground">
                Everything a family needs, and deliberately nothing they don't.
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "A sense of the week, never a transcript of it",
                  "Photos, songs, quizzes and calls, sent in seconds",
                  "Permissions set by the senior and visible to everyone",
                  "Only the notifications you asked for",
                  "No location tracking. No health monitoring. No scores.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-body text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <SecondaryAction to="/families" icon="arrow-right" size="md">
                Explore the family experience
              </SecondaryAction>
            </Reveal>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * The two-sided value proposition
 * ------------------------------------------------------------------ */

export function TwoSidedSection() {
  const t = useT();

  return (
    <Section id="value">
      <SectionHeading
        eyebrow={t("value.eyebrow")}
        title={t("value.title")}
        align="center"
        className="mx-auto"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {[
          { title: t("value.senior"), items: SENIOR_VALUE, tint: "card-tint-warm", icon: "user" },
          {
            title: t("value.caregiver"),
            items: CAREGIVER_VALUE,
            tint: "card-tint-cool",
            icon: "users",
          },
        ].map((column, columnIndex) => (
          <Reveal key={column.title} delay={columnIndex * 100} className="h-full">
            <div className={cn("card-soft flex h-full flex-col gap-5 p-6 lg:p-8", column.tint)}>
              <h3 className="text-subhead flex items-center gap-3 text-foreground">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={column.icon} className="h-5.5 w-5.5" />
                </span>
                {column.title}
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {column.items.map((item) => (
                  <li key={item.title} className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <Icon name={item.icon} className="h-4.5 w-4.5 text-primary" />
                      {item.title}
                    </span>
                    <span className="text-caption text-muted-foreground">{item.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Adventures
 * ------------------------------------------------------------------ */

export function AdventuresSection() {
  const t = useT();

  return (
    <Section tone="surface" id="adventures">
      <SectionHeading
        eyebrow={t("adventures.eyebrow")}
        title={t("adventures.title")}
        lede={t("adventures.lede")}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADVENTURES.map((adventure, index) => (
          <AdventureCard key={adventure.slug} adventure={adventure} delay={index * 60} />
        ))}
        <Reveal delay={ADVENTURES.length * 60} className="h-full">
          <Link
            to="/adventures"
            className="card-soft group flex h-full flex-col items-start justify-center gap-3 p-6"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon name="sparkles" className="h-7 w-7" />
            </span>
            <h3 className="text-title text-foreground">And whatever you ask for next</h3>
            <p className="text-body text-muted-foreground">
              New adventures arrive without anyone having to learn anything new.
            </p>
            <span className="mt-2 flex items-center gap-2 font-semibold text-primary">
              See all adventures
              <Icon
                name="arrow-right"
                className="h-4.5 w-4.5 transition-refined group-hover:translate-x-1"
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Product journey + the day
 * ------------------------------------------------------------------ */

export function JourneySection() {
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="The product journey"
        title="Meet. Personalise. Connect. Explore. Remember. Grow."
        lede="Six stages, and only the first one asks anything of the person using it."
      />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_JOURNEY.map((step, index) => (
          <Reveal key={step.key} delay={index * 70} as="li" className="h-full">
            <div className="card-elevated flex h-full flex-col gap-3 p-6">
              <span className="text-eyebrow text-primary">Step {index + 1}</span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon name={step.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-title text-foreground">{step.title}</h3>
              <p className="text-body text-muted-foreground">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function DaySection() {
  const t = useT();
  return (
    <Section tone="surface" id="a-day">
      <SectionHeading eyebrow={t("day.eyebrow")} title={t("day.title")} lede={t("day.lede")} />
      <Reveal className="mt-10">
        <DayTimeline />
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Why Senior Sidekick
 * ------------------------------------------------------------------ */

export function WhySection() {
  const t = useT();

  return (
    <Section id="why">
      <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} />
      <div className="mt-10 overflow-hidden rounded-3xl border border-border">
        <div className="grid grid-cols-2 gap-px bg-border">
          <div className="bg-muted/60 px-5 py-4 lg:px-8">
            <h3 className="text-title text-muted-foreground">{t("why.traditional")}</h3>
          </div>
          <div className="gradient-hero gradient-motion px-5 py-4 lg:px-8">
            <h3 className="text-title text-white">{t("why.sidekick")}</h3>
          </div>
          {/* Rendered as a flat sequence of cells so the two columns stay
              aligned row-for-row at every breakpoint. */}
          {COMPARISON.map((row) => (
            <Fragment key={row.sidekick}>
              <div className="flex items-start gap-3 bg-background px-5 py-5 lg:px-8">
                <Icon name="x" className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/60" />
                <p className="text-body text-muted-foreground">{row.traditional}</p>
              </div>
              <div className="flex items-start gap-3 bg-card/70 px-5 py-5 lg:px-8">
                <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <p className="text-body text-foreground">{row.sidekick}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Global
 * ------------------------------------------------------------------ */

export function GlobalSection() {
  const t = useT();
  return (
    <Section tone="surface" id="global">
      <SectionHeading
        eyebrow={t("global.eyebrow")}
        title={t("global.title")}
        lede={t("global.lede")}
      />
      <Reveal className="mt-10">
        <WorldMap />
      </Reveal>
      <Reveal delay={80} className="mt-6">
        <SecondaryAction to="/languages" icon="arrow-right" size="md">
          The multilingual system in full
        </SecondaryAction>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export function TestimonialsSection() {
  return (
    <Section id="voices">
      <SectionHeading
        eyebrow="Voices"
        title="Four perspectives on the same companion."
        lede="Each quote is paired with the part of the product it's actually about."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 60} className="h-full">
            <figure className="card-elevated flex h-full flex-col gap-4 p-6">
              <Icon name="quote" className="h-6 w-6 text-accent" />
              <blockquote className="text-body text-foreground">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-auto flex flex-col gap-2 pt-2">
                <span className="font-semibold text-foreground">{testimonial.name}</span>
                <span className="text-caption text-muted-foreground">{testimonial.role}</span>
                <Link
                  to={testimonial.relatedHref}
                  className="text-caption mt-1 flex w-fit items-center gap-1.5 py-2 font-semibold text-primary"
                >
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  {testimonial.relatedTo}
                </Link>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Trust
 * ------------------------------------------------------------------ */

export function TrustSection() {
  const t = useT();
  return (
    <Section tone="surface" id="trust">
      <SectionHeading eyebrow={t("trust.eyebrow")} title={t("trust.title")} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRUST_PILLARS.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 60} className="h-full">
            <Link to={pillar.href} className="card-elevated group flex h-full flex-col gap-3 p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon name={pillar.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-title text-foreground">{pillar.title}</h3>
              <p className="text-body text-muted-foreground">{pillar.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-3 text-[0.9375rem] font-semibold text-primary">
                Read more
                <Icon
                  name="arrow-right"
                  className="h-4 w-4 transition-refined group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
