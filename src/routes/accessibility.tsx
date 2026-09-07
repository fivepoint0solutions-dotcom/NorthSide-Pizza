import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { ACCESSIBILITY_COMMITMENTS } from "@/lib/site/trust";
import { BRAND } from "@/lib/brand";
import { useAccessibility } from "@/lib/accessibility";
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    seoHead({
      path: "/accessibility",
      title: "Accessibility — Senior Sidekick",
      description:
        "Accessibility as a product principle: large type by default, 7:1 contrast, 60px targets, voice-first input, screen reader support and calm motion. WCAG 2.2 AA as a floor.",
    }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  const { textScale, contrast, motion, setTextScale, setContrast, setMotion } = useAccessibility();

  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Not a checkbox at the end. The thing the design started from."
        lede="If accessibility is added last, it shows. Every decision here — type, colour, spacing, motion, language, error handling — was made with the same people in mind, at the same time."
      />

      {/* Live controls */}
      <Section id="try">
        <SectionHeading
          eyebrow="Try it on this page"
          title="These controls change the whole site, right now."
          lede="The same controls live in the header of every page. They're stored on this device, so the site stays the way you set it."
        />
        <Reveal className="mt-8">
          <div className="card-elevated grid gap-6 p-7 sm:grid-cols-3 lg:p-9">
            <ControlGroup
              label="Text size"
              value={textScale}
              onChange={(v) => setTextScale(v as typeof textScale)}
              options={[
                { value: "normal", label: "Normal" },
                { value: "large", label: "Large" },
                { value: "xlarge", label: "Largest" },
              ]}
            />
            <ControlGroup
              label="Contrast"
              value={contrast}
              onChange={(v) => setContrast(v as typeof contrast)}
              options={[
                { value: "normal", label: "Standard" },
                { value: "high", label: "High" },
              ]}
            />
            <ControlGroup
              label="Motion"
              value={motion}
              onChange={(v) => setMotion(v as typeof motion)}
              options={[
                { value: "full", label: "Full" },
                { value: "reduced", label: "Calm" },
              ]}
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Commitments" title="What we hold ourselves to." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACCESSIBILITY_COMMITMENTS.map((item, index) => (
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

      <Section id="standards">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="card-soft flex flex-col gap-4 p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon name="shield-check" className="h-6 w-6" />
            </span>
            <h2 className="text-title text-foreground">Conformance</h2>
            <p className="text-body text-muted-foreground">
              Senior Sidekick targets WCAG 2.2 Level AA across the marketing site, the senior
              experience and the family dashboard, and exceeds it on contrast and target size in the
              senior experience. We publish what we don't yet meet rather than claiming a clean
              sheet.
            </p>
            <ul className="text-body flex flex-col gap-2 text-muted-foreground">
              {[
                "Independent audit annually, and after any major release",
                "Automated checks on every pull request",
                "Manual testing with VoiceOver, NVDA and TalkBack",
                "A published statement listing known gaps and target dates",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="card-soft flex flex-col gap-4 p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon name="users" className="h-6 w-6" />
            </span>
            <h2 className="text-title text-foreground">Tested with the people it's for</h2>
            <p className="text-body text-muted-foreground">
              An automated checker can tell you a contrast ratio. It can't tell you that a
              seventy-nine-year-old with a tremor can't hit that button twice in a row. Every
              release is tested with adults over seventy, including participants with low vision,
              hearing loss, tremor and early cognitive change.
            </p>
            <SecondaryAction
              href={`mailto:${BRAND.contact.accessibility}`}
              size="md"
              className="mt-auto w-fit"
            >
              Report an accessibility problem
            </SecondaryAction>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="If any part of this site is hard to use, that's our defect."
        lede="Tell us and we'll fix it — accessibility reports go to the front of the queue."
        primaryLabel="Get started"
        secondaryLabel="Contact support"
      />
    </>
  );
}

function ControlGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-eyebrow mb-3 text-muted-foreground">{label}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "tap-target justify-start rounded-2xl border px-5 py-3 text-left text-[1.0625rem] font-semibold transition-refined",
              value === option.value
                ? "border-interactive bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:border-interactive hover:text-interactive",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
