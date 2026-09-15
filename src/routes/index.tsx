import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { RinkBackdrop } from "@/components/site/RinkBackdrop";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { PackageCard } from "@/components/site/PackageCard";
import { Testimonials } from "@/components/site/Testimonials";
import { PACKAGES } from "@/lib/packages-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Top Shelf Detailing — Score the Perfect Shine" },
      {
        name: "description",
        content:
          "Premium mobile and in-shop car detailing on the West Coast. Book paint correction, ceramic coating, and full detail packages online.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="rink-streaks ice-vignette relative overflow-hidden">
        <RinkBackdrop className="opacity-70" />
        <div className="container-app relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <Reveal>
              <p className="text-eyebrow text-[color:var(--brand-orange)]">
                West Coast Mobile &amp; In-Shop Detailing
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-display mt-5 uppercase">
                Top Shelf Detailing.
                <br />
                <span className="text-[color:var(--brand-orange)]">Score</span> the perfect shine.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lede measure mt-6 text-muted-foreground">
                From a quick refresh to full paint correction and ceramic coating, we bring
                championship-level detailing to your driveway — or ours.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  <Sparkles /> Book Your Detail
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/packages">View Packages</Link>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={200} variant="fade" className="relative">
            <img
              src="/images/suv-after.svg"
              alt="Freshly detailed SUV with a glossy ceramic-coated finish"
              className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-[color:var(--brand-orange)]">Before &amp; After</p>
          <h2 className="text-headline mt-3">See the transformation. Feel the shine.</h2>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-10 max-w-3xl">
          <BeforeAfterSlider
            beforeSrc="/images/suv-before.svg"
            afterSrc="/images/suv-after.svg"
            alt="SUV detail"
          />
        </Reveal>
        <Reveal delay={200} className="mt-6 text-center">
          <Link
            to="/gallery"
            className="link-underline inline-flex items-center gap-1 font-semibold"
          >
            See the full gallery <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <section className="section-y container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-[color:var(--brand-orange)]">
            2. Premium Detailing Packages
          </p>
          <h2 className="text-headline mt-3">Pick your line-up</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 100}>
              <PackageCard {...pkg} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={300} className="mt-8 text-center">
          <Link
            to="/packages"
            className="link-underline inline-flex items-center gap-1 font-semibold"
          >
            Compare all packages <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <section className="rink-streaks section-y">
        <div className="container-app">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-[color:var(--brand-orange)]">3. West Coast Car Care</p>
            <h2 className="text-headline mt-3">Specialty care for every finish</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Droplets,
                label: "Ceramic Coating",
                copy: "Multi-year hydrophobic protection.",
              },
              {
                icon: ShieldCheck,
                label: "Paint Correction",
                copy: "Swirl-free, mirror-grade finish.",
              },
              {
                icon: Sparkles,
                label: "Mobile Service",
                copy: "We come to you, anywhere on the West Coast.",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <div className="card-soft flex flex-col items-center gap-3 p-7 text-center">
                  <span className="grid size-12 place-items-center rounded-full bg-[var(--brand-teal)]/20 text-[color:var(--brand-teal)]">
                    <item.icon className="size-6" />
                  </span>
                  <p className="text-title">{item.label}</p>
                  <p className="text-body text-muted-foreground">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </main>
  );
}
