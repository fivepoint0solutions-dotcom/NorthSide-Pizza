import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { LEGACY_ARTIFACTS, MEMORY_SYSTEM } from "@/lib/site/trust";
import {
  CheckList,
  CtaBand,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";

export const Route = createFileRoute("/memories")({
  head: () =>
    seoHead({
      path: "/memories",
      title: "Memories & legacy — Senior Sidekick",
      description:
        "A memory system that turns daily conversation into a family archive: photos, stories in their own voice, people, places and dates — owned by the senior, kept by the family.",
    }),
  component: MemoriesPage,
});

function MemoriesPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow="Memory & legacy"
        title="The stories were always there. Nobody was ever in the room with a recorder."
        lede="Senior Sidekick asks the questions a curious grandchild would ask, every day, and keeps the answers somewhere the family will still have them in thirty years."
        gradient="var(--grad-memory)"
      />

      <Section id="memory-system">
        <SectionHeading
          eyebrow="The memory system"
          title="What it keeps"
          lede="Gathered through conversation rather than data entry — nobody fills in a form."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MEMORY_SYSTEM.map((item, index) => (
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

      <Section tone="surface" id="consent">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Recorded with permission, every time"
              title="Nothing is captured quietly."
              lede="Recording is always announced, always optional and always reversible. A story stays private until the person who told it says otherwise — and they can listen back before deciding."
            />
            <CheckList
              items={[
                "Sidekick asks before it records, in plain words, every time",
                "The recording is theirs: they can hear it, keep it, or delete it",
                "Sharing is per-recording — never a blanket setting",
                "A shared story can be un-shared later",
                "Everything is exportable, including after cancellation",
              ]}
            />
            <SecondaryAction to="/privacy" icon="arrow-right" size="md" className="w-fit">
              How privacy works here
            </SecondaryAction>
          </div>
          <Reveal delay={80}>
            <div className="card-elevated card-tint-memory flex flex-col gap-4 p-7">
              <span className="badge-pill w-fit bg-accent/25 text-accent-foreground">
                <Icon name="mic" className="h-3.5 w-3.5" />
                Recording — with permission
              </span>
              <p className="text-senior text-foreground">
                “Shall I keep this one? I can save it just for you, or send it to Clare as well —
                you can listen to it first and decide after.”
              </p>
              <div className="flex flex-wrap gap-3">
                {["Just for me", "Send to Clare", "Don't keep it"].map((label) => (
                  <span
                    key={label}
                    className="tap-target rounded-2xl border-2 border-border-strong px-5 py-3 text-base font-semibold"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="legacy">
        <SectionHeading
          eyebrow="Legacy"
          title="What a family ends up with."
          lede="Not a folder of audio files. Something a family can hold, hear and pass on."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEGACY_ARTIFACTS.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              body={item.body}
              delay={index * 60}
            />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <Reveal>
          <figure className="card-soft mx-auto max-w-3xl p-8 text-center lg:p-12">
            <Icon name="quote" className="mx-auto h-7 w-7 text-accent" />
            <blockquote className="text-subhead mt-5 text-foreground">
              “My mother told it a story about her brother that she has never told me in forty-eight
              years. I listened to it twice in a car park and then rang my brother.”
            </blockquote>
            <figcaption className="text-caption mt-5 text-muted-foreground">
              Clare — daughter, four hundred miles away
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <CtaBand
        title="Start collecting them while they're still being told."
        lede="Add ten photographs today and Sidekick will spend the next month asking about them."
        primaryLabel={t("cta.primary")}
        secondaryLabel={t("cta.secondary")}
      />
    </>
  );
}
