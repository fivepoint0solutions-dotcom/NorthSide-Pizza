import { createFileRoute } from "@tanstack/react-router";
import { PERMISSIONS, PRIVACY_PRINCIPLES } from "@/lib/site/trust";
import { BRAND } from "@/lib/brand";
import {
  CtaBand,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Senior Sidekick" },
      {
        name: "description",
        content:
          "The senior owns their data, sharing is a decision every time, conversations are never a feed, and nothing is sold. In plain language.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="This lives in someone's home. We treat that as the whole design brief."
        lede="Most products in this category are built for the family and tolerated by the senior. We inverted that — and it turns out people share far more when they're certain nothing is taken."
        gradient="var(--grad-calm)"
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRIVACY_PRINCIPLES.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              body={item.body}
              delay={index * 50}
            />
          ))}
        </div>
      </Section>

      <Section tone="surface" id="matrix">
        <SectionHeading
          eyebrow="In practice"
          title="Exactly what a family member can and cannot see."
          lede="This table is the product, not a summary of it. The same words appear on the senior's own screen."
        />
        <Reveal className="mt-10">
          <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-3xl border border-border">
            {PERMISSIONS.map((row) => (
              <li key={row.what} className="flex flex-wrap items-start gap-3 bg-card/50 p-5">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{row.what}</span>
                  <span className="text-caption block text-muted-foreground">{row.detail}</span>
                </span>
                <span
                  className={cn(
                    "badge-pill shrink-0",
                    row.familyDefault === "always" && "bg-success/15 text-success",
                    row.familyDefault === "with-permission" &&
                      "bg-accent/20 text-accent-foreground",
                    row.familyDefault === "never" && "bg-muted text-muted-foreground",
                  )}
                >
                  {row.familyDefault === "always"
                    ? "Shared"
                    : row.familyDefault === "with-permission"
                      ? "Their choice"
                      : "Never shared"}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="controls">
        <SectionHeading eyebrow="Your controls" title="Everything below is one sentence away." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "eye-off",
              title: "“Stop sharing that”",
              body: "Any permission, revoked immediately, for one person or everyone.",
            },
            {
              icon: "timer",
              title: "“Forget that”",
              body: "Deletes a conversation, a recording or a memory, permanently.",
            },
            {
              icon: "file-text",
              title: "“What do you know about me?”",
              body: "Sidekick reads back what it holds, in plain language.",
            },
            {
              icon: "share-2",
              title: "“Send that to Clare”",
              body: "Explicit, per-item sharing — and it can be un-shared later.",
            },
            {
              icon: "archive",
              title: "Export everything",
              body: "Photos, recordings and stories, downloadable at any time.",
            },
            {
              icon: "ban",
              title: "Delete the account",
              body: "Removes everything, backups included, within thirty days.",
            },
          ].map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              body={item.body}
              delay={index * 50}
            />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <Reveal>
          <div className="card-soft mx-auto flex max-w-3xl flex-col gap-4 p-8 text-center lg:p-12">
            <Icon name="lock" className="mx-auto h-8 w-8 text-primary" />
            <h2 className="text-subhead text-foreground">Questions about your data?</h2>
            <p className="text-body text-muted-foreground">
              Write to a person, not a form. We answer privacy questions ourselves, and we'll tell
              you exactly what we hold about an account if you ask.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <SecondaryAction href={`mailto:${BRAND.contact.privacy}`} size="md">
                {BRAND.contact.privacy}
              </SecondaryAction>
              <SecondaryAction to="/safety" icon="arrow-right" size="md">
                Our safety philosophy
              </SecondaryAction>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Privacy people can actually verify."
        lede="Every limit on this page appears in the product, in the same words, on the senior's own screen."
        primaryLabel="Get started"
        secondaryLabel="Ask us anything"
      />
    </>
  );
}
