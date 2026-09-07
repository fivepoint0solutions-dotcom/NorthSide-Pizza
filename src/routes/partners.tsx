import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { PARTNER_TRACKS } from "@/lib/site/plans";
import { BRAND } from "@/lib/brand";
import {
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";

export const Route = createFileRoute("/partners")({
  head: () =>
    seoHead({
      path: "/partners",
      title: "Partnerships — Senior Sidekick",
      description:
        "Senior living communities, care organisations, community groups and technology partners deploying Senior Sidekick — with residents holding the permissions.",
    }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Deployed at scale, without taking control away from the person using it."
        lede="Organisations ask us the same question first: what will staff be able to see? The answer — whatever each resident grants, and nothing else — is usually what convinces them."
        gradient="var(--grad-explore)"
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {PARTNER_TRACKS.map((track, index) => (
            <Reveal key={track.title} delay={index * 70} className="h-full">
              <article className="card-elevated flex h-full flex-col gap-4 p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={track.icon} className="h-6 w-6" />
                </span>
                <h2 className="text-subhead text-foreground">{track.title}</h2>
                <p className="text-body text-muted-foreground">{track.body}</p>
                <ul className="flex flex-col gap-2.5">
                  {track.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-1 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span className="text-[0.9375rem] text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="How a deployment runs"
          title="Four stages, and residents consent at the third."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Scoping",
              body: "Who it's for, what success looks like, and what staff will and won't see.",
              icon: "compass",
            },
            {
              title: "Pilot",
              body: "Ten to thirty residents, eight weeks, with measurement agreed up front.",
              icon: "flag",
            },
            {
              title: "Consent & setup",
              body: "Each resident sets their own permissions, with help if they want it.",
              icon: "user-check",
            },
            {
              title: "Rollout & training",
              body: "Staff training, family onboarding and a named account manager.",
              icon: "users",
            },
          ].map((step, index) => (
            <Reveal key={step.title} delay={index * 70} as="li" className="h-full">
              <div className="card-soft flex h-full flex-col gap-3 p-6">
                <span className="text-eyebrow text-primary">Stage {index + 1}</span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={step.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-title text-foreground">{step.title}</h3>
                <p className="text-body text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <Reveal>
          <div className="card-soft mx-auto flex max-w-3xl flex-col items-center gap-4 p-8 text-center lg:p-12">
            <Icon name="hand-heart" className="h-8 w-8 text-primary" />
            <h2 className="text-subhead text-foreground">Let's talk about your residents.</h2>
            <p className="text-body text-muted-foreground">
              Tell us the size of the community, the languages spoken in it, and what you've tried
              before. We'll tell you honestly whether this is a fit.
            </p>
            <SecondaryAction href={`mailto:${BRAND.contact.partnerships}`} size="md">
              {BRAND.contact.partnerships}
            </SecondaryAction>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Pilots start with ten residents and eight weeks."
        lede="Measurement agreed up front, and residents holding their own permissions from day one."
        primaryLabel="Get started"
        secondaryLabel="Contact partnerships"
      />
    </>
  );
}
