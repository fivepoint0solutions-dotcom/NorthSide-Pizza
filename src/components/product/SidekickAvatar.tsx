import { cn } from "@/lib/utils";

export type AvatarState = "idle" | "listening" | "thinking" | "speaking";

/**
 * The Sidekick character.
 *
 * Deliberately not a face: a face invites judgement about whether it looks
 * human enough, and reads as a stand-in for a person. This is a warm,
 * breathing presence — a soft orb that widens when it listens and pulses
 * gently when it speaks. It carries the brand gradient, so the companion
 * and the product are visibly the same thing.
 */
export function SidekickAvatar({
  state = "idle",
  size = 96,
  className,
}: {
  state?: AvatarState;
  size?: number;
  className?: string;
}) {
  const active = state === "listening" || state === "speaking";

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label="SR Sidekick"
    >
      {active ? (
        <span
          aria-hidden="true"
          className="animate-pulse-ring absolute inset-0 rounded-full"
          style={{ backgroundImage: "var(--grad-hero)", opacity: 0.35 }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "gradient-motion absolute inset-0 rounded-full transition-refined",
          state === "idle" && "animate-float",
        )}
        style={{
          backgroundImage: "var(--grad-hero)",
          backgroundSize: "220% 220%",
          border: "2px solid color-mix(in oklab, var(--brand-blue) 70%, transparent)",
          boxShadow: "var(--elevation-3)",
          transform: state === "listening" ? "scale(1.05)" : undefined,
        }}
      />
      {/* Inner light, so the mark reads as a warm presence rather than a disc */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(60% 55% at 32% 28%, rgb(255 255 255 / 0.55), transparent 62%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute rounded-full bg-white/85 transition-refined"
        style={{
          width: size * (state === "thinking" ? 0.2 : 0.28),
          height: size * (state === "thinking" ? 0.2 : 0.28),
          filter: "blur(0.5px)",
        }}
      />
      {state === "speaking" ? (
        <span aria-hidden="true" className="absolute bottom-[18%] flex items-end gap-[3px]">
          {[0.5, 0.9, 0.65, 1, 0.55].map((h, i) => (
            <span
              key={i}
              className="animate-float w-[3px] rounded-full bg-white/90"
              style={{
                height: size * 0.12 * h,
                animationDelay: `${i * 110}ms`,
                animationDuration: "1.1s",
              }}
            />
          ))}
        </span>
      ) : null}
    </span>
  );
}
