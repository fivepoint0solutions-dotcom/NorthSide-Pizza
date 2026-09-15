import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { RinkBackdrop } from "@/components/site/RinkBackdrop";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Before & After Gallery — Top Shelf Detailing" },
      {
        name: "description",
        content:
          "Drag to compare real Top Shelf Detailing transformations — SUVs, sedans, and trucks restored to a showroom shine.",
      },
    ],
  }),
  component: Gallery,
});

const SHOWCASE = [
  {
    label: "SUV — Hat Trick Complete",
    tag: "Ceramic Coating + Paint Correction",
    before: "/images/suv-before.svg",
    after: "/images/suv-after.svg",
  },
  {
    label: "Sedan — Slapshot Finish",
    tag: "Clay Bar + Gloss Enhancement",
    before: "/images/sedan-before.svg",
    after: "/images/sedan-after.svg",
  },
  {
    label: "Truck — Hat Trick Complete",
    tag: "Full Paint Correction + Ceramic",
    before: "/images/truck-before.svg",
    after: "/images/truck-after.svg",
  },
] as const;

function Gallery() {
  return (
    <main>
      <section className="rink-streaks ice-vignette relative overflow-hidden">
        <RinkBackdrop dense className="opacity-60" />
        <div className="container-app relative py-16 text-center lg:py-20">
          <Reveal>
            <p className="text-eyebrow text-[color:var(--brand-orange)]">Before &amp; After</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display measure mx-auto mt-5 uppercase">
              See the <span className="text-[color:var(--brand-orange)]">transformation</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lede measure mx-auto mt-6 text-muted-foreground">
              Drag the handle on each photo to reveal the finished result. Feel the shine.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y container-app">
        <div className="grid gap-12 lg:grid-cols-3">
          {SHOWCASE.map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="flex flex-col gap-4">
                <BeforeAfterSlider beforeSrc={item.before} afterSrc={item.after} alt={item.label} />
                <div>
                  <p className="text-title">{item.label}</p>
                  <p className="text-caption text-muted-foreground">{item.tag}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-app pb-20 text-center">
        <Reveal>
          <p className="measure mx-auto text-body text-muted-foreground">
            Ready to see your own before &amp; after?
          </p>
          <Button asChild variant="hero" size="xl" className="mt-6">
            <Link to="/contact">
              Book Your Detail <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
