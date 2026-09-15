import { cn } from "@/lib/utils";

type RinkBackdropProps = {
  className?: string;
  /** Fewer, larger streaks for compact sections. */
  dense?: boolean;
};

/**
 * Decorative hockey-arena backdrop: skater silhouettes + light-trail streaks,
 * inline SVG so it themes with currentColor and never blocks interaction.
 */
export function RinkBackdrop({ className, dense = false }: RinkBackdropProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="trail-orange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0" />
          <stop offset="55%" stopColor="var(--brand-orange)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trail-teal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-teal)" stopOpacity="0" />
          <stop offset="55%" stopColor="var(--brand-teal)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--brand-teal)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M -50 120 C 250 60, 450 180, 1250 40"
        fill="none"
        stroke="url(#trail-orange)"
        strokeWidth="3"
      />
      <path
        d="M -50 540 C 300 460, 600 620, 1250 500"
        fill="none"
        stroke="url(#trail-teal)"
        strokeWidth="3"
      />
      {!dense && (
        <path
          d="M -50 320 C 350 260, 700 400, 1250 300"
          fill="none"
          stroke="url(#trail-orange)"
          strokeWidth="2"
          opacity="0.6"
        />
      )}

      {/* Skater silhouettes */}
      <g fill="var(--brand-teal)" opacity="0.28">
        <path d="M120 610c8-22 26-34 44-30 6-16 24-24 40-18 4-14 20-22 34-16l10 30-8 4-6-16c-8-4-16 0-18 8l-6 18-10-2 4-14c-10-6-22 0-24 12l-4 16-12-2 2-14c-14-6-26 4-28 18l-2 12z" />
        <circle cx="176" cy="556" r="9" />
      </g>
      <g fill="var(--brand-orange)" opacity="0.22" transform="translate(860 60)">
        <path d="M0 40c6-18 22-28 36-24 4-13 20-19 32-14 3-11 16-18 27-13l8 24-7 3-5-13c-6-3-13 0-15 6l-5 15-8-2 3-11c-8-5-18 0-19 10l-3 13-10-2 2-11c-11-5-21 3-22 15l-2 10z" />
        <circle cx="46" cy="-2" r="7" />
      </g>
    </svg>
  );
}

export default RinkBackdrop;
