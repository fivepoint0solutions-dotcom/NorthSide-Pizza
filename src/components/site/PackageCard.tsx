import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Package = {
  tier: string;
  name: string;
  price: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  featured?: boolean;
};

export function PackageCard({
  tier,
  name,
  price,
  icon: Icon,
  description,
  features,
  featured,
}: Package) {
  return (
    <div
      className={cn(
        "card-elevated relative flex flex-col gap-6 p-7",
        featured && "border-2 border-[color:var(--brand-orange)] lg:-translate-y-3",
      )}
    >
      {featured && (
        <span className="badge-pill absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-orange)] text-black">
          Fan Favorite
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-[var(--brand-orange)]/15 text-[color:var(--brand-orange)]">
          <Icon className="size-5" />
        </span>
        <p className="text-eyebrow text-[color:var(--brand-orange)]">{tier}</p>
      </div>

      <div>
        <h3 className="text-title">{name}</h3>
        <p className="mt-2 text-body text-muted-foreground">{description}</p>
      </div>

      <p className="text-display !text-4xl">
        {price}
        <span className="text-caption font-sans font-normal text-muted-foreground"> starting</span>
      </p>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
            <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-teal)]" />
            {f}
          </li>
        ))}
      </ul>

      <Button asChild variant={featured ? "hero" : "outline"} size="lg" className="mt-2 w-full">
        <Link to="/contact" search={{ package: name }}>
          Book {name}
        </Link>
      </Button>
    </div>
  );
}

export default PackageCard;
