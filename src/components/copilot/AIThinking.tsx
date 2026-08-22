import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const PHRASES = [
  "Thinking like a teacher…",
  "Brewing a few ideas…",
  "Weighing a couple of approaches…",
  "Almost there…",
  "Sketching this out…",
];

type AIThinkingProps = { className?: string; gradientClass?: string };

export function AIThinking({ className, gradientClass = "gradient-build" }: AIThinkingProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhraseIndex((i) => (i + 1) % PHRASES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-4 py-16 text-center", className)}
    >
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("size-3 rounded-full gradient-motion", gradientClass, "animate-float")}
            style={{ animationDelay: `${i * 180}ms` }}
          />
        ))}
      </div>
      <p className="text-body text-muted-foreground" aria-live="polite">
        {PHRASES[phraseIndex]}
      </p>
    </div>
  );
}

export default AIThinking;
