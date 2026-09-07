import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { ADVENTURES } from "@/lib/site/adventures";
import { SENIOR_VALUE } from "@/lib/site/content";
import { ACCESSIBILITY_COMMITMENTS } from "@/lib/site/trust";
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
import { SeniorExperience } from "@/components/product/SeniorExperience";
import { AdventureCard } from "@/components/adventures/AdventureCard";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";

export const Route = createFileRoute("/seniors")({
  head: () =>
    seoHead({
      path: "/seniors",
      title: "For seniors — the Senior Sidekick experience",
      description:
        "Huge controls, voice-first interaction, a personalised home screen and seven adventures. Built around independence and dignity, not supervision.",
    }),
  component: SeniorsPage,
});

function SeniorsPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t("nav.seniors")}
        title="Your day, your pace, your Sidekick."
        lede="No passwords, no updates, no menus and nothing to learn. Everything here works by talking — and if you'd rather tap, everything is large enough to tap without thinking about it."
        gradient="var(--grad-sunrise)"
      />

      {/* The interface */}
      <Section id="interface">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,30rem)_1fr] lg:items-center">
          <Reveal>
            <DeviceFrame kind="tablet">
              <SeniorExperience />
            </DeviceFrame>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="The senior interface"
              title="Six things on screen. Nothing hidden. Help always visible."
              lede="Try it — the screen beside this is the real interface, not a picture of one. Open an adventure, come back, and change the text size in the header to watch it adapt."
            />
            <CheckList
              items={[
                "Type that starts at 24px and scales to 40 without breaking",
                "Targets of 60px or more, spaced so a mis-tap doesn't end the session",
                "No icon without a word beside it",
                "One suggestion for today, chosen to be easy to say yes to",
                "A permanent microphone, and a permanent Help button",
                "The same screen every day — familiarity is a feature",
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Voice */}
      <Section tone="surface" id="voice">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Voice first"
              title="“Hey Senior Sidekick…”"
              lede="Everything in the product can be done by saying it. That includes the things technology usually makes hardest: calling someone, finding a photo, setting a reminder, changing a setting."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: "message-circle", label: "Ask anything" },
                { icon: "sparkles", label: "Start an activity" },
                { icon: "phone-call", label: "Call family by name" },
                { icon: "book-open", label: "Hear a story" },
                { icon: "clock", label: "Set a reminder" },
                { icon: "volume-2", label: "“Speak a bit slower”" },
              ].map((item) => (
                <p
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3.5 text-[1.0625rem] font-medium text-foreground"
                >
                  <Icon name={item.icon} className="h-5 w-5 text-primary" />
                  {item.label}
                </p>
              ))}
            </div>
          </div>
          <Reveal delay={80} className="flex justify-center">
            <SidekickAvatar state="listening" size={220} />
          </Reveal>
        </div>
      </Section>

      {/* What it gives back */}
      <Section id="value">
        <SectionHeading
          eyebrow="What it gives back"
          title="Independence, company, and something to look forward to."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SENIOR_VALUE.map((item, index) => (
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

      {/* Adventures */}
      <Section tone="surface" id="things-to-do">
        <SectionHeading
          eyebrow="Things to do"
          title="Seven ways to answer “what should we do today?”"
          lede="Say the word and the whole screen becomes something else."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVENTURES.map((adventure, index) => (
            <AdventureCard
              key={adventure.slug}
              adventure={adventure}
              delay={index * 60}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* Accessibility */}
      <Section id="accessibility">
        <SectionHeading
          eyebrow="Designed around you"
          title="Accessibility isn't a mode here. It's the default."
          lede="Large type, high contrast, big targets and voice control are how the product ships — not settings someone has to discover."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACCESSIBILITY_COMMITMENTS.slice(0, 6).map((item, index) => (
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
        <Reveal delay={120} className="mt-6">
          <SecondaryAction to="/accessibility" icon="arrow-right" size="md">
            Our full accessibility commitment
          </SecondaryAction>
        </Reveal>
      </Section>

      {/* Dignity */}
      <Section tone="surface">
        <Reveal>
          <div className="card-soft card-tint-warm mx-auto max-w-3xl p-8 text-center lg:p-12">
            <Icon name="heart" className="mx-auto h-8 w-8 text-primary" />
            <p className="text-subhead mt-5 text-foreground">
              Nothing in Senior Sidekick will ever tell you that you're old, remind you what you can
              no longer do, or report your afternoon to anyone.
            </p>
            <p className="text-lede mt-4 text-muted-foreground">
              It's a companion, and companions treat people as adults.
            </p>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Meet the Sidekick who's been waiting to know you."
        lede="Four minutes to set up, and someone in the family can sit with you the first time."
        primaryLabel={t("cta.primary")}
        secondaryLabel="Talk to a person"
      />
    </>
  );
}
