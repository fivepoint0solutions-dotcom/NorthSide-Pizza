import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { RESOURCES } from "@/lib/site/knowledge";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () =>
    seoHead({
      path: "/resources",
      title: "Resources — guides for families, caregivers and seniors",
      description:
        "Practical guides on caregiving, family connection, memory preservation, accessible technology and multilingual households.",
    }),
  component: ResourcesPage,
});

const AUDIENCES = ["All", "Families", "Caregivers", "Seniors", "Professionals", "Everyone"];

function ResourcesPage() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.audience === filter);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="What we've learned, written down properly."
        lede="Guides on caregiving, connection and memory — useful whether or not you ever use our product. Nothing here is a brochure in disguise."
        gradient="var(--grad-stories)"
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((audience) => (
            <button
              key={audience}
              type="button"
              onClick={() => setFilter(audience)}
              aria-pressed={filter === audience}
              className={cn(
                "tap-target rounded-full border px-5 py-2.5 text-[0.9375rem] font-semibold transition-refined",
                filter === audience
                  ? "gradient-action gradient-motion border-transparent text-white"
                  : "border-border text-muted-foreground hover:border-interactive hover:text-interactive",
              )}
            >
              {audience}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((resource, index) => (
            <Reveal key={resource.title} delay={index * 50} className="h-full">
              <article className="card-elevated flex h-full flex-col gap-3 p-6">
                <span className="flex items-center gap-2">
                  <span className="badge-pill bg-secondary text-secondary-foreground">
                    {resource.kind}
                  </span>
                  <span className="text-caption text-muted-foreground">
                    {resource.minutes} min read
                  </span>
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={resource.icon} className="h-5.5 w-5.5" />
                </span>
                <h2 className="text-title text-foreground">{resource.title}</h2>
                <p className="text-body text-muted-foreground">{resource.summary}</p>
                <span className="text-caption mt-auto pt-3 font-semibold text-primary">
                  For {resource.audience.toLowerCase()}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Also worth your time"
          title="Things we didn't write."
          lede="Independent organisations doing serious work on ageing, loneliness and caregiving. We'd rather point you at them than paraphrase them."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "National caregiver support networks",
              body: "Practical, local help for the person doing the coordinating.",
              icon: "hand-heart",
            },
            {
              title: "Loneliness and social isolation research",
              body: "The evidence base, including the parts that complicate our own story.",
              icon: "book-open",
            },
            {
              title: "Accessibility organisations",
              body: "Guidance on low vision, hearing loss and assistive technology.",
              icon: "accessibility",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <div className="card-soft flex h-full flex-col gap-3 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={item.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-title text-foreground">{item.title}</h3>
                <p className="text-body text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="The first week is the one that matters."
        lede="Read the first-week guide, then set it up in about four minutes."
        primaryLabel="Get started"
        secondaryLabel="Talk to our team"
      />
    </>
  );
}
