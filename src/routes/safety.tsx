import { createFileRoute } from "@tanstack/react-router";
import { SAFETY_PRINCIPLES } from "@/lib/site/trust";
import {
  CheckList,
  CtaBand,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety philosophy — Senior Sidekick" },
      {
        name: "description",
        content:
          "What Senior Sidekick is, what it is not, and how it escalates. Not a medical device, not an emergency service, and honest about both.",
      },
    ],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety"
        title="Supportive, responsible, and clear about its limits."
        lede="A companion that overstates what it can do is dangerous to exactly the people it's meant to help. So Senior Sidekick is unusually direct about where it stops."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_PRINCIPLES.map((item, index) => (
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

      <Section tone="surface" id="escalation">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Escalation"
              title="Agreed in advance, by the person it concerns."
              lede="Nothing about escalation is decided in the moment by an algorithm. During setup, the senior chooses who is contacted, for what, and how — and can change it any time by saying so."
            />
            <CheckList
              items={[
                "A named first contact, and a second if they'd like one",
                "What counts as worth contacting someone about — chosen by them",
                "Emergency services signposted clearly, never impersonated",
                "Reviewed on a schedule, and after anything that triggers it",
                "Always visible: they can ask “who would you call?” at any time",
              ]}
            />
          </div>

          <Reveal delay={80}>
            <div className="card-elevated flex flex-col gap-4 p-7">
              <span className="badge-pill w-fit bg-accent/25 text-accent-foreground">
                <Icon name="alert-circle" className="h-3.5 w-3.5" />
                How it actually answers
              </span>
              {[
                {
                  said: "My chest feels tight this morning.",
                  replied:
                    "That's not something I can assess, and I don't want to guess. Please call your doctor now — or if it's severe, emergency services. Would you like me to ring Clare as well?",
                },
                {
                  said: "Should I move some money into that account he mentioned?",
                  replied:
                    "I won't help with that one. Anything involving money under time pressure is worth pausing on. Speak to Clare or your bank first — they'll tell you straight away if it's genuine.",
                },
              ].map((beat, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <p className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-5 py-3 text-right font-medium text-primary-foreground">
                    {beat.said}
                  </p>
                  <div className="flex items-start gap-3">
                    <SidekickAvatar state="speaking" size={32} className="mt-1" />
                    <p className="text-body max-w-[92%] text-foreground">{beat.replied}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="card-soft card-tint-warm mx-auto max-w-3xl p-8 text-center lg:p-12">
            <Icon name="users" className="mx-auto h-8 w-8 text-primary" />
            <p className="text-subhead mt-5 text-foreground">
              If a companion ever becomes a reason for a family to visit less, it has failed.
            </p>
            <p className="text-lede mt-4 text-muted-foreground">
              We measure whether human contact goes up. That's the number that decides whether this
              product is working.
            </p>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Honest about what it is. Serious about what it isn't."
        lede="Read how privacy works, or talk to us about deploying this responsibly at scale."
        primaryLabel="Get started"
        secondaryLabel="Talk to our team"
      />
    </>
  );
}
