import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/site/seo";
import { ADVENTURES } from "@/lib/site/adventures";
import { PERMISSIONS } from "@/lib/site/trust";
import { LANGUAGES, useLanguage, useT, type LanguageCode } from "@/lib/i18n";
import { PageHero, Section, PrimaryAction, SecondaryAction } from "@/components/site/Primitives";
import { SidekickAvatar } from "@/components/product/SidekickAvatar";
import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/get-started")({
  head: () =>
    seoHead({
      path: "/get-started",
      title: "Get started — meet your Senior Sidekick",
      description:
        "Eight short steps, about four minutes: who it's for, the language, the interests, the people and the permissions. Then the first conversation.",
    }),
  component: GetStartedPage,
});

type Role = "senior" | "family" | "caregiver" | "organisation";

interface OnboardingState {
  role: Role | null;
  forSelf: boolean;
  name: string;
  language: LanguageCode;
  interests: string[];
  people: string[];
  permissions: Record<string, boolean>;
}

const TOTAL_STEPS = 8;

/**
 * Guided onboarding, run entirely in the browser.
 *
 * This is a real working flow rather than a picture of one — a visitor can
 * complete it, see the companion assembled from their answers, and get a
 * genuine sense of how little is asked of them. Nothing is submitted
 * anywhere: the last step hands off to the real sign-up.
 */
function GetStartedPage() {
  const t = useT();
  const { setLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<OnboardingState>({
    role: null,
    forSelf: true,
    name: "",
    language: "en",
    interests: ["music", "memory-lane"],
    people: [],
    permissions: Object.fromEntries(
      PERMISSIONS.filter((p) => p.familyDefault === "with-permission").map((p) => [p.what, false]),
    ),
  });

  const update = (patch: Partial<OnboardingState>) => setState((prev) => ({ ...prev, ...patch }));
  const displayName = state.name.trim() || (state.forSelf ? "there" : "your parent");

  const canContinue = useMemo(() => {
    if (step === 1) return state.role !== null;
    if (step === 2) return state.name.trim().length > 0;
    if (step === 5) return state.interests.length > 0;
    return true;
  }, [step, state]);

  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Eight short steps. About four minutes."
        lede="Nothing here is a form. Set it up on this page and see the companion take shape as you go — or hand the whole thing to Sidekick and answer out loud instead."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-eyebrow text-primary">
              {t("common.step", { current: step, total: TOTAL_STEPS })}
            </p>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
              aria-label="Setup progress"
            >
              <div
                className="gradient-hero gradient-motion h-full rounded-full transition-refined"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          <div className="card-elevated flex min-h-[26rem] flex-col gap-6 p-7 lg:p-10">
            {step === 1 ? (
              <StepShell title="Who are you?" hint="This only changes what we show you next.">
                <Choices
                  options={[
                    { value: "senior", label: "I'm setting this up for myself", icon: "user" },
                    { value: "family", label: "I'm a family member", icon: "users" },
                    {
                      value: "caregiver",
                      label: "I'm a professional caregiver",
                      icon: "hand-heart",
                    },
                    {
                      value: "organisation",
                      label: "I represent an organisation",
                      icon: "building-2",
                    },
                  ]}
                  value={state.role ?? ""}
                  onChange={(value) => update({ role: value as Role, forSelf: value === "senior" })}
                />
              </StepShell>
            ) : null}

            {step === 2 ? (
              <StepShell
                title={state.forSelf ? "What should Sidekick call you?" : "Who is it for?"}
                hint={
                  state.forSelf
                    ? "Whatever you'd like to be called. It'll use this every morning."
                    : "Their first name, or whatever they like being called."
                }
              >
                <label className="flex flex-col gap-2">
                  <span className="sr-only">Name</span>
                  <input
                    value={state.name}
                    onChange={(event) => update({ name: event.target.value })}
                    placeholder="Margaret"
                    className="tap-target w-full rounded-2xl border-2 border-border bg-background px-5 py-4 text-xl font-medium text-foreground focus-visible:border-interactive"
                  />
                </label>
                <p className="text-caption flex items-start gap-2 text-muted-foreground">
                  <Icon name="mic" className="mt-0.5 h-4 w-4 shrink-0" />
                  In the product, this step is a question Sidekick asks out loud. Nobody has to type
                  anything.
                </p>
              </StepShell>
            ) : null}

            {step === 3 ? (
              <StepShell
                title="Which language?"
                hint="Voice, conversation, activities, stories and dates all change with it — not just the menus."
              >
                <Choices
                  options={LANGUAGES.map((language) => ({
                    value: language.code,
                    label: `${language.nativeName} — ${language.voice}`,
                    icon: "globe",
                  }))}
                  value={state.language}
                  onChange={(value) => {
                    update({ language: value as LanguageCode });
                    setLanguage(value as LanguageCode);
                  }}
                />
              </StepShell>
            ) : null}

            {step === 4 ? (
              <StepShell title="Meet your Sidekick" hint="This is the first thing it will say.">
                <div className="flex flex-col items-center gap-5 py-4 text-center">
                  <SidekickAvatar state="speaking" size={140} />
                  <p className="text-senior measure text-foreground">
                    “Hello, {displayName}. I'm your Sidekick. I'm here whenever you want company —
                    to talk, to play something, or to look at old photographs together. Shall we
                    start with a bit of music?”
                  </p>
                </div>
              </StepShell>
            ) : null}

            {step === 5 ? (
              <StepShell
                title="What do you enjoy?"
                hint="Pick a few. It learns the rest by paying attention."
              >
                <ul className="flex flex-wrap gap-2">
                  {ADVENTURES.map((adventure) => {
                    const selected = state.interests.includes(adventure.slug);
                    return (
                      <li key={adventure.slug}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            update({
                              interests: selected
                                ? state.interests.filter((slug) => slug !== adventure.slug)
                                : [...state.interests, adventure.slug],
                            })
                          }
                          className={cn(
                            "tap-target gap-2 rounded-full border-2 px-5 py-3 text-[1.0625rem] font-semibold transition-refined",
                            selected
                              ? "border-transparent text-white"
                              : "border-border text-muted-foreground hover:border-interactive hover:text-interactive",
                          )}
                          style={selected ? { backgroundImage: adventure.gradient } : undefined}
                        >
                          <Icon name={adventure.icon} className="h-5 w-5" />
                          {t(adventure.nameKey)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </StepShell>
            ) : null}

            {step === 6 ? (
              <StepShell
                title="Who are the important people?"
                hint="First names are enough. Sidekick will ask about them, and can call them by name."
              >
                <PeopleEditor people={state.people} onChange={(people) => update({ people })} />
              </StepShell>
            ) : null}

            {step === 7 ? (
              <StepShell
                title="What can the family see?"
                hint="Off by default. Everything here can be changed later by saying so."
              >
                <ul className="flex flex-col gap-2.5">
                  {PERMISSIONS.filter((p) => p.familyDefault === "with-permission").map((row) => {
                    const on = state.permissions[row.what];
                    return (
                      <li key={row.what}>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          onClick={() =>
                            update({
                              permissions: { ...state.permissions, [row.what]: !on },
                            })
                          }
                          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-card/50 p-4 text-left transition-refined hover:border-interactive"
                        >
                          <span className="flex flex-col">
                            <span className="font-semibold text-foreground">{row.what}</span>
                            <span className="text-caption text-muted-foreground">{row.detail}</span>
                          </span>
                          <span
                            className={cn(
                              "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-refined",
                              on ? "bg-primary" : "bg-muted",
                            )}
                          >
                            <span
                              className={cn(
                                "absolute h-6 w-6 rounded-full bg-white shadow-subtle transition-refined",
                                on ? "left-[1.375rem]" : "left-0.5",
                              )}
                            />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-caption flex items-start gap-2 text-muted-foreground">
                  <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0" />
                  Private conversation is never shared, whatever is switched on here.
                </p>
              </StepShell>
            ) : null}

            {step === 8 ? (
              <StepShell
                title={`${displayName}'s Sidekick is ready.`}
                hint="Here's what it knows before the first conversation."
              >
                <div className="flex flex-col gap-4">
                  <SummaryRow icon="globe" label="Language">
                    {LANGUAGES.find((l) => l.code === state.language)?.nativeName}
                  </SummaryRow>
                  <SummaryRow icon="sparkles" label="Interests">
                    {state.interests
                      .map((slug) => {
                        const adventure = ADVENTURES.find((a) => a.slug === slug);
                        return adventure ? t(adventure.nameKey) : slug;
                      })
                      .join(", ") || "None yet — it'll find out"}
                  </SummaryRow>
                  <SummaryRow icon="users" label="People">
                    {state.people.length ? state.people.join(", ") : "You can add these later"}
                  </SummaryRow>
                  <SummaryRow icon="shield-check" label="Shared with family">
                    {Object.values(state.permissions).filter(Boolean).length} of{" "}
                    {Object.keys(state.permissions).length} optional permissions
                  </SummaryRow>

                  <div className="card-soft card-tint-warm mt-2 flex items-start gap-4 p-5">
                    <SidekickAvatar state="speaking" size={56} />
                    <p className="text-senior text-foreground">
                      “Right then, {displayName}. Shall we start with{" "}
                      {state.interests.includes("music") ? "some music" : "a story"}?”
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-3">
                    <PrimaryAction to="/adventures" icon="arrow-right">
                      Start the first adventure
                    </PrimaryAction>
                    <SecondaryAction to="/pricing">See plans</SecondaryAction>
                  </div>
                </div>
              </StepShell>
            ) : null}

            {/* Navigation */}
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="tap-target gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-refined hover:border-interactive disabled:opacity-40"
              >
                <Icon name="chevron-right" className="h-4.5 w-4.5 rotate-180" />
                {t("common.back")}
              </button>
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  disabled={!canContinue}
                  className="tap-target gradient-hero gradient-motion gap-2 rounded-full px-8 py-3.5 font-semibold text-white transition-refined disabled:opacity-40"
                >
                  {t("common.next")}
                  <Icon name="arrow-right" className="h-4.5 w-4.5" />
                </button>
              ) : (
                <span className="text-caption text-muted-foreground">
                  Nothing on this page is submitted anywhere.
                </span>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-subhead text-foreground">{title}</h2>
        <p className="text-body text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

function Choices({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; icon: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {options.map((option) => (
        <li key={option.value}>
          <button
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "tap-target w-full justify-start gap-3 rounded-2xl border-2 px-5 py-4 text-left text-[1.0625rem] font-semibold transition-refined",
              value === option.value
                ? "border-interactive bg-primary/10 text-primary"
                : "border-border text-foreground hover:border-interactive",
            )}
          >
            <Icon name={option.icon} className="h-5.5 w-5.5" />
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PeopleEditor({
  people,
  onChange,
}: {
  people: string[];
  onChange: (people: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const name = draft.trim();
    if (!name || people.includes(name)) return;
    onChange([...people, name]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder="Clare"
          aria-label="Add a person"
          className="tap-target min-w-48 flex-1 rounded-2xl border-2 border-border bg-background px-5 py-3.5 text-lg font-medium focus-visible:border-interactive"
        />
        <button
          type="button"
          onClick={add}
          className="tap-target gap-2 rounded-2xl border-2 border-border-strong px-6 py-3.5 font-semibold transition-refined hover:border-interactive hover:text-interactive"
        >
          <Icon name="check" className="h-5 w-5" />
          Add
        </button>
      </div>
      {people.length ? (
        <ul className="flex flex-wrap gap-2">
          {people.map((person) => (
            <li key={person}>
              <button
                type="button"
                onClick={() => onChange(people.filter((p) => p !== person))}
                className="chip"
                aria-label={`Remove ${person}`}
              >
                {person}
                <Icon name="x" className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-caption text-muted-foreground">
          Children, grandchildren, a neighbour, an old friend — anyone Sidekick should know about.
        </p>
      )}
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-caption font-semibold text-muted-foreground">{label}</span>
        <span className="text-[1.0625rem] text-foreground">{children}</span>
      </span>
    </div>
  );
}
