import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import logoAsset from "@/assets/west-coast-realty-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Design System — Victoria Coast & Cedar" },
      {
        name: "description",
        content:
          "The global design system: brand palette, editorial typography, spacing, elevation and motion tokens for a premium Victoria, BC real estate experience.",
      },
      { property: "og:title", content: "Design System — Victoria Coast & Cedar" },
      {
        property: "og:description",
        content:
          "Brand palette, editorial typography, spacing, elevation and motion tokens for a premium Victoria, BC real estate experience.",
      },
    ],
  }),
  component: DesignSystem,
});

const palette = [
  {
    name: "Old-Growth Green",
    hex: "#263F35",
    role: "Primary dark, navigation, headings, dark sections",
    swatch: "bg-primary",
  },
  { name: "Cedar", hex: "#76533F", role: "Warm secondary accent", swatch: "bg-accent" },
  { name: "Pacific Teal", hex: "#28717A", role: "Links, interactive states, key CTAs", swatch: "bg-interactive" },
  { name: "Fern", hex: "#87965B", role: "Natural accent, subtle highlights", swatch: "bg-highlight" },
  {
    name: "Bone",
    hex: "#E7E0D2",
    role: "Primary light background and surfaces",
    swatch: "bg-background border border-border",
  },
];

const typeScale = [
  { token: "text-display", sample: "Coast & Cedar", cls: "text-display" },
  { token: "text-headline", sample: "A house shaped by the tide", cls: "text-headline" },
  { token: "text-title", sample: "Rockland, Victoria", cls: "text-title" },
  { token: "text-quote", sample: "Light moves through the cedars all afternoon.", cls: "text-quote" },
  {
    token: "text-lede",
    sample: "An introduction set in the sans, one weight lighter, for measured editorial pacing.",
    cls: "text-lede",
  },
  {
    token: "text-body",
    sample: "Body copy is Karla — clean, modern, quietly Pacific Northwest, and comfortable at length.",
    cls: "text-body",
  },
  { token: "text-caption", sample: "Listed by appointment — 2026", cls: "text-caption" },
  { token: "text-eyebrow", sample: "Design system", cls: "text-eyebrow" },
];

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="section-y hairline">
      <div className="container-editorial">
        <Reveal>
          <p className="text-eyebrow text-interactive">{eyebrow}</p>
          <h2 className="text-headline mt-3">{title}</h2>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function DesignSystem() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero — dark old-growth section with subtle parallax */}
      <header
        className="surface-dark relative overflow-hidden"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Parallax speed={0.14} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden="true"
            className="absolute -inset-y-24 inset-x-0 opacity-40"
            style={{
              background:
                "radial-gradient(60% 60% at 20% 20%, color-mix(in oklab, var(--brand-teal) 55%, transparent), transparent 70%), radial-gradient(50% 50% at 80% 70%, color-mix(in oklab, var(--brand-fern) 35%, transparent), transparent 70%)",
            }}
          />
        </Parallax>
        {/* Legibility scrim — keeps all hero text readable over imagery */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--brand-green) 88%, transparent), color-mix(in oklab, var(--brand-green) 72%, transparent) 55%, color-mix(in oklab, var(--brand-green) 90%, transparent))",
          }}
        />
        <div className="container-editorial relative section-y pt-40 md:pt-48">
          <Reveal>
            <p className="text-eyebrow text-highlight">Victoria, British Columbia</p>
          </Reveal>

          <Reveal variant="curtain" delay={80}>
            <h1 className="text-display mt-6 max-w-[18ch]">Coast, cedar &amp; character</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lede measure mt-8 opacity-80">
              The global visual language for a premium West Coast real estate experience — five brand colours, editorial
              typography, and motion that stays out of the way.
            </p>
          </Reveal>
          <Reveal delay={320} className="mt-10 flex flex-wrap gap-4">
            <Button variant="cta" size="lg">
              Primary action
            </Button>
            <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground/40">
              Secondary
            </Button>
          </Reveal>
        </div>
      </header>

      <Section eyebrow="Foundation" title="Brand palette">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((c, i) => (
            <Reveal key={c.hex} delay={i * 70}>
              <article className="bg-card shadow-subtle hover-lift rounded-sm p-1">
                <div className={`${c.swatch} h-28 rounded-sm`} />
                <div className="p-4">
                  <h3 className="text-title">{c.name}</h3>
                  <p className="text-caption text-muted-foreground mt-1 uppercase">{c.hex}</p>
                  <p className="text-body text-muted-foreground mt-3">{c.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Voice" title="Typographic scale">
        <div className="space-y-10">
          {typeScale.map((t, i) => (
            <Reveal key={t.token} delay={i * 50}>
              <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:gap-10">
                <code className="text-caption text-interactive pt-2">{t.token}</code>
                <p className={t.cls}>{t.sample}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Interaction" title="Buttons &amp; links">
        <Reveal className="flex flex-wrap items-center gap-4">
          <Button>Default</Button>
          <Button variant="cta">Pacific CTA</Button>
          <Button variant="cedar">Cedar</Button>
          <Button variant="fern">Fern</Button>
          <Button variant="outline">Outline sweep</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Inline link</Button>
          <Button variant="editorial">View details</Button>
        </Reveal>
      </Section>

      <Section eyebrow="Depth" title="Elevation &amp; radii">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["shadow-subtle", "shadow-subtle"],
            ["shadow-raised", "shadow-raised"],
            ["shadow-editorial", "shadow-editorial"],
            ["shadow-cinematic", "shadow-cinematic"],
          ].map(([label, cls], i) => (
            <Reveal key={label} delay={i * 70}>
              <div className={`bg-surface ${cls} flex h-32 items-center justify-center rounded-sm`}>
                <code className="text-caption text-muted-foreground">{label}</code>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Motion" title="Reveals, parallax &amp; drift">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            [
              "Scroll reveals",
              "One-shot IntersectionObserver reveals with opacity and a short rise. Never re-triggers, never hijacks scroll.",
            ],
            ["Subtle parallax", "Capped intensity, rAF-throttled, transform-only, and paused while off-screen."],
            [
              "Cinematic imagery",
              "Frames fade in and drift slowly on hover, with a curtain wipe for headline moments.",
            ],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="border-border border-t pt-6">
                <h3 className="text-title">{title}</h3>
                <p className="text-body text-muted-foreground mt-3">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <p className="text-body text-muted-foreground measure">
            All motion respects <code className="text-interactive">prefers-reduced-motion</code> and animates only{" "}
            <code className="text-interactive">opacity</code>, <code className="text-interactive">transform</code> and{" "}
            <code className="text-interactive">clip-path</code>.
          </p>
        </Reveal>
      </Section>

      <footer className="surface-dark">
        <div className="container-editorial py-16">
          <p className="text-eyebrow text-highlight">Foundation established</p>
          <p className="text-lede measure mt-4 opacity-80">
            Every future component draws from these tokens — no new colours, no local overrides.
          </p>
        </div>
      </footer>
    </main>
  );
}
