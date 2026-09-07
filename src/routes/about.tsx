import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { TRUST_PILLARS } from "@/lib/site/content";
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
import { SidekickAvatar } from "@/components/product/SidekickAvatar";

export const Route = createFileRoute("/about")({
  head: () =>
    seoHead({
      path: "/about",
      title: "About Senior Sidekick — why we built it",
      description:
        "Why Senior Sidekick exists, what we believe about designing for older adults, and the principles we won't trade away.",
    }),
  component: AboutPage,
});

const BELIEFS = [
  {
    icon: "user-check",
    title: "The person using it is the customer",
    body: "Not the family, not the facility, not an insurer. When those interests conflict — and they do — we side with the person whose home it's in.",
  },
  {
    icon: "message-circle",
    title: "Conversation is the interface",
    body: "Every menu is a small exam. Talking is the one interface nobody has to be taught, and the one that stays usable when eyesight and dexterity change.",
  },
  {
    icon: "heart",
    title: "Dignity is a design constraint",
    body: "Nothing in the product should make someone feel managed, monitored or diminished. That rules out a great deal that would otherwise be easy to build.",
  },
  {
    icon: "users",
    title: "It should increase human contact",
    body: "A companion that makes families visit less is a failure, however good the engagement numbers look.",
  },
  {
    icon: "globe",
    title: "Global from the start",
    body: "Ageing is universal; the way it's lived is not. Localisation was in the architecture before the first language shipped.",
  },
  {
    icon: "lock",
    title: "Trust compounds",
    body: "People share more when they're certain nothing is taken. Every privacy limit we've held has made the product better, not smaller.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The technology aimed at older adults is either an alarm or a tablet nobody asked for."
        lede="Neither is company. Senior Sidekick started from a simpler question: what would it take for someone living alone to have a good conversation on a Tuesday afternoon?"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,20rem)] lg:items-center">
          <div className="measure flex flex-col gap-5">
            <p className="text-lede text-foreground">
              Most products for this audience are built around what could go wrong. Falls, missed
              medication, wandering. All of it matters — and all of it is somebody else's job.
            </p>
            <p className="text-body text-muted-foreground">
              What nobody was building was the thing people actually said they missed: someone to
              talk to. Not a service, not a check-in, not a scheduled visit from a stranger. A
              conversation with something that knew who they were, remembered what they said last
              time, and had the time to hear a story out to the end.
            </p>
            <p className="text-body text-muted-foreground">
              That's the whole product. Everything else — the adventures, the memory system, the
              family dashboard, the permissions model — exists to make that one thing possible
              without asking the person to become a technology user first.
            </p>
            <p className="text-body text-muted-foreground">
              We build it slowly, test it with people over seventy, and refuse the features that
              would make it easier to sell and worse to live with.
            </p>
          </div>
          <Reveal delay={80} className="flex justify-center">
            <SidekickAvatar state="idle" size={220} />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="What we believe" title="Six positions, and what they cost us." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BELIEFS.map((belief, index) => (
            <FeatureCard key={belief.title} {...belief} delay={index * 60} index={index} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="The principles in practice" title="Where each of these lives." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 50} className="h-full">
              <div className="card-soft flex h-full flex-col gap-3 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={pillar.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-title text-foreground">{pillar.title}</h3>
                <p className="text-body text-muted-foreground">{pillar.body}</p>
                <SecondaryAction
                  to={pillar.href}
                  size="md"
                  icon="arrow-right"
                  className="mt-auto w-fit"
                >
                  Read more
                </SecondaryAction>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <Reveal>
          <div className="card-soft mx-auto flex max-w-3xl flex-col items-center gap-4 p-8 text-center lg:p-12">
            <Icon name="heart" className="h-8 w-8 text-primary" />
            <p className="text-subhead text-foreground">{BRAND.promise}</p>
            <SecondaryAction href={`mailto:${BRAND.contact.general}`} size="md">
              Tell us what we've got wrong
            </SecondaryAction>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="One companion. Many languages. Millions of lives."
        lede="That's the ambition. It starts with one good Tuesday afternoon."
        primaryLabel="Get started"
        secondaryLabel="Talk to our team"
      />
    </>
  );
}
