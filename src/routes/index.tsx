import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import {
  AdventuresSection,
  DaySection,
  GlobalSection,
  JourneySection,
  MeetSection,
  ProductShowcase,
  TestimonialsSection,
  TrustSection,
  TwoSidedSection,
  WhySection,
} from "@/components/home/Sections";
import { CtaBand } from "@/components/site/Primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Senior Sidekick — a companion for older adults, and peace of mind for families" },
      {
        name: "description",
        content:
          "A warm, voice-first companion for older adults: conversation, music, memories, games and family connection — with a caregiver experience families can trust. English, French, Spanish and Hindi.",
      },
      { property: "og:title", content: "Senior Sidekick" },
      {
        property: "og:description",
        content: "The companion that learns how to be there for you.",
      },
    ],
  }),
  component: HomePage,
});

/**
 * The homepage is one continuous argument, in this order:
 * brand → emotion → product → senior → caregiver → experiences → the day →
 * comparison → global scale → voices → trust → conversion.
 */
function HomePage() {
  const t = useT();

  return (
    <>
      <Hero />
      <MeetSection />
      <ProductShowcase />
      <TwoSidedSection />
      <AdventuresSection />
      <JourneySection />
      <DaySection />
      <WhySection />
      <GlobalSection />
      <TestimonialsSection />
      <TrustSection />
      <CtaBand
        title={t("cta.title")}
        lede={t("cta.lede")}
        primaryLabel={t("cta.primary")}
        secondaryLabel={t("cta.secondary")}
      />
    </>
  );
}
