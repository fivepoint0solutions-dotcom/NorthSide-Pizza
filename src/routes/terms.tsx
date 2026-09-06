import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { BRAND } from "@/lib/brand";
import { PageHero, Section, SecondaryAction } from "@/components/site/Primitives";

export const Route = createFileRoute("/terms")({
  head: () =>
    seoHead({
      path: "/terms",
      title: "Terms of service — SR Sidekick",
      description: "The plain-language summary of the SR Sidekick terms of service.",
    }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "What we provide",
    body: "SR Sidekick is a conversational companion service for older adults, together with a connected experience for family members and, where applicable, care organisations. It is a companionship and connection product. It is not a medical device, a monitoring service, an alarm system or an emergency service.",
  },
  {
    title: "Who holds the account",
    body: "The account belongs to the person using SR Sidekick. Where a family member sets it up or pays for it, they are the billing contact — not the owner of the content. Photos, recordings, stories and conversation history belong to the senior and are governed by the permissions they set.",
  },
  {
    title: "Acceptable use",
    body: "Don't use SR Sidekick to harass, deceive or coerce anyone, to impersonate another person, or to obtain information about someone without their consent. Attempting to use a family account to monitor a senior beyond the permissions they have granted is a breach of these terms.",
  },
  {
    title: "Plans, billing and cancellation",
    body: "Self-serve plans include a thirty-day free period. After that, plans renew monthly or annually as selected, and can be cancelled at any time in one step. Cancellation stops future billing; it does not delete data unless you also ask for deletion. Data is exportable before and after cancellation.",
  },
  {
    title: "Availability",
    body: "We aim for continuous availability but do not guarantee uninterrupted service, and SR Sidekick must never be relied upon for any safety-critical purpose. Households should keep an independent means of contacting help.",
  },
  {
    title: "Your content",
    body: "You keep ownership of everything you and your family add. You grant us only the licence needed to operate the service for you — storing, processing and delivering your content to the people you've shared it with. We do not use it to advertise, and we do not sell it.",
  },
  {
    title: "Changes to these terms",
    body: "If we change anything that materially affects you, we'll tell you at least thirty days beforehand, in plain language, and describe what changed rather than pointing at a redline.",
  },
  {
    title: "Governing terms",
    body: "The full legal terms, data processing agreement and regional addenda are available on request and are provided to organisational customers as part of procurement.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="The short version, in words you'd actually use."
        lede="This page is a summary written to be read. The complete legal terms are available on request and to organisational customers as part of procurement — and they say the same things at greater length."
      />

      <Section>
        <div className="measure flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="text-title text-foreground">{section.title}</h2>
              <p className="text-body text-muted-foreground">{section.body}</p>
            </section>
          ))}
          <div className="flex flex-wrap gap-3">
            <SecondaryAction href={`mailto:${BRAND.contact.general}`} size="md">
              Request the full terms
            </SecondaryAction>
            <SecondaryAction to="/privacy" icon="arrow-right" size="md">
              How privacy works
            </SecondaryAction>
          </div>
        </div>
      </Section>
    </>
  );
}
