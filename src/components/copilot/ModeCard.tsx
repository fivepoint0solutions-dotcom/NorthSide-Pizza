import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ModeConfig } from "@/lib/modes";
import { cn } from "@/lib/utils";

type ModeCardProps = { mode: ModeConfig; className?: string };

/** A big, animated-gradient placard — the app's primary navigation surface. */
export function ModeCard({ mode, className }: ModeCardProps) {
  const Icon = mode.icon;
  return (
    <Link
      to={mode.href}
      className={cn(
        "big-cta gradient-motion group flex flex-col gap-5 p-7",
        mode.gradientClass,
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <Icon className="size-6" />
        </span>
        <ArrowUpRight className="size-6 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <div>
        <h3 className="text-title font-bold text-white">{mode.label}</h3>
        <p className="mt-1 text-sm font-semibold text-white/90">{mode.tagline}</p>
        <p className="mt-2 text-sm text-white/75">{mode.description}</p>
      </div>
    </Link>
  );
}

export default ModeCard;
