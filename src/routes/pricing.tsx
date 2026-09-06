import { createFileRoute } from "@tanstack/react-router";
import { PLANS, PRICING_NOTES } from "@/lib/site/plans";
import { FAQ_GROUPS } from "@/lib/site/knowledge";
import {
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  PrimaryAction,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Plans & pricing — Senior Sidekick" },
      {
        name: "description",
        content:
          "From $19 a month for one person, $29 for a family. Thirty days free, no card to start, and cancellation in one step.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const pricingFaq = FAQ_GROUPS.find((group) => group.audience === "Plans & technology");

  return (
    <>
      <PageHero
        eyebrow="Plans"
        title="One price. No advertising, no data sales, no upsells inside the product."
        lede="What the household pays is the entire business model — which is why nothing in Senior Sidekick is ever trying to sell anyone anything."
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {PLANS.slice(0, 3).map((plan, index) => (
            <Reveal key={plan.slug} delay={index * 70} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col gap-5 p-7",
                  plan.featured
                    ? "card-elevated card-tint-warm ring-2 ring-accent/50"
                    : "card-soft",
                )}
              >
                {plan.featured ? (
                  <span className="badge-pill w-fit bg-accent text-accent-foreground">
                    Most families choose this
                  </span>
                ) : null}
                <div>
                  <h2 className="text-subhead text-foreground">{plan.name}</h2>
                  <p className="text-caption text-muted-foreground">{plan.audience}</p>
                </div>
                <p className="flex items-baseline gap-2">
                  <span className="text-display text-[2.75rem] leading-none text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-caption text-muted-foreground">{plan.cadence}</span>
                </p>
                <p className="text-body text-muted-foreground">{plan.summary}</p>
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-1 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span className="text-[0.9375rem] text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  {plan.featured ? (
                    <PrimaryAction to="/get-started" size="md" className="w-full">
                      {plan.cta}
                    </PrimaryAction>
                  ) : (
                    <SecondaryAction to="/get-started" size="md" className="w-full">
                      {plan.cta}
                    </SecondaryAction>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {PLANS.slice(3).map((plan, index) => (
            <Reveal key={plan.slug} delay={index * 70} className="h-full">
              <article className="card-soft card-tint-cool flex h-full flex-col gap-4 p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h2 className="text-subhead text-foreground">{plan.name}</h2>
                    <p className="text-caption text-muted-foreground">{plan.audience}</p>
                  </div>
                  <p className="flex items-baseline gap-2">
                    <span className="text-subhead text-foreground">{plan.price}</span>
                    <span className="text-caption text-muted-foreground">{plan.cadence}</span>
                  </p>
                </div>
                <p className="text-body text-muted-foreground">{plan.summary}</p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-1 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span className="text-[0.9375rem] text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <SecondaryAction
                  to="/partners"
                  size="md"
                  icon="arrow-right"
                  className="mt-auto w-fit"
                >
                  {plan.cta}
                </SecondaryAction>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {PRICING_NOTES.map((note) => (
              <li key={note} className="text-caption flex items-start gap-2 text-muted-foreground">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {pricingFaq ? (
        <Section tone="surface">
          <SectionHeading eyebrow="Questions" title="The ones people actually ask." />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {pricingFaq.items.map((item, index) => (
              <Reveal key={item.q} delay={index * 60} className="h-full">
                <div className="card-soft flex h-full flex-col gap-2 p-6">
                  <h3 className="text-title text-foreground">{item.q}</h3>
                  <p className="text-body text-muted-foreground">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Thirty days free. No card required."
        lede="If it hasn't earned its place in the household by day thirty, cancel in one step."
        primaryLabel="Get started"
        secondaryLabel="Talk to our team"
      />
    </>
  );
}
