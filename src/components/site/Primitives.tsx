import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "./Icon";

/* ------------------------------------------------------------------ *
 * Section shells
 * ------------------------------------------------------------------ */

export function Section({
  children,
  className,
  id,
  tone = "default",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Optional surface treatment behind the section. */
  tone?: "default" | "surface" | "deep";
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-y relative",
        tone === "surface" && "bg-surface/60",
        tone === "deep" && "text-white",
        className,
      )}
      style={
        tone === "deep"
          ? { backgroundImage: "var(--grad-action)", backgroundSize: "180% 180%" }
          : undefined
      }
    >
      <div className={wide ? "container-wide" : "container-app"}>{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <p className={cn("text-eyebrow text-primary/90", className)}>
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  tone = "default",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === "inverse" ? "text-white/80" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className={cn("text-headline", tone === "inverse" ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "text-lede measure",
            tone === "inverse" ? "text-white/85" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ *
 * Buttons — deliberately large, because half our visitors are 75+
 * ------------------------------------------------------------------ */

type ActionProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  icon?: string;
  className?: string;
  size?: "md" | "lg";
};

const actionBase =
  "tap-target inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-refined focus-visible:outline-offset-4";

export function PrimaryAction({
  to,
  href,
  onClick,
  children,
  icon,
  className,
  size = "lg",
}: ActionProps) {
  const classes = cn(
    actionBase,
    "gradient-action gradient-motion text-white shadow-raised hover:-translate-y-0.5 hover:shadow-glow",
    size === "lg" ? "px-8 py-4 text-[1.0625rem]" : "px-6 py-3 text-base",
    className,
  );
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} className="h-5 w-5" /> : null}
    </>
  );
  if (to)
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

export function SecondaryAction({
  to,
  href,
  onClick,
  children,
  icon,
  className,
  size = "lg",
}: ActionProps) {
  const classes = cn(
    actionBase,
    "border border-border-strong bg-card/70 text-foreground backdrop-blur hover:border-interactive hover:text-interactive",
    size === "lg" ? "px-7 py-4 text-[1.0625rem]" : "px-5 py-3 text-base",
    className,
  );
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} className="h-5 w-5" /> : null}
    </>
  );
  if (to)
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Content blocks
 * ------------------------------------------------------------------ */

export function FeatureCard({
  icon,
  title,
  body,
  className,
  delay = 0,
}: {
  icon: string;
  title: ReactNode;
  body: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className={cn("card-elevated flex h-full flex-col gap-3 p-6", className)}>
        <span className="tap-target inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <h3 className="text-title text-foreground">{title}</h3>
        <p className="text-body text-muted-foreground">{body}</p>
      </article>
    </Reveal>
  );
}

export function CheckList({
  items,
  className,
  tone = "default",
}: {
  items: readonly string[];
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              tone === "inverse" ? "bg-white/20 text-white" : "bg-accent/25 text-accent-foreground",
            )}
          >
            <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
          </span>
          {/* min-w-0 is load-bearing: without it, a flex child's implicit
              min-width is its unwrapped text width, so a long line pushes
              the li (and the page) wider instead of wrapping — the exact
              cause of the horizontal-scroll bug on narrow phones. */}
          <span
            className={cn(
              "min-w-0 flex-1 text-body",
              tone === "inverse" ? "text-white/85" : "text-muted-foreground",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Page-level hero for interior routes. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  gradient = "var(--grad-hero)",
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
  gradient?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div
        aria-hidden="true"
        data-decorative="true"
        className="gradient-motion absolute inset-x-0 top-0 -z-10 h-[26rem] opacity-[0.14]"
        // Faded out rather than cut off — a hard horizontal edge across the
        // page is the giveaway of a decorative band.
        style={{
          backgroundImage: gradient,
          maskImage: "linear-gradient(to bottom, black 30%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)",
        }}
      />
      <div className="container-app flex flex-col gap-6">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="text-display max-w-[20ch] text-foreground">{title}</h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lede measure text-muted-foreground">{lede}</p>
        </Reveal>
        {children ? <Reveal delay={180}>{children}</Reveal> : null}
      </div>
    </header>
  );
}

/** Closing conversion band, used at the foot of every page. */
export function CtaBand({
  title,
  lede,
  primaryLabel,
  primaryTo = "/get-started",
  secondaryLabel,
  secondaryTo = "/support",
}: {
  title: string;
  lede: string;
  primaryLabel: string;
  primaryTo?: string;
  secondaryLabel: string;
  secondaryTo?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-app">
        <Reveal>
          <div className="gradient-action gradient-motion big-cta relative overflow-hidden px-7 py-14 text-center lg:px-16 lg:py-20">
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
              <h2 className="text-headline text-white">{title}</h2>
              <p className="text-lede text-white/85">{lede}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to={primaryTo}
                  className="tap-target inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[1.0625rem] font-semibold text-primary shadow-raised transition-refined hover:-translate-y-0.5"
                >
                  {primaryLabel}
                  <Icon name="arrow-right" className="h-5 w-5" />
                </Link>
                <Link
                  to={secondaryTo}
                  className="tap-target inline-flex items-center gap-2 rounded-full border border-white/45 px-7 py-4 text-[1.0625rem] font-semibold text-white transition-refined hover:bg-white/12"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
