import { useCallback, useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";
import { listenOnce, isSpeechSupported } from "@/lib/nav/stt";
import { matchContact, NO_MATCH_MESSAGE } from "@/lib/nav/match";
import { navigateTo } from "@/lib/nav/navigate";
import type { Contact, NavResult } from "@/lib/nav/types";

interface VoiceNavButtonProps {
  contacts: Contact[];
  onNavigate: (result: Extract<NavResult, { ok: true }>) => void;
}

type Phase = "idle" | "listening" | "thinking" | "error";

/**
 * Press → speak → fuzzy-match locally → open the Big Map.
 * Vapi later replaces only the match step; `navigateTo` stays the same call.
 */
export function VoiceNavButton({ contacts, onNavigate }: VoiceNavButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [heard, setHeard] = useState("");
  const [message, setMessage] = useState("");
  const stopRef = useRef<(() => void) | null>(null);
  const supported = isSpeechSupported();

  useEffect(() => () => stopRef.current?.(), []);

  const handleTranscript = useCallback(
    async (transcript: string) => {
      setPhase("thinking");
      const outcome = matchContact(transcript, contacts);

      if (outcome.status === "none" || !outcome.best) {
        setPhase("error");
        setMessage(NO_MATCH_MESSAGE);
        return;
      }
      if (outcome.status === "ambiguous" && outcome.runnerUp) {
        setPhase("error");
        setMessage(
          `Did you mean ${outcome.best.matchedOn} or ${outcome.runnerUp.matchedOn}? Say the full name.`,
        );
        return;
      }

      const result = await navigateTo(outcome.best.contact.id, outcome.best.contact);
      if (result.ok) {
        setPhase("idle");
        setMessage("");
        onNavigate(result);
      } else {
        setPhase("error");
        setMessage(result.message);
      }
    },
    [contacts, onNavigate],
  );

  const start = useCallback(() => {
    setHeard("");
    setMessage("");
    setPhase("listening");
    stopRef.current = listenOnce({
      onPartial: setHeard,
      onFinal: (text) => {
        if (!text) {
          setPhase("error");
          setMessage(NO_MATCH_MESSAGE);
          return;
        }
        setHeard(text);
        void handleTranscript(text);
      },
      onError: () => {
        setPhase("error");
        setMessage(NO_MATCH_MESSAGE);
      },
    });
  }, [handleTranscript]);

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        type="button"
        onClick={start}
        disabled={!supported || phase === "listening" || phase === "thinking"}
        className={`flex h-56 w-56 flex-col items-center justify-center gap-3 rounded-full text-2xl font-extrabold shadow-2xl transition-transform active:scale-95 disabled:opacity-70 ${
          phase === "listening" ? "animate-pulse bg-[#2f9bff]" : "bg-[#10233b]"
        } text-white`}
      >
        <Mic className="h-16 w-16" aria-hidden />
        {phase === "listening" ? "Listening…" : phase === "thinking" ? "One second…" : "Say a name"}
      </button>

      {heard ? <p className="text-2xl text-muted-foreground">“{heard}”</p> : null}

      {message ? (
        <p className="max-w-md text-center text-3xl font-bold text-foreground">{message}</p>
      ) : null}

      {!supported ? (
        <p className="max-w-md text-center text-xl text-muted-foreground">
          This browser can't listen. Tap a name from the list instead.
        </p>
      ) : null}
    </div>
  );
}
