import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FAQ_GROUPS } from "@/lib/site/knowledge";
import { firstOf } from "@/lib/collections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand, PageHero, Section } from "@/components/site/Primitives";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions — Senior Sidekick" },
      {
        name: "description",
        content:
          "Answers for seniors, families, caregivers and organisations: privacy, safety, languages, plans and technology.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [group, setGroup] = useState(firstOf(FAQ_GROUPS).audience);
  const active = FAQ_GROUPS.find((g) => g.audience === group) ?? firstOf(FAQ_GROUPS);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers, organised by who's asking."
        lede="The questions below are the ones we're asked most often — including the sceptical ones, which are usually the most useful."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-start">
          <nav
            aria-label="FAQ categories"
            className="flex gap-2 overflow-x-auto lg:sticky lg:top-28 lg:flex-col lg:overflow-visible"
          >
            {FAQ_GROUPS.map((item) => (
              <button
                key={item.audience}
                type="button"
                onClick={() => setGroup(item.audience)}
                aria-current={item.audience === group ? "true" : undefined}
                className={cn(
                  "tap-target shrink-0 justify-start gap-2.5 rounded-2xl px-4 py-3 text-left text-[0.9375rem] font-semibold whitespace-nowrap transition-refined",
                  item.audience === group
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon name={item.icon} className="h-4.5 w-4.5" />
                {item.audience}
              </button>
            ))}
          </nav>

          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {active.items.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`${active.audience}-${index}`}
                className="card-soft border-none px-6"
              >
                <AccordionTrigger className="py-5 text-left text-[1.0625rem] font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-body pb-5 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <CtaBand
        title="Still wondering about something?"
        lede="A person answers, seven days a week, in four languages."
        primaryLabel="Get started"
        secondaryLabel="Contact support"
      />
    </>
  );
}
