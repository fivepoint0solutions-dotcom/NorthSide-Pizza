import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { SCENARIOS } from "@/lib/site/content";
import { firstOf } from "@/lib/collections";
import { CheckList, CtaBand, PageHero, Section } from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scenarios")({
  head: () =>
    seoHead({
      path: "/scenarios",
      title: "Real-world situations — SR Sidekick",
      description:
        "Living independently, long-distance families, busy caregivers, multilingual households, senior living communities — what SR Sidekick does in each.",
    }),
  component: ScenariosPage,
});

function ScenariosPage() {
  const [active, setActive] = useState(firstOf(SCENARIOS).slug);
  const scenario = SCENARIOS.find((s) => s.slug === active) ?? firstOf(SCENARIOS);

  return (
    <>
      <PageHero
        eyebrow="Real-world situations"
        title="Find the one that sounds like your family."
        lede="Every household arrives here for a different reason. These are the seven we hear most often, and what actually changes in each."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start">
          <nav
            aria-label="Situations"
            className="flex gap-2 overflow-x-auto lg:sticky lg:top-28 lg:flex-col lg:overflow-visible"
          >
            {SCENARIOS.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActive(item.slug)}
                aria-current={item.slug === active ? "true" : undefined}
                className={cn(
                  "tap-target shrink-0 justify-start gap-2.5 rounded-2xl px-4 py-3.5 text-left text-[0.9375rem] font-semibold whitespace-nowrap transition-refined",
                  item.slug === active
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon name={item.icon} className="h-4.5 w-4.5" />
                {item.title}
              </button>
            ))}
          </nav>

          <Reveal key={scenario.slug} className="card-elevated flex flex-col gap-6 p-7 lg:p-10">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon name={scenario.icon} className="h-7 w-7" />
            </span>
            <div className="flex flex-col gap-3">
              <h2 className="text-headline text-foreground">{scenario.title}</h2>
              <p className="text-lede text-muted-foreground">{scenario.situation}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-title text-foreground">What changes</h3>
              <CheckList items={scenario.what} />
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Whichever one you recognised, setup is the same four minutes."
        lede="And the first conversation happens straight after."
        primaryLabel="Get started"
        secondaryLabel="Talk to our team"
      />
    </>
  );
}
