import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Box, Heart, MapPin, Ruler } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Presentation-only flags derived from existing data — schema untouched. */
export function propertyBadges(property: Property, index = 0) {
  return {
    featured: property.price >= 3_000_000,
    tour3d: index % 2 === 0,
  };
}

type PropertyCardProps = {
  property: Property;
  index?: number;
  className?: string;
};

export function PropertyCard({ property, index = 0, className }: PropertyCardProps) {
  const [favorite, setFavorite] = useState(false);
  const { featured, tour3d } = propertyBadges(property, index);

  return (
    <article
      className={cn(
        "card-elevated group flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="relative">
        <Link
          to="/properties/$propertyId"
          params={{ propertyId: property.id }}
          className="block"
          aria-label={`View ${property.title}`}
        >
          <div className="image-frame aspect-[4/3] rounded-b-none">
            <img
              src={property.image}
              alt={property.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-primary/45 to-transparent" />
        </Link>

        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="badge-pill bg-interactive/90 text-interactive-foreground">
            {property.status === "rent" ? "For Rent" : "For Sale"}
          </span>
          {tour3d && (
            <span className="badge-pill bg-background/80 text-foreground">
              <Box className="size-3" /> 3D Tour
            </span>
          )}
          {featured && (
            <span className="badge-pill bg-highlight/90 text-highlight-foreground">
              Featured
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFavorite((v) => !v)}
          aria-pressed={favorite}
          aria-label={favorite ? "Remove from favourites" : "Save to favourites"}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-subtle backdrop-blur-md transition-refined hover:scale-105 hover:text-accent"
        >
          <Heart className={cn("size-4", favorite && "fill-accent text-accent")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-title text-primary">
            <Link to="/properties/$propertyId" params={{ propertyId: property.id }}>
              {property.title}
            </Link>
          </h3>
        </div>

        <p className="font-sans text-xl font-semibold tracking-wide text-interactive">
          {formatPrice(property.price)}
          {property.status === "rent" && (
            <span className="text-caption font-normal text-muted-foreground"> / mo</span>
          )}
        </p>

        <span className="badge-pill w-fit border-border bg-secondary/60 text-secondary-foreground">
          <MapPin className="size-3" /> {property.neighbourhood}
        </span>

        <dl className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-caption text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-highlight" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{property.beds} bd</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-4 text-highlight" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{property.baths} ba</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler className="size-4 text-highlight" />
            <dt className="sr-only">Interior</dt>
            <dd>{property.sqft.toLocaleString("en-CA")} sq ft</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <Button asChild variant="cta" size="sm" className="flex-1">
            <Link to="/properties/$propertyId" params={{ propertyId: property.id }}>
              View Details
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link
              to="/properties/$propertyId"
              params={{ propertyId: property.id }}
              hash="tour"
            >
              <Box />
              3D Tour
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;

