import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { PrimaryAction, SecondaryAction, Eyebrow } from "@/components/site/Primitives";
import { ConversationDemo } from "@/components/product/ConversationDemo";
import { Icon } from "@/components/site/Icon";

/**
 * The homepage hero.
 *
 * The headline is the product speaking, not the company: a visitor should
 * hear Sidekick's voice before they read a word of marketing. The interactive
 * demonstration sits inside the hero rather than below it, so "show, don't
 * tell" happens above the fold.
 */
export function Hero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Parallax speed={0.12} className="pointer-events-none absolute inset-0 -z-10">
        <div
          aria-hidden="true"
          data-decorative="true"
          className="gradient-motion parallax-layer absolute -top-40 -right-32 h-[38rem] w-[38rem] rounded-full opacity-[0.18] blur-3xl"
          style={{ backgroundImage: "var(--grad-hero)" }}
        />
        <div
          aria-hidden="true"
          data-decorative="true"
          className="gradient-motion parallax-layer absolute -bottom-52 -left-40 h-[34rem] w-[34rem] rounded-full opacity-[0.14] blur-3xl"
          style={{ backgroundImage: "var(--grad-sunrise)" }}
        />
      </Parallax>
      {/* The feather watermark itself now comes from <FeatherField />, mounted
          once at the root layout so every page carries it — this section only
          adds its own colour washes. */}

      <div className="container-app grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-display text-foreground">
              {t("hero.headline")}
              <br />
              <span className="text-gradient gradient-motion italic">
                {t("hero.headlineAccent")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-lede measure text-muted-foreground">{t("hero.lede")}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <PrimaryAction to="/get-started" icon="arrow-right">
                {t("hero.ctaPrimary")}
              </PrimaryAction>
              <SecondaryAction to="/how-it-works" icon="play">
                {t("hero.ctaSecondary")}
              </SecondaryAction>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-caption flex flex-wrap items-center gap-2 text-muted-foreground">
              <Icon name="shield-check" className="h-4 w-4 text-primary" />
              {t("hero.trust")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} variant="fade">
          <ConversationDemo />
        </Reveal>
      </div>
    </section>
  );
}
