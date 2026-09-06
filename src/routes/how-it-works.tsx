import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { useT } from "@/lib/i18n";
import { PRODUCT_JOURNEY } from "@/lib/site/content";
import { PILLARS } from "@/lib/site/pillars";
import { LocationSafetyDemo } from "@/components/product/LocationSafetyDemo";
import { AudioTherapyDemo } from "@/components/product/AudioTherapyDemo";
import { MEMORY_SYSTEM, PERSONALISATION } from "@/lib/site/trust";
import { Reveal } from "@/components/motion/Reveal";
import {
  CtaBand,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  CheckList,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Icon } from "@/components/site/Icon";
import { ConversationDemo } from "@/components/product/ConversationDemo";
import { DeviceFrame } from "@/components/product/DeviceFrame";
import { SeniorExperience } from "@/components/product/SeniorExperience";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    seoHead({
      path: "/how-it-works",
      title: "How SR Sidekick works — voice-first companionship",
      description:
        "Say a sentence and something happens. How SR Sidekick listens, remembers, personalises and grows — and what it deliberately never does.",
    }),
  component: HowItWorksPage,
});

const VOICE_EXAMPLES = [
  "“Hey Sidekick, what should we do today?”",
  "“Play me something from 1962.”",
  "“Call my daughter.”",
  "“Tell me a story.”",
  "“Remind me to take my tablets at six.”",
  "“Speak a bit slower.”",
  "“Show me the photos Clare sent.”",
  "“Let's talk about the garden.”",
];

function HowItWorksPage() {
  const t = useT();
  const locationSafety = PILLARS.find((p) => p.slug === "orientation")!;
  const audioTherapy = PILLARS.find((p) => p.slug === "audio")!;
  const otherPillars = PILLARS.filter((p) => p.slug !== "orientation" && p.slug !== "audio");

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Say a sentence. Something happens."
        lede="There is no home screen to learn, no settings to configure and nothing to type. The whole product is reachable by talking — and everything it does gets more personal the longer you use it."
      >
        <div className="flex flex-wrap gap-3">
          <SecondaryAction to="/seniors" icon="arrow-right" size="md">
            The senior experience
          </SecondaryAction>
          <SecondaryAction to="/families" icon="arrow-right" size="md">
            The family experience
          </SecondaryAction>
        </div>
      </PageHero>

      {/* Voice first */}
      <Section id="voice">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Voice first"
              title="The only interface most people ever need is a sentence."
              lede="Typing is optional everywhere in SR Sidekick, including setup. Voice isn't an accessibility feature bolted on at the end — it's the primary way the product works, which is why it works for people who never got on with a smartphone."
            />
            <ul className="flex flex-wrap gap-2">
              {VOICE_EXAMPLES.map((example) => (
                <li key={example} className="chip cursor-default">
                  {example}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={80}>
            <ConversationDemo />
          </Reveal>
        </div>
      </Section>

      {/* The two flagship features, given the room they need */}
      <Section id="location-safety">
        <SectionHeading
          eyebrow="Flagship feature · Location Safety"
          title="Before anything else, it answers where am I."
          lede="This is the first pillar for a reason: companionship means nothing if someone is disoriented. It's answered plainly, on the senior's own screen, without anyone having to ask a person."
        />
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <Reveal className="mx-auto lg:mx-0">
            <DeviceFrame kind="phone">
              <LocationSafetyDemo />
            </DeviceFrame>
          </Reveal>
          <Reveal delay={80}>
            <CheckList items={locationSafety.detail} />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" id="audio-therapy">
        <SectionHeading
          eyebrow="Flagship feature · Audio Therapy"
          title="Music built for memory, and sound built for the hard hours."
          lede="A nostalgia playlist the family actually chose, plus a bank of calming, therapeutic audio for restlessness, sundowning and settling at night."
        />
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,22rem)]">
          <Reveal>
            <CheckList items={audioTherapy.detail} />
          </Reveal>
          <Reveal delay={80} className="mx-auto lg:mx-0">
            <DeviceFrame kind="phone">
              <AudioTherapyDemo />
            </DeviceFrame>
          </Reveal>
        </div>
      </Section>

      {/* The remaining four pillars */}
      <Section id="platform">
        <SectionHeading
          eyebrow="The rest of the platform"
          title="Four more things it does every day."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherPillars.map((pillar, index) => (
            <Reveal key={pillar.slug} delay={index * 60} className="h-full">
              <article className="card-elevated flex h-full flex-col gap-3 p-6">
                <span
                  className="gradient-motion inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-raised"
                  style={{ backgroundImage: pillar.gradient }}
                >
                  <Icon name={pillar.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-title text-foreground">{pillar.name}</h3>
                <p className="text-body text-muted-foreground">{pillar.summary}</p>
                <p className="text-caption font-display mt-auto pt-2 text-foreground/70 italic">
                  {pillar.invocation}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The journey */}
      <Section tone="surface" id="journey">
        <SectionHeading
          eyebrow="The journey"
          title="Meet → Personalise → Connect → Explore → Remember → Grow"
          lede="Roughly four minutes of setup, then a relationship that compounds."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_JOURNEY.map((step, index) => (
            <Reveal key={step.key} delay={index * 70} as="li" className="h-full">
              <div className="card-elevated flex h-full flex-col gap-3 p-6">
                <span className="text-eyebrow text-primary">Step {index + 1}</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-title text-foreground">{step.title}</h3>
                <p className="text-body text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* The daily journey */}
      <Section id="daily">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_minmax(0,24rem)] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="A personalised day"
              title="Not a dashboard. A day that arrives already shaped."
              lede="Most technology hands people an empty screen and waits. SR Sidekick opens with something worth doing — chosen from what they enjoyed last week, what's happening in the family, and how this particular morning is going."
            />
            <CheckList
              items={[
                "A morning greeting that knows the date, the weather and what arrived overnight",
                "One suggestion, not a feed — chosen to be easy to say yes to",
                "Personal reminders, in their own words, at the times they actually work",
                "Family events surfaced before they're missed, not after",
                "Conversation prompts drawn from what they told it yesterday",
                "An evening reflection that closes the day rather than letting it trail off",
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

      {/* Memory */}
      <Section tone="surface" id="memory">
        <SectionHeading
          eyebrow="The memory system"
          title="It remembers, so they don't have to."
          lede="Everything Sidekick learns is stored on the senior's own account, used to make conversation warmer, and searchable years later by anyone they've shared it with."
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
        <Reveal delay={120} className="mt-6">
          <SecondaryAction to="/memories" icon="arrow-right" size="md">
            Memories, legacy and what families keep
          </SecondaryAction>
        </Reveal>
      </Section>

      {/* Adaptive */}
      <Section id="adaptive">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center">
          <Reveal className="flex justify-center">
            <SidekickAvatar state="idle" size={200} />
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Adaptive by design"
              title="More personal, never more complicated."
              lede="The usual trap in personalisation is that the product grows features. SR Sidekick grows understanding: the screen on day four hundred looks exactly like day one, and gets almost everything right."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {PERSONALISATION.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="text-caption text-muted-foreground">{item.body}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Boundaries */}
      <Section tone="surface" id="boundaries">
        <div className="card-soft card-tint-cool grid gap-8 p-7 lg:grid-cols-2 lg:p-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-subhead text-foreground">What it is</h2>
            <CheckList
              items={[
                "A companion for conversation, activity and connection",
                "A voice-first way to reach family without a phone",
                "A place a life story can be kept safely",
                "A daily structure for people whose days lost theirs",
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-subhead text-foreground">What it is not</h2>
            <ul className="flex flex-col gap-3">
              {[
                "A medical device, or a substitute for professional care",
                "A continuous monitoring or movement-tracking system",
                "An emergency service",
                "A replacement for the people who love them",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon name="x" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  <span className="text-body text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <SecondaryAction to="/safety" icon="arrow-right" size="md" className="mt-2 w-fit">
              Our safety philosophy
            </SecondaryAction>
          </div>
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
