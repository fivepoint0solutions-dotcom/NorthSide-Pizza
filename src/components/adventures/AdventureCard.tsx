import { Link } from "@tanstack/react-router";
import type { Adventure } from "@/lib/site/adventures";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";

export function AdventureCard({
  adventure,
  delay = 0,
  size = "default",
}: {
  adventure: Adventure;
  delay?: number;
  size?: "default" | "feature";
}) {
  const t = useT();

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to="/adventures/$slug"
        params={{ slug: adventure.slug }}
        className={cn(
          "group card-elevated relative flex h-full flex-col overflow-hidden",
          size === "feature" ? "p-7 lg:p-9" : "p-6",
        )}
      >
        <span
          aria-hidden="true"
          className="gradient-motion absolute inset-x-0 top-0 h-1.5"
          style={{ backgroundImage: adventure.gradient }}
        />
        <span
          className="gradient-motion mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-raised"
          style={{ backgroundImage: adventure.gradient }}
        >
          <Icon name={adventure.icon} className="h-7 w-7" />
        </span>
        <h3 className={cn("text-foreground", size === "feature" ? "text-subhead" : "text-title")}>
          {t(adventure.nameKey)}
        </h3>
        <p className="text-body mt-2 text-muted-foreground">{t(adventure.taglineKey)}</p>
        <p className="text-caption mt-4 font-medium text-foreground/70 italic">
          {adventure.invocation}
        </p>
        <span className="mt-auto flex items-center gap-2 pt-5 text-[0.9375rem] font-semibold text-primary">
          {t("adventures.explore")}
          <Icon
            name="arrow-right"
            className="h-4.5 w-4.5 transition-refined group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Reveal>
  );
}
