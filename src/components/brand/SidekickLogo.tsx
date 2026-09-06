import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type SidekickLogoProps = {
  /** Mark only (square) or mark + wordmark lockup. */
  variant?: "lockup" | "mark";
  /** Inverts the wordmark for dark/gradient surfaces. */
  tone?: "default" | "inverse";
  className?: string;
  markClassName?: string;
};

/**
 * Replaceable brand lockup.
 *
 * If `BRAND.logo.src` is set, the supplied asset is rendered verbatim.
 * Otherwise this draws the built-in vector mark: two overlapping rounded
 * forms — a larger one holding a smaller one — reading as companionship,
 * with a conversation spark. No text is baked into the SVG so the mark
 * stays legible at 24px and scales cleanly for print.
 */
export function SidekickLogo({
  variant = "lockup",
  tone = "default",
  className,
  markClassName,
}: SidekickLogoProps) {
  const mark = BRAND.logo.src ? (
    <img
      src={BRAND.logo.src}
      alt={variant === "mark" ? BRAND.logo.alt : ""}
      className={cn("h-10 w-auto", markClassName)}
    />
  ) : (
    <BuiltInMark className={markClassName} />
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex items-center", className)}>{mark}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      <span
        className={cn(
          "font-display text-[1.0625rem] leading-none font-bold tracking-tight sm:text-[1.1875rem]",
          tone === "inverse" ? "text-white" : "text-foreground",
        )}
      >
        Senior<span className="text-primary">{tone === "inverse" ? "" : " "}</span>
        <span className={tone === "inverse" ? "text-white/80" : "text-primary"}>Sidekick</span>
      </span>
      <span className="sr-only">{BRAND.logo.alt}</span>
    </span>
  );
}

function BuiltInMark({ className }: { className?: string | undefined }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <defs>
        <linearGradient id="ss-mark-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-teal)" />
          <stop offset="60%" stopColor="var(--brand-plum)" />
          <stop offset="100%" stopColor="var(--brand-coral)" />
        </linearGradient>
        <linearGradient id="ss-mark-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-amber)" />
          <stop offset="100%" stopColor="var(--brand-coral)" />
        </linearGradient>
      </defs>
      {/* the larger companion form */}
      <path
        d="M24 3c11.6 0 21 9.4 21 21 0 11.6-9.4 21-21 21-3.4 0-6.6-.8-9.4-2.2L4 45.5l2.9-9.9A20.9 20.9 0 0 1 3 24C3 12.4 12.4 3 24 3Z"
        fill="url(#ss-mark-a)"
      />
      {/* the person it holds */}
      <circle cx="19.5" cy="19" r="5.1" fill="white" fillOpacity="0.95" />
      <path
        d="M10.6 33.5c0-4.9 4-8.9 8.9-8.9s8.9 4 8.9 8.9c0 .9-.7 1.6-1.6 1.6H12.2c-.9 0-1.6-.7-1.6-1.6Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* the spark of conversation */}
      <path
        d="M33.5 12.4l1.6 4.3 4.3 1.6-4.3 1.6-1.6 4.3-1.6-4.3-4.3-1.6 4.3-1.6 1.6-4.3Z"
        fill="url(#ss-mark-b)"
      />
    </svg>
  );
}

export default SidekickLogo;
