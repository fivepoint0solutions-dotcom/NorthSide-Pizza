import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { ADVENTURES, adventureBySlug } from "@/lib/site/adventures";
import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { CheckList, CtaBand, Eyebrow, Section, SectionHeading } from "@/components/site/Primitives";
import { Icon } from "@/components/site/Icon";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";
import { DeviceFrame } from "@/components/product/DeviceFrame";
import { AdventureCard } from "@/components/adventures/AdventureCard";

export const Route = createFileRoute("/adventures/$slug")({
  loader: ({ params }) => {
    const adventure = adventureBySlug(params.slug);
    if (!adventure) throw notFound();
    return { slug: adventure.slug };
  },
  head: ({ params }) => {
    const adventure = adventureBySlug(params.slug);
    if (!adventure) return {};
    // The English name is used in metadata: search results are indexed per
    // locale through the hreflang alternates, not by translating the title.
    return seoHead({
      path: `/adventures/${adventure.slug}`,
      title: `${adventure.englishName} — a Senior Sidekick adventure`,
      description: adventure.description.split(". ").slice(0, 2).join(". ") + ".",
    });
  },
  component: AdventureDetailPage,
});

function AdventureDetailPage() {
  const t = useT();
  const { slug } = Route.useLoaderData();
  const adventure = adventureBySlug(slug);
  if (!adventure) return null;

  const others = ADVENTURES.filter((a) => a.slug !== adventure.slug).slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div
          aria-hidden="true"
          data-decorative="true"
          className="gradient-motion absolute inset-x-0 top-0 -z-10 h-[28rem] opacity-20"
          style={{
            backgroundImage: adventure.gradient,
            maskImage: "linear-gradient(to bottom, black 30%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)",
          }}
        />
        <div className="container-app flex flex-col gap-6">
          <Reveal>
            <Link
              to="/adventures"
              className="text-caption inline-flex items-center gap-1.5 font-semibold text-muted-foreground transition-refined hover:text-interactive"
            >
              <Icon name="chevron-right" className="h-4 w-4 rotate-180" />
              {t("nav.adventures")}
            </Link>
          </Reveal>
          <Reveal delay={40} className="flex items-center gap-4">
            <span
              className="gradient-motion inline-flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-raised"
              style={{ backgroundImage: adventure.gradient }}
            >
              <Icon name={adventure.icon} className="h-8 w-8" />
            </span>
            <Eyebrow>{t("adventures.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display text-foreground">{t(adventure.nameKey)}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lede measure text-muted-foreground">{t(adventure.taglineKey)}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-subhead text-foreground italic">{adventure.invocation}</p>
          </Reveal>
        </div>
      </header>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <p className="text-lede text-foreground">{adventure.description}</p>
            <div>
              <h2 className="text-title mb-4 text-foreground">What's inside</h2>
              <CheckList items={adventure.includes} />
            </div>
          </div>

          <Reveal delay={80}>
            <DeviceFrame kind="phone">
              <div className="flex flex-col">
                <div
                  className="gradient-motion flex items-center gap-3 p-6 text-white"
                  style={{ backgroundImage: adventure.gradient }}
                >
                  <Icon name={adventure.icon} className="h-6 w-6" />
                  <p className="text-subhead text-white">{t(adventure.nameKey)}</p>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  {adventure.beats.map((beat, index) => (
                    <div key={index} className="flex flex-col gap-3">
                      <p className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-5 py-3 text-right text-lg font-medium text-primary-foreground">
                        {beat.said}
                      </p>
                      <div className="flex items-start gap-3">
                        <SidekickAvatar state="speaking" size={32} className="mt-1" />
                        <p className="text-senior max-w-[92%] text-foreground">{beat.replied}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DeviceFrame>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="card-soft card-tint-warm flex flex-col gap-3 p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon name="heart" className="h-6 w-6" />
            </span>
            <h2 className="text-title text-foreground">Why it matters</h2>
            <p className="text-body text-muted-foreground">{adventure.whyItMatters}</p>
          </Reveal>
          <Reveal delay={80} className="card-soft card-tint-cool flex flex-col gap-3 p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon name="shield-check" className="h-6 w-6" />
            </span>
            <h2 className="text-title text-foreground">What the family sees</h2>
            <p className="text-body text-muted-foreground">{adventure.familyView}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Keep exploring" title="Other adventures" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, index) => (
            <AdventureCard key={other.slug} adventure={other} delay={index * 60} index={index} />
          ))}
        </div>
      </Section>

      <CtaBand
        title={t("cta.title")}
        lede={t("cta.lede")}
        primaryLabel={t("cta.primary")}
        secondaryLabel={t("cta.secondary")}
      />
    </>
  );
}
