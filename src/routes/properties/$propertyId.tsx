import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Box,
  CalendarClock,
  Heart,
  MapPin,
  Ruler,
  Tag,
} from "lucide-react";
import { properties, formatPrice } from "@/data/properties";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties/$propertyId")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.propertyId);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.property.title ?? "Property";
    const title = `${name} — West Coast Realty`;
    const description = loaderData
      ? `${name} in ${loaderData.property.city}: ${loaderData.property.beds} beds, ${loaderData.property.baths} baths, ${loaderData.property.sqft} sq ft.`
      : "Victoria, BC property details from West Coast Realty.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PropertyDetailPage,
});

/** Presentation-only gallery derived from the single stored image. */
const galleryFrom = (src: string) =>
  ["entropy", "edges", "faces", "center"].map((crop) => `${src}&crop=${crop}`);

function PropertyDetailPage() {
  const { property } = Route.useLoaderData();
  const gallery = galleryFrom(property.image);
  const [active, setActive] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const stats = [
    { label: "Price", value: formatPrice(property.price), icon: Tag },
    { label: "Beds", value: String(property.beds), icon: BedDouble },
    { label: "Baths", value: String(property.baths), icon: Bath },
    { label: "Interior", value: `${property.sqft.toLocaleString("en-CA")} sq ft`, icon: Ruler },
    { label: "Location", value: property.city, icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-background pt-28">
      <div className="container-editorial pb-24">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Button asChild variant="outline" size="sm">
                <Link to="/properties">
                  <ArrowLeft />
                  Back to properties
                </Link>
              </Button>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="badge-pill bg-interactive/90 text-interactive-foreground">
                  {property.status === "rent" ? "For Rent" : "For Sale"}
                </span>
                <span className="badge-pill border-border bg-secondary/60 text-secondary-foreground">
                  <MapPin className="size-3" /> {property.neighbourhood}
                </span>
                <span className="badge-pill border-border bg-card/70 text-foreground">
                  {property.type}
                </span>
              </div>
              <h1 className="text-headline mt-4 text-primary">{property.title}</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFavorite((v) => !v)}
                aria-pressed={favorite}
                aria-label={favorite ? "Remove from favourites" : "Save to favourites"}
                className="grid size-11 place-items-center rounded-full border border-border bg-card/70 text-foreground shadow-subtle backdrop-blur-md transition-refined hover:scale-105 hover:text-accent"
              >
                <Heart className={cn("size-4", favorite && "fill-accent text-accent")} />
              </button>
              <Button variant="cta" size="lg" asChild>
                <a href="#schedule">
                  <CalendarClock />
                  Schedule a Tour
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Gallery */}
        <Reveal delay={80} className="mt-10">
          <div className="image-frame aspect-[16/9] rounded-3xl shadow-editorial">
            <img
              src={gallery[active]}
              alt={property.imageAlt}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View photo ${i + 1}`}
                aria-current={active === i}
                className={cn(
                  "image-frame aspect-[4/3] rounded-xl border-2 transition-refined",
                  active === i ? "border-interactive" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Key stats bar */}
        <Reveal delay={120} className="mt-8">
          <div className="glass-panel grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-tile">
                <p className="text-caption flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-4 text-highlight" />
                  {label}
                </p>
                <p className="text-title mt-1 text-primary">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.65fr_1fr]">
          <div className="flex flex-col gap-10">
            {/* Overview */}
            <Reveal>
              <section className="glass-card p-8">
                <h2 className="text-title text-primary">Overview</h2>
                <p className="text-body measure mt-4 text-muted-foreground">
                  {property.title} sits in {property.neighbourhood}, {property.city} — {/^[aeiou]/i.test(property.type) ? "an" : "a"}{" "}
                  {property.type.toLowerCase()} of {property.sqft.toLocaleString("en-CA")} sq ft
                  with {property.beds} bedrooms and {property.baths} bathrooms. West Coast
                  light, coastal materials, and a setting that reads as calmly as it lives.
                </p>
              </section>
            </Reveal>

            {/* 3D walkthrough */}
            <Reveal delay={60}>
              <section id="tour" className="glass-panel overflow-hidden p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-eyebrow text-accent">Virtual Experience</p>
                    <h2 className="text-title mt-2 text-primary">3D Walkthrough</h2>
                  </div>
                  <span className="badge-pill border-border bg-interactive/90 text-interactive-foreground">
                    <Box className="size-3" /> 3D Tour
                  </span>
                </div>
                <div className="image-frame mt-6 aspect-[16/9] rounded-2xl">
                  <img
                    src={gallery[0]}
                    alt={`Virtual tour preview of ${property.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-primary/45">
                    <div className="glass-card flex flex-col items-center gap-3 px-8 py-6 text-center">
                      <Box className="size-6 text-interactive" />
                      <p className="text-caption text-foreground">
                        Immersive walkthrough loads here
                      </p>
                      <Button variant="cta" size="sm">
                        Launch 3D Tour
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>
          </div>

          {/* Lead capture sidebar */}
          <Reveal delay={100}>
            <aside id="schedule" className="lg:sticky lg:top-28">
              <form
                className="glass-panel flex flex-col gap-4 p-7"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <p className="text-eyebrow text-accent">Private Viewing</p>
                  <h2 className="text-title mt-2 text-primary">Schedule a Tour</h2>
                  <p className="text-caption mt-2 text-muted-foreground">
                    A West Coast Realty advisor will confirm within one business day.
                  </p>
                </div>
                <Input placeholder="Full name" aria-label="Full name" autoComplete="name" />
                <Input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  autoComplete="email"
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  aria-label="Phone"
                  autoComplete="tel"
                />
                <Input type="date" aria-label="Preferred date" />
                <textarea
                  rows={3}
                  placeholder="Anything we should know?"
                  aria-label="Message"
                  className="w-full rounded-xl border border-input bg-card/70 px-4 py-3 text-sm shadow-subtle backdrop-blur-sm transition-refined placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button type="submit" variant="cta" size="lg" className="w-full">
                  <CalendarClock />
                  Request Tour
                </Button>
                <Button type="button" variant="outline" size="lg" className="w-full">
                  Ask a Question
                </Button>
              </form>
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
