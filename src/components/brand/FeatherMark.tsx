import { cn } from "@/lib/utils";

/**
 * The feather motif from srsidekick.org — the site flanks its navigation with
 * a pair of them and floats a large translucent one behind the page. It reads
 * as lightness and care rather than as a medical or safety symbol, which is
 * the whole point of the brand.
 *
 * `flip` mirrors it for the opposite side of a pairing.
 */
export function FeatherMark({
  className,
  flip = false,
  tone = "brand",
}: {
  className?: string;
  flip?: boolean;
  tone?: "brand" | "soft";
}) {
  const id = tone === "brand" ? "feather-brand" : "feather-soft";
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", flip && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id={id} x1="1" y1="0" x2="0" y2="1">
          {tone === "brand" ? (
            <>
              <stop offset="0%" stopColor="var(--brand-amber)" />
              <stop offset="55%" stopColor="var(--brand-rose)" />
              <stop offset="100%" stopColor="var(--brand-blue)" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="var(--brand-rose)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0.5" />
            </>
          )}
        </linearGradient>
      </defs>
      {/* vane */}
      <path d="M51 6C31 10 15 26 12 46l-3 12 9-6c19-3 33-19 33-46Z" fill={`url(#${id})`} />
      {/* shaft */}
      <path
        d="M49 9 15 56"
        stroke="white"
        strokeOpacity="0.65"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* barbs */}
      <g stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round">
        <path d="M43 14 30 20" />
        <path d="M38 21 25 28" />
        <path d="M33 28 21 36" />
        <path d="M28 35 17 44" />
      </g>
    </svg>
  );
}

export default FeatherMark;
