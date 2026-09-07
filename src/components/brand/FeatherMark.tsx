import { cn } from "@/lib/utils";

/**
 * The feather — the brand mark. This is the literal reference asset (cut out
 * from the actual splash-screen logo), not a redrawn approximation, so it
 * matches the real app exactly. Used at three scales: the small mark beside
 * the wordmark, the pair flanking the header, and the large, low-opacity one
 * drifting behind every page (see FeatherField).
 *
 * `flip` mirrors it for the opposite side of a pairing. `object-contain`
 * keeps the image's own aspect ratio inside whatever box a caller sizes it
 * to, since the source photo isn't perfectly square.
 */
export function FeatherMark({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean | undefined;
  /** Unused — kept so existing call sites passing tone="soft"/"brand" don't
   * need updating. The literal asset doesn't have a separate soft variant;
   * dimming is the wrapper's opacity, same as before. */
  tone?: "brand" | "soft";
}) {
  return (
    <img
      src="/brand/feather-mark.png"
      alt=""
      aria-hidden="true"
      className={cn("shrink-0 object-contain", flip && "-scale-x-100", className)}
    />
  );
}

export default FeatherMark;
