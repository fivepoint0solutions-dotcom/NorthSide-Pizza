import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const TESTIMONIALS = [
  {
    name: "J. Miller",
    location: "Vancouver, WA",
    quote:
      "Best shine in Vancouver — ceramic coating on my Tahoe still beads water two months later. Top Shelf earned the name.",
  },
  {
    name: "R. Estrada",
    location: "Portland, OR",
    quote:
      "Paint correction pulled swirl marks out of my truck that three other shops told me were permanent. Hat Trick package is worth every dollar.",
  },
  {
    name: "K. Nakamura",
    location: "Vancouver, WA",
    quote:
      "Booked the Slapshot Finish before a road trip — interior smelled brand new and the drag-strip stripe finally looked clean again.",
  },
  {
    name: "D. Osei",
    location: "Camas, WA",
    quote:
      "They photograph the before and after and text it to you. Watching my scuffed bumper turn showroom glossy sold me instantly.",
  },
] as const;

export function Testimonials() {
  return (
    <section className="section-y container-app">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow text-[color:var(--brand-orange)]">Testimonials</p>
        <h2 className="text-headline mt-3">What the West Coast is saying</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <figure className="card-soft h-full p-6">
              <div className="flex gap-1 text-[color:var(--brand-orange)]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-body text-foreground/90">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">
                {t.name} <span className="font-normal opacity-70">· {t.location}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
