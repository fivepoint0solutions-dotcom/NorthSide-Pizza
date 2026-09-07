import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { CAREGIVER_VALUE, CAREGIVER_DAY } from "@/lib/site/content";
import { PERMISSIONS } from "@/lib/site/trust";
import { Reveal } from "@/components/motion/Reveal";
import {
  CheckList,
  CtaBand,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Icon } from "@/components/site/Icon";
import { DeviceFrame } from "@/components/product/DeviceFrame";
import { CaregiverDashboard } from "@/components/product/CaregiverDashboard";
import { formatTime, useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/families")({
  head: () =>
    seoHead({
      path: "/families",
      title: "For families & caregivers — Senior Sidekick",
      description:
        "A caregiver dashboard built to be impossible to mistake for surveillance: connection, visibility your parent granted, and only the notifications you asked for.",
    }),
  component: FamiliesPage,
});

function FamiliesPage() {
  const t = useT();
  const { language } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("nav.families")}
        title="Close, without hovering."
        lede="The hardest part of caring for a parent from a distance isn't the tasks — it's not knowing, and the guilt that grows in the gap. This closes the gap without turning your mother into a patient."
        gradient="var(--grad-calm)"
      />

      {/* Dashboard */}
      <Section id="dashboard">
        <SectionHeading
          eyebrow="The caregiver dashboard"
          title="A sense of the week. Never a transcript of it."
          lede="Click through the tabs — this is the real dashboard, including the permissions view your parent controls."
        />
        <Reveal className="mt-8">
          <DeviceFrame kind="desktop" label="family.srsidekick.org — Margaret">
            <CaregiverDashboard />
          </DeviceFrame>
        </Reveal>
      </Section>

      {/* Value */}
      <Section tone="surface" id="value">
        <SectionHeading eyebrow="What you get" title="Six things that change the week." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAREGIVER_VALUE.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              body={item.body}
              delay={index * 60}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* Permissions */}
      <Section id="permissions">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Permissions"
              title="Your parent decides what you see. All of it, in plain words."
              lede="Most products in this category are built for the family and tolerated by the senior. We inverted that, and it's the single decision that makes the rest work: people share far more when they're certain nothing is taken."
            />
            <CheckList
              items={[
                "Every permission is listed on the senior's own screen, in the same words",
                "Anything can be switched off by saying so",
                "Each family member has their own settings — a coordinating daughter and a photo-sending grandson see different things",
                "There is no hidden administrative view, for families or for us",
              ]}
            />
            <SecondaryAction to="/privacy" icon="arrow-right" size="md" className="w-fit">
              Read the privacy commitments
            </SecondaryAction>
          </div>

          <Reveal delay={80}>
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
        </div>
      </Section>

      {/* Caregiver day */}
      <Section tone="surface" id="your-day">
        <SectionHeading
          eyebrow="A caregiver's day"
          title="Six touches, none of them a phone call you dreaded."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAREGIVER_DAY.map((moment, index) => (
            <Reveal key={moment.title} delay={index * 60} as="li" className="h-full">
              <div className="card-elevated flex h-full flex-col gap-3 p-6">
                <span className="text-eyebrow text-primary">
                  {formatTime(language, moment.hour, moment.minute ?? 0)}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={moment.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-title text-foreground">{moment.title}</h3>
                <p className="text-body text-muted-foreground">{moment.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={120} className="mt-6">
          <SecondaryAction to="/day-in-the-life" icon="arrow-right" size="md">
            See both days side by side
          </SecondaryAction>
        </Reveal>
      </Section>

      {/* Connection tools */}
      <Section id="connection">
        <SectionHeading
          eyebrow="Connection tools"
          title="Ten seconds from impulse to landing."
          lede="Every step between wanting to reach your parent and actually reaching them is a step where it doesn't happen. So we removed them."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "image-plus",
              title: "Photos",
              body: "Sent from your phone, surfaced in their morning with a question attached.",
            },
            {
              icon: "mic",
              title: "Voice messages",
              body: "Both directions. Easier than a text for everyone involved.",
            },
            {
              icon: "phone-call",
              title: "Calls",
              body: "Voice or video, rung by saying your name — no numbers, no contact list.",
            },
            {
              icon: "calendar-check",
              title: "Shared calendar",
              body: "Birthdays and appointments visible to everyone invited.",
            },
            {
              icon: "puzzle",
              title: "Family-made games",
              body: "A quiz written by a grandchild lands better than any we could write.",
            },
            {
              icon: "music",
              title: "Songs with a note",
              body: '"This is the one you used to sing in the car."',
            },
            {
              icon: "book-open",
              title: "Family questions",
              body: "A grandchild asks something; Sidekick helps them answer it properly.",
            },
            {
              icon: "users",
              title: "Shared activities",
              body: "The same memory or game, played together from two places.",
            },
          ].map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              body={item.body}
              delay={index * 50}
              index={index}
            />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Set it up for them before the first conversation."
        lede="Add ten photos and three songs from your own phone, and it knows your family on day one."
        primaryLabel="Get started"
        secondaryLabel="Talk to our team"
      />
    </>
  );
}
