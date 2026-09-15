import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Droplets, Home as HomeIcon, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { RinkBackdrop } from "@/components/site/RinkBackdrop";
import { PackageCard } from "@/components/site/PackageCard";
import { PACKAGES } from "@/lib/packages-data";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Detailing Packages — Top Shelf Detailing" },
      {
        name: "description",
        content:
          "Compare Top Shelf Detailing's Snapshot, Slapshot, and Hat Trick packages — pricing, features, and specialty add-ons.",
      },
    ],
  }),
  component: Packages,
});

const CAR_CARE = [
  {
    icon: ShieldCheck,
    label: "Paint Correction",
    price: "from $249",
    copy: "Machine-polished, swirl-free finish that restores true gloss and depth.",
  },
  {
    icon: Droplets,
    label: "Ceramic Coating",
    price: "from $599",
    copy: "Multi-year hydrophobic protection with UV and chemical resistance.",
  },
  {
    icon: HomeIcon,
    label: "Mobile Detailing",
    price: "+$40 travel",
    copy: "We bring the full shop setup to your driveway or office lot.",
  },
  {
    icon: Car,
    label: "Fleet & Multi-Car",
    price: "custom quote",
    copy: "Recurring detailing plans for households and small fleets.",
  },
];

function Packages() {
  return (
    <main>
      <section className="rink-streaks ice-vignette relative overflow-hidden">
        <RinkBackdrop dense className="opacity-60" />
        <div className="container-app relative py-16 text-center lg:py-20">
          <Reveal>
            <p className="text-eyebrow text-[color:var(--brand-orange)]">
              Premium Detailing Packages
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display measure mx-auto mt-5 uppercase">
              Pick your <span className="text-[color:var(--brand-orange)]">line-up</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lede measure mx-auto mt-6 text-muted-foreground">
              Three tiers, one goal — the best shine your ride has ever had. Every package includes
              our satisfaction guarantee.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y container-app">
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 100}>
              <PackageCard {...pkg} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="rink-streaks section-y">
        <div className="container-app">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-[color:var(--brand-orange)]">West Coast Car Care</p>
            <h2 className="text-headline mt-3">Specialty add-ons</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAR_CARE.map((item, i) => (
              <Reveal key={item.label} delay={i * 90}>
                <div className="card-soft flex h-full flex-col gap-3 p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-[var(--brand-teal)]/20 text-[color:var(--brand-teal)]">
                    <item.icon className="size-5" />
                  </span>
                  <p className="text-title">{item.label}</p>
                  <p className="text-caption font-semibold text-[color:var(--brand-orange)]">
                    {item.price}
                  </p>
                  <p className="text-body text-muted-foreground">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app pb-20">
        <Reveal className="glass-panel flex flex-col items-center gap-6 p-10 text-center">
          <Sparkles className="size-8 text-[color:var(--brand-orange)]" />
          <h2 className="text-headline !text-2xl lg:!text-3xl">Not sure which package fits?</h2>
          <p className="measure text-body text-muted-foreground">
            Tell us about your vehicle and we'll recommend the right level of detail.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Ask Us / Book Now</Link>
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
