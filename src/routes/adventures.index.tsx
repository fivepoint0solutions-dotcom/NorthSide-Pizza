import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { ADVENTURES } from "@/lib/site/adventures";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { AdventureCard } from "@/components/adventures/AdventureCard";
import { DeviceFrame } from "@/components/product/DeviceFrame";
import { SeniorExperience } from "@/components/product/SeniorExperience";
import { Reveal } from "@/components/motion/Reveal";
import { CheckList } from "@/components/site/Primitives";

export const Route = createFileRoute("/adventures/")({
  head: () =>
    seoHead({
      path: "/adventures",
      title: "Adventures — the Senior Sidekick experience system",
      description:
        "Memory Lane, Music, Explore, Games, Stories, Let's Talk and Family. Seven destinations, each opened by a sentence rather than a menu.",
    }),
  component: AdventuresPage,
});

function AdventuresPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t("adventures.eyebrow")}
        title={t("adventures.title")}
        lede={t("adventures.lede")}
        gradient="var(--grad-stories)"
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVENTURES.map((adventure, index) => (
            <AdventureCard key={adventure.slug} adventure={adventure} delay={index * 60} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="How an adventure starts"
              title="No menu. No app to open. One sentence."
              lede="An adventure is a destination the whole screen becomes, not a tab. It ends when the person is done, picks up where it stopped, and never asks them to find their way back."
            />
            <CheckList
              items={[
                "Opened by saying it, or by one large tap from the home screen",
                "Continues across days — “take me back to Naples tomorrow” works",
                "Adapts to the person: difficulty, pace, subject, length",
                "Can hand off to another adventure mid-conversation",
                "Nothing is scored, timed, or reported to anyone as a result",
              ]}
            />
          </div>
          <Reveal delay={80}>
            <DeviceFrame kind="phone">
              <SeniorExperience />
            </DeviceFrame>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="The first adventure usually happens within ninety seconds."
        lede="Nearly always music. Occasionally a photograph nobody has asked about in twenty years."
        primaryLabel={t("cta.primary")}
        secondaryLabel={t("cta.secondary")}
      />
    </>
  );
}
