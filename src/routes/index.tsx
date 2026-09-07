import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import {
  AdventuresSection,
  DaySection,
  GlobalSection,
  JourneySection,
  FlagshipSection,
  MeetSection,
  PlatformSection,
  ProductShowcase,
  TestimonialsSection,
  TrustSection,
  TwoSidedSection,
  WhySection,
} from "@/components/home/Sections";
import { CtaBand } from "@/components/site/Primitives";

export const Route = createFileRoute("/")({
  head: () =>
    seoHead({
      path: "/",
      title: "Senior Sidekick — a companion for older adults, and peace of mind for families",
      description:
        "A warm, voice-first companion for older adults: conversation, music, memories, games and family connection — with a caregiver experience families can trust. English, French, Spanish and Hindi.",
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
      <FlagshipSection />
      <PlatformSection />
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
