import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { LANGUAGES, formatLongDate, useT, type LanguageCode } from "@/lib/i18n";
import {
  CheckList,
  CtaBand,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/Primitives";
import { WorldMap } from "@/components/product/WorldMap";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/languages")({
  head: () =>
    seoHead({
      path: "/languages",
      title: "Languages & global localisation — SR Sidekick",
      description:
        "English, French, Spanish and Hindi — localised in voice, conversation, activities, stories, dates and cultural references, not just menus.",
    }),
  component: LanguagesPage,
});

/** The same moment, authored natively in each language rather than translated. */
const GREETINGS: Record<LanguageCode, { greeting: string; suggestion: string; note: string }> = {
  en: {
    greeting: "Good morning, Margaret.",
    suggestion:
      "It's bright out. Shall we start with some music, or would you like to see the photo Clare sent overnight?",
    note: "British and American English voices; music, history and humour keyed to the region.",
  },
  fr: {
    greeting: "Bonjour, Marguerite.",
    suggestion:
      "Il fait beau ce matin. On commence par un peu de musique, ou vous préférez voir la photo que Claire a envoyée cette nuit ?",
    note: "Vouvoiement by default, switching to tu only if she asks. Chanson française, not translated pop.",
  },
  es: {
    greeting: "Buenos días, Margarita.",
    suggestion:
      "Hace un día precioso. ¿Empezamos con música, o prefieres ver la foto que mandó Clara anoche?",
    note: "Peninsular or Latin American Spanish, with regional music libraries and the right saint's days.",
  },
  hi: {
    greeting: "सुप्रभात, सुनीता जी।",
    suggestion:
      "आज मौसम बहुत अच्छा है। थोड़ा संगीत सुनें, या पहले वह तस्वीर देखें जो रात को क्लारा ने भेजी है?",
    note: "Respectful address with जी, natural code-switching with English, and a festival calendar that matters.",
  },
};

function LanguagesPage() {
  const t = useT();
  const [preview, setPreview] = useState<LanguageCode>("en");
  const active = GREETINGS[preview];

  return (
    <>
      <PageHero
        eyebrow={t("global.eyebrow")}
        title={t("global.title")}
        lede={t("global.lede")}
        gradient="var(--grad-explore)"
      />

      {/* Live preview */}
      <Section id="preview">
        <SectionHeading
          eyebrow="The same morning, four languages"
          title="Localisation you can hear, not just read."
          lede="Tap a language. This is the same moment written natively in each one — different register, different music, different holidays, different sense of humour."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => setPreview(language.code)}
              aria-pressed={preview === language.code}
              className={cn(
                "tap-target rounded-full border px-6 py-3 text-[1.0625rem] font-semibold transition-refined",
                preview === language.code
                  ? "gradient-action gradient-motion border-transparent text-white"
                  : "border-border text-muted-foreground hover:border-interactive hover:text-interactive",
              )}
            >
              {language.nativeName}
            </button>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="card-elevated card-tint-cool grid gap-6 p-7 lg:grid-cols-[auto_1fr] lg:p-9">
            <SidekickAvatar state="speaking" size={88} />
            <div className="flex flex-col gap-3" aria-live="polite" lang={preview}>
              <p className="text-caption text-muted-foreground">
                {formatLongDate(preview, new Date())}
              </p>
              <p className="text-subhead text-foreground">{active.greeting}</p>
              <p className="text-senior text-muted-foreground">{active.suggestion}</p>
              <p className="text-caption mt-2 flex items-start gap-2 text-primary" lang="en">
                <Icon name="sparkles" className="mt-0.5 h-4 w-4 shrink-0" />
                {active.note}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* What gets localised */}
      <Section tone="surface" id="what">
        <SectionHeading
          eyebrow="What actually gets localised"
          title="Everything a person would notice."
          lede="A translated menu on top of an English product is obvious within a minute, especially to someone who has spent eighty years in another language."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "layout-dashboard",
              title: "Interface",
              body: "Every label, in the right register for addressing an elder.",
            },
            { icon: "mic-vocal", title: "Voice", body: "Native speakers, not a converted accent." },
            {
              icon: "message-circle",
              title: "Conversation",
              body: "Idiom, humour and politeness conventions that belong to the language.",
            },
            {
              icon: "sparkles",
              title: "Activities",
              body: "Games and trivia about the country they actually lived in.",
            },
            {
              icon: "book-open",
              title: "Stories",
              body: "Folk tales and history from the right tradition.",
            },
            {
              icon: "calendar",
              title: "Dates & numbers",
              body: "Local formats, calendars and holidays.",
            },
            {
              icon: "music",
              title: "Music",
              body: "The songs of their era in their country — not a translated chart.",
            },
            {
              icon: "bell",
              title: "Notifications",
              body: "Written natively, including the family-facing ones.",
            },
          ].map((item, index) => (
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

      {/* Switching */}
      <Section id="switching">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Language switching"
              title="Change it by saying so. Mid-sentence, if you like."
              lede="Language is not a setting buried three screens deep — it's a thing you say. Multilingual households use this constantly, in both directions."
            />
            <CheckList
              items={[
                "Chosen during onboarding, in the language the person already speaks",
                "Changed at any time: “parlons en français” is enough",
                "Asymmetric conversation — speak one language, hear another",
                "Mixed-language conversation, for households that live that way",
                "Family messages translated between generations without losing warmth",
                "Each family member can use the dashboard in their own language",
              ]}
            />
          </div>
          <Reveal delay={80}>
            <div className="card-soft flex flex-col gap-4 p-7">
              {[
                { who: "senior", text: "Sidekick, parlons en français aujourd'hui." },
                {
                  who: "sidekick",
                  text: "Bien sûr. On continue en français — vous me disiez que votre petit-fils vient dimanche ?",
                },
                { who: "senior", text: "Oui. Mais écris-lui en anglais, il ne comprend pas." },
                {
                  who: "sidekick",
                  text: "C'est noté. Je lui enverrai votre message en anglais, et je vous lirai sa réponse en français.",
                },
              ].map((line, index) =>
                line.who === "senior" ? (
                  <p
                    key={index}
                    className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-5 py-3 text-right font-medium text-primary-foreground"
                    lang="fr"
                  >
                    {line.text}
                  </p>
                ) : (
                  <div key={index} className="flex items-start gap-3">
                    <SidekickAvatar state="speaking" size={32} className="mt-1" />
                    <p className="text-body max-w-[92%] text-foreground" lang="fr">
                      {line.text}
                    </p>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Cultural */}
      <Section tone="surface" id="culture">
        <SectionHeading
          eyebrow="Cultural localisation"
          title="Global doesn't mean English with subtitles."
          lede="A Hindi user's Memory Lane is not an English one with the words swapped. The questions are different, because the lives were."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "user",
              title: "Names & address",
              body: "Honorifics, formality and the right way to address an elder — जी, vous, usted, first names.",
            },
            {
              icon: "users",
              title: "Family structures",
              body: "Multi-generational households, extended family and the relationships each language names precisely.",
            },
            {
              icon: "calendar-check",
              title: "Holidays",
              body: "Diwali, Christmas, Eid, Thanksgiving, Toussaint — celebrated, not just noted.",
            },
            {
              icon: "music",
              title: "Music & food",
              body: "The songs and dishes that carry memory in that culture.",
            },
            {
              icon: "book-open",
              title: "History",
              body: "The events a generation actually lived through, from where they lived through them.",
            },
            {
              icon: "message-circle",
              title: "Communication style",
              body: "Directness, humour, small talk and silence differ by culture. So does Sidekick.",
            },
          ].map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              body={item.body}
              delay={index * 60}
            />
          ))}
        </div>
      </Section>

      {/* Map */}
      <Section id="regions">
        <SectionHeading
          eyebrow="Availability"
          title="Where SR Sidekick is today, and where it's going."
        />
        <Reveal className="mt-10">
          <WorldMap />
        </Reveal>
      </Section>

      <CtaBand
        title="Choose the language during setup. Change it whenever you like."
        lede="Four languages now. The localisation architecture is built for forty."
        primaryLabel={t("cta.primary")}
        secondaryLabel={t("cta.secondary")}
      />
    </>
  );
}
