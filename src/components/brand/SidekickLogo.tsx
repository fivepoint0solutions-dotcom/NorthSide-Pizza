import { BRAND } from "@/lib/brand";
import { FeatherMark } from "./FeatherMark";
import { cn } from "@/lib/utils";

type SidekickLogoProps = {
  /** Mark only, wordmark only, or the two locked up together. */
  variant?: "lockup" | "mark" | "wordmark";
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

  // The header flanks the whole bar with feathers, so the lockup there is the
  // wordmark alone — two feathers either side of a third would be noise.
  const showMark = variant === "lockup";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark ? mark : null}
      <span
        className={cn(
          "font-display text-[1.25rem] leading-none font-bold tracking-tight sm:text-[1.375rem]",
          tone === "inverse" ? "text-white" : "text-foreground",
        )}
      >
        Senior{" "}
        <span className={tone === "inverse" ? "text-white/85" : "text-primary"}>Sidekick</span>
      </span>
      <span className="sr-only">{BRAND.logo.alt}</span>
    </span>
  );
}

function BuiltInMark({ className }: { className?: string | undefined }) {
  return <FeatherMark className={cn("h-10 w-10", className)} />;
}

export default SidekickLogo;
