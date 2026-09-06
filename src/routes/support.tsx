import { createFileRoute } from "@tanstack/react-router";
import { SUPPORT_CHANNELS } from "@/lib/site/knowledge";
import { BRAND } from "@/lib/brand";
import { LANGUAGES } from "@/lib/i18n";
import {
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  SecondaryAction,
} from "@/components/site/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & contact — Senior Sidekick" },
      {
        name: "description",
        content:
          "A phone number answered by a person, seven days a week, in four languages — plus help articles, accessibility support and account help.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="A phone number, answered by a person."
        lede="No menu tree, no chatbot as the front door, and no expectation that an eighty-year-old will file a ticket. If you can reach us at all, you can reach a human."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT_CHANNELS.map((channel, index) => (
            <Reveal key={channel.title} delay={index * 60} className="h-full">
              <article className="card-elevated flex h-full flex-col gap-3 p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={channel.icon} className="h-6 w-6" />
                </span>
                <h2 className="text-title text-foreground">{channel.title}</h2>
                <p className="text-body text-muted-foreground">{channel.body}</p>
                <span className="text-caption mt-auto flex items-center gap-1.5 pt-3 font-semibold text-primary">
                  {channel.action}
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="card-soft flex flex-col gap-4 p-7">
            <h2 className="text-subhead text-foreground">Write to us</h2>
            <ul className="flex flex-col gap-3">
              {[
                { label: "General enquiries", value: BRAND.contact.general },
                { label: "Support", value: BRAND.contact.support },
                { label: "Accessibility", value: BRAND.contact.accessibility },
                { label: "Privacy", value: BRAND.contact.privacy },
                { label: "Partnerships", value: BRAND.contact.partnerships },
              ].map((item) => (
                <li key={item.value} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body text-muted-foreground">{item.label}</span>
                  <a
                    href={`mailto:${item.value}`}
                    className="link-underline text-[0.9375rem] font-semibold"
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="card-soft flex flex-col gap-4 p-7">
            <h2 className="text-subhead text-foreground">Support in your language</h2>
            <p className="text-body text-muted-foreground">
              Support is staffed by speakers of every language the product ships in — not a
              translation layer over an English-speaking team.
            </p>
            <ul className="flex flex-wrap gap-2">
              {LANGUAGES.map((language) => (
                <li
                  key={language.code}
                  className="badge-pill bg-secondary text-secondary-foreground"
                >
                  <Icon name="globe" className="h-3.5 w-3.5" />
                  {language.nativeName}
                </li>
              ))}
            </ul>
            <SecondaryAction to="/faq" icon="arrow-right" size="md" className="mt-auto w-fit">
              Browse the FAQ first
            </SecondaryAction>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Setting someone up"
          title="If you're helping a parent get started."
          lede="Most of what people call support in this category is really setup. Here's the short version."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Add photos first",
              body: "Ten is plenty. It changes the first week entirely.",
              icon: "image-plus",
            },
            {
              title: "Add three songs",
              body: "From their twenties. Music is almost always the first adventure.",
              icon: "music",
            },
            {
              title: "Sit with them once",
              body: "Twenty minutes, one conversation. After that they don't need you.",
              icon: "users",
            },
            {
              title: "Let them set permissions",
              body: "It's their account. People share more when they're asked.",
              icon: "shield-check",
            },
          ].map((step, index) => (
            <Reveal key={step.title} delay={index * 60} as="li" className="h-full">
              <div className="card-soft flex h-full flex-col gap-3 p-6">
                <span className="text-eyebrow text-primary">Step {index + 1}</span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon name={step.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-title text-foreground">{step.title}</h3>
                <p className="text-body text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="We'd rather answer a question than lose a household."
        lede="Call us before you cancel — nine times out of ten it's a setting."
        primaryLabel="Get started"
        secondaryLabel="Read the FAQ"
        secondaryTo="/faq"
      />
    </>
  );
}
