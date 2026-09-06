import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { DayTimeline } from "@/components/product/DayTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";

export const Route = createFileRoute("/day-in-the-life")({
  head: () =>
    seoHead({
      path: "/day-in-the-life",
      title: "A day with SR Sidekick",
      description:
        "The same Tuesday from both sides: Margaret at home, and her daughter Clare four hundred miles away.",
    }),
  component: DayPage,
});

function DayPage() {
  const t = useT();

  return (
    <>
      <PageHero eyebrow={t("day.eyebrow")} title={t("day.title")} lede={t("day.lede")} />

      <Section>
        <DayTimeline />
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What changed"
          title="Nothing dramatic happened. That's rather the point."
          lede="No emergency, no intervention, no alert. One good day for one person, and a quieter one for the person who worries about her."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "message-circle",
              title: "Six conversations",
              body: "Two of them longer than any she'd had that week with a person.",
            },
            {
              icon: "mic",
              title: "One story recorded",
              body: "About a brother, in her own voice, that her daughter had never heard.",
            },
            {
              icon: "phone-call",
              title: "One evening call",
              body: "That started with curiosity instead of a checklist.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 70} className="h-full">
              <div className="card-elevated flex h-full flex-col gap-3 p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-title text-foreground">{item.title}</h3>
                <p className="text-body text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
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
