import { useCallback, useEffect, useRef, useState } from "react";
import { languageOption, useLanguage, useT, type TranslationKey } from "@/lib/i18n";
import { usePrefersCalm } from "@/lib/accessibility";
import { pickVoice } from "@/lib/speech";
import { cn } from "@/lib/utils";
import { SidekickAvatar, type AvatarState } from "./SidekickAvatar";
import { Icon } from "@/components/site/Icon";

interface Exchange {
  id: string;
  questionKey: TranslationKey;
  answerKey: TranslationKey;
}

const EXCHANGES: Exchange[] = [
  { id: "q1", questionKey: "demo.q1", answerKey: "demo.a1" },
  { id: "q2", questionKey: "demo.q2", answerKey: "demo.a2" },
  { id: "q3", questionKey: "demo.q3", answerKey: "demo.a3" },
  { id: "q4", questionKey: "demo.q4", answerKey: "demo.a4" },
];

type Phase = "waiting" | "listening" | "thinking" | "speaking" | "done";

/**
 * The interactive hero demonstration.
 *
 * Rather than describing what a conversation feels like, the visitor has
 * one. Answers stream in at a readable pace, the companion changes state as
 * it listens and replies, and "read aloud" uses the browser's own speech
 * synthesis in the visitor's chosen language where it's available — real
 * voice output, not a mocked waveform.
 *
 * Accessibility: the transcript is a live region, every control is a real
 * button, and the streaming animation collapses to instant text whenever
 * the visitor (or their OS) has asked for calmer motion.
 */
export function ConversationDemo({ className }: { className?: string }) {
  const t = useT();
  const { language } = useLanguage();
  const calm = usePrefersCalm();

  const [active, setActive] = useState<Exchange | null>(null);
  const [phase, setPhase] = useState<Phase>("waiting");
  const [typed, setTyped] = useState("");
  const [spoken, setSpoken] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // A language change mid-demo would leave a half-typed answer in the wrong
  // language, so reset to the invitation state.
  useEffect(() => {
    clearTimers();
    setActive(null);
    setPhase("waiting");
    setTyped("");
  }, [language, clearTimers]);

  const ask = useCallback(
    (exchange: Exchange) => {
      clearTimers();
      setActive(exchange);
      setTyped("");
      setPhase("listening");
      const answer = t(exchange.answerKey);

      const startThinking = window.setTimeout(() => setPhase("thinking"), calm ? 200 : 700);
      const startSpeaking = window.setTimeout(
        () => {
          setPhase("speaking");
          if (calm) {
            setTyped(answer);
            setPhase("done");
            return;
          }
          // Stream by word: character-by-character reads as a gimmick, and
          // word-by-word is closer to the pace of someone talking.
          const words = answer.split(" ");
          words.forEach((_, index) => {
            const id = window.setTimeout(() => {
              setTyped(words.slice(0, index + 1).join(" "));
              if (index === words.length - 1) setPhase("done");
            }, index * 55);
            timers.current.push(id);
          });
        },
        calm ? 400 : 1500,
      );

      timers.current.push(startThinking, startSpeaking);
    },
    [calm, clearTimers, t],
  );

  const readAloud = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !active) return;
    const locale = languageOption(language).locale;
    const utterance = new SpeechSynthesisUtterance(t(active.answerKey));
    utterance.lang = locale;
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    // The browser's default pick for a language is often its worst-sounding
    // voice, even when a much better one is installed — ask for the best
    // available one explicitly rather than leaving it to chance.
    const voice = pickVoice(locale);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpoken(true);
  }, [active, language, t]);

  const reset = useCallback(() => {
    clearTimers();
    if (typeof window !== "undefined" && "speechSynthesis" in window)
      window.speechSynthesis.cancel();
    setActive(null);
    setPhase("waiting");
    setTyped("");
  }, [clearTimers]);

  const avatarState: AvatarState =
    phase === "listening"
      ? "listening"
      : phase === "thinking"
        ? "thinking"
        : phase === "speaking"
          ? "speaking"
          : "idle";

  return (
    <div
      className={cn("card-elevated card-tint-cool relative overflow-hidden p-6 lg:p-8", className)}
    >
      <div className="flex items-start gap-4">
        <SidekickAvatar state={avatarState} size={72} />
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow text-primary">{t("demo.eyebrow")}</p>
          <p className="text-subhead mt-1 text-foreground">{t("demo.title")}</p>
        </div>
      </div>

      <div
        className="mt-6 min-h-52 rounded-3xl border border-border bg-background/70 p-5 lg:min-h-56"
        aria-live="polite"
        aria-atomic="false"
      >
        {active ? (
          <div className="flex flex-col gap-4">
            <p className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-5 py-3 text-right text-[1.0625rem] font-medium text-primary-foreground">
              {t(active.questionKey)}
            </p>
            <div className="flex items-start gap-3">
              <SidekickAvatar state={avatarState} size={36} className="mt-1" />
              <p className="text-senior max-w-[92%] text-foreground">
                {phase === "listening" ? (
                  <span className="text-muted-foreground">{t("demo.listening")}</span>
                ) : phase === "thinking" ? (
                  <span className="text-muted-foreground">{t("demo.thinking")}</span>
                ) : (
                  <>
                    {typed}
                    {phase === "speaking" ? (
                      <span className="ml-0.5 inline-block h-5 w-[3px] animate-pulse rounded-full bg-primary align-middle" />
                    ) : null}
                  </>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
            <Icon name="mic" className="h-8 w-8 text-primary" />
            <p className="text-body text-muted-foreground">{t("demo.hint")}</p>
          </div>
        )}
      </div>

      {phase === "done" || phase === "speaking" ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={readAloud}
            className="tap-target gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold transition-refined hover:border-interactive hover:text-interactive"
          >
            <Icon name="volume-2" className="h-4.5 w-4.5" />
            {spoken ? "Read it again" : "Read aloud"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="tap-target gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold transition-refined hover:border-interactive hover:text-interactive"
          >
            <Icon name="arrow-right" className="h-4.5 w-4.5" />
            {t("demo.replay")}
          </button>
        </div>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {EXCHANGES.map((exchange) => (
            <li key={exchange.id}>
              <button type="button" onClick={() => ask(exchange)} className="chip text-left">
                {t(exchange.questionKey)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
