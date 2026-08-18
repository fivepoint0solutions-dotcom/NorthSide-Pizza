import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { properties, type Property } from "@/data/properties";
import { Reveal } from "@/components/motion/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const title = "Properties for Sale in Victoria, BC — West Coast Realty";
const description =
  "Search and filter 20 curated Victoria, BC homes: waterfront estates, heritage manors, and coastal retreats across Greater Victoria and the Saanich Peninsula.";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertiesPage,
});

const statusPills = [
  { value: "all", label: "All" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
] as const;

const typeChips = ["House", "Condo", "Townhome", "Estate", "Cottage"] as const;

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "sqft-desc", label: "Largest" },
  { value: "title-asc", label: "Name: A–Z" },
] as const;

function sortProperties(list: Property[], sort: string) {
  const sorted = [...list];
  switch (sort) {
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "sqft-desc":
      return sorted.sort((a, b) => b.sqft - a.sqft);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

function PropertiesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [types, setTypes] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = properties.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (types.length > 0 && !types.includes(p.type)) return false;
      if (!q) return true;
      return [p.title, p.city, p.neighbourhood, p.type]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    return sortProperties(filtered, sort);
  }, [query, status, types, sort]);

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <main className="min-h-screen bg-background pt-28">
      <div className="container-editorial">
        <Reveal>
          <p className="text-eyebrow text-accent">Greater Victoria</p>
          <h1 className="text-headline mt-3 text-primary">Properties</h1>
          <p className="text-lede measure mt-4 text-muted-foreground">
            A curated selection of {properties.length} homes across Victoria, Oak Bay,
            the Saanich Peninsula and the West Shore.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="glass-panel flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative md:max-w-sm md:flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city or neighbourhood"
                  aria-label="Search properties"
                  className="pl-11"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-caption text-muted-foreground">Sort</span>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger
                    className="h-11 w-[190px] rounded-xl border-input bg-card/70 backdrop-blur-sm"
                    aria-label="Sort properties"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value} className="rounded-lg">
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {statusPills.map((pill) => (
                <button
                  key={pill.value}
                  type="button"
                  onClick={() => setStatus(pill.value)}
                  aria-pressed={status === pill.value}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm tracking-wide transition-refined",
                    status === pill.value
                      ? "border-transparent bg-interactive text-interactive-foreground shadow-subtle"
                      : "border-border bg-card/60 text-foreground hover:border-interactive hover:text-interactive",
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {typeChips.map((chip) => {
                const active = types.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleType(chip)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.14em] transition-refined",
                      active
                        ? "border-accent bg-accent/12 text-accent"
                        : "border-border text-muted-foreground hover:border-accent hover:text-accent",
                    )}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            <p className="text-caption text-muted-foreground">
              {results.length} {results.length === 1 ? "property" : "properties"}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property, i) => (
            <Reveal key={property.id} delay={(i % 3) * 80} className="h-full">
              <PropertyCard property={property} index={i} />
            </Reveal>
          ))}
        </div>

        {results.length === 0 && (
          <p className="pb-24 text-muted-foreground">
            No properties match those filters yet.
          </p>
        )}
      </div>
    </main>
  );
}
