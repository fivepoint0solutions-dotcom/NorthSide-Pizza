import { cn } from "@/lib/utils";

/**
 * The feather — the brand mark. One curling plume, amber concentrated at the
 * tip fading through rose into blue toward the quill, with individual barb
 * strokes fanning off the shaft for texture. Used at three scales: the small
 * mark beside the wordmark, the pair flanking the header, and the large,
 * near-transparent ones drifting behind every page (see FeatherField).
 *
 * `flip` mirrors it for the opposite side of a pairing. `tone="soft"` is the
 * low-opacity variant used as a watermark, where a second, dimmer gradient
 * keeps it from reading as a flat silhouette even at 5% opacity.
 */
export function FeatherMark({
  className,
  flip = false,
  tone = "brand",
}: {
  className?: string;
  flip?: boolean | undefined;
  tone?: "brand" | "soft";
}) {
  const id = tone === "brand" ? "feather-brand" : "feather-soft";
  return (
    <svg
      viewBox="0 0 64 76"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", flip && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id={id} x1="0.5" y1="0" x2="0.35" y2="1">
          {/* Matches the reference mark: a cool blue tip curling at the top,
              through a pale silvery band, into warm amber and rust toward
              the quill. Same full-strength stops for both tones — dimming
              for the watermark use is the wrapper's opacity, not the fill's.
              Stacking both multiplies down to nearly nothing, which is what
              made the first watermark pass invisible. */}
          <stop offset="0%" stopColor="var(--brand-blue)" />
          <stop offset="22%" stopColor="var(--brand-blue)" />
          <stop offset="48%" stopColor="var(--brand-pearl)" />
          <stop offset="70%" stopColor="var(--brand-amber)" />
          <stop offset="100%" stopColor="var(--brand-rust)" />
        </linearGradient>
        {/* A second, cooler wash so even the near-transparent watermark
            reads as more than a flat tint. */}
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="35%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* vane — a curling plume, tip hooking back at the top */}
      <path
        d="M45 3
           C34 1 21 8 13 21
           C6 33 3 46 2 63
           L1 71 9 63
           C21 60 33 52 41 40
           C49 29 51 16 45 3 Z"
        fill={`url(#${id})`}
      />
      <path
        d="M45 3
           C34 1 21 8 13 21
           C6 33 3 46 2 63
           L1 71 9 63
           C21 60 33 52 41 40
           C49 29 51 16 45 3 Z"
        fill={`url(#${id}-sheen)`}
      />

      {/* shaft */}
      <path
        d="M8 68 C15 54 22 44 30 34 C37 25 41 15 43 5"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* barbs — individual strands fanning off the shaft, longer near the
          base, shortening toward the tip, alternating sides for texture */}
      <g stroke="white" strokeLinecap="round" fill="none">
        <path d="M11 62 L2 68" strokeWidth="1.2" strokeOpacity="0.42" />
        <path d="M14 57 L23 63" strokeWidth="1.2" strokeOpacity="0.3" />
        <path d="M16 52 L6 57" strokeWidth="1.1" strokeOpacity="0.4" />
        <path d="M19 47 L27 52" strokeWidth="1.1" strokeOpacity="0.3" />
        <path d="M22 42 L12 46" strokeWidth="1" strokeOpacity="0.38" />
        <path d="M25 38 L32 42" strokeWidth="1" strokeOpacity="0.28" />
        <path d="M28 33 L20 36" strokeWidth="0.9" strokeOpacity="0.36" />
        <path d="M31 29 L37 32" strokeWidth="0.9" strokeOpacity="0.28" />
        <path d="M34 25 L27 27" strokeWidth="0.8" strokeOpacity="0.34" />
        <path d="M37 20 L41 23" strokeWidth="0.8" strokeOpacity="0.26" />
        <path d="M39 15 L33 16" strokeWidth="0.7" strokeOpacity="0.32" />
        <path d="M41 10 L44 12" strokeWidth="0.7" strokeOpacity="0.26" />
      </g>
    </svg>
  );
}

export default FeatherMark;
