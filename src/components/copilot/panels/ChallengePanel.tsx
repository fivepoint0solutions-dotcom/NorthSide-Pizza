import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { aiProvider } from "@/lib/ai";
import { createDraft } from "@/lib/draft";
import { AIThinking } from "../AIThinking";
import { CritiquePanel } from "../CritiquePanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShieldQuestion, Sparkles } from "lucide-react";
import type { PanelProps } from "../panelTypes";

export function ChallengePanel({ draft, patch }: PanelProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(draft.challengeText);

  async function challenge() {
    setLoading(true);
    patch({ challengeText: text });
    const critique = await aiProvider.challenge(text, draft.context);
    patch({ critique });
    setLoading(false);
  }

  function helpMeImprove() {
    const next = createDraft({
      mode: "build",
      type: "lesson",
      context: {
        ...draft.context,
        idea: text,
        objective: draft.critique?.alternatives[0] ?? draft.critique?.considerations[0],
      },
    });
    navigate({ to: "/workspace", search: { draft: next.id, mode: undefined } });
  }

  if (loading) return <AIThinking gradientClass="gradient-challenge" />;

  if (!draft.critique) {
    return (
      <div className="card-soft mx-auto max-w-xl space-y-6 p-8 animate-pop">
        <div>
          <h2 className="text-title mb-2">What would you like a second opinion on?</h2>
          <p className="text-body text-muted-foreground">
            Paste in a lesson idea, an activity, or just describe your plan. I'll look for gaps —
            you decide what to do with them.
          </p>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Describe your lesson or idea…"
          className="text-base"
        />
        <Button
          variant="challenge"
          size="lg"
          className="w-full"
          disabled={!text.trim()}
          onClick={() => void challenge()}
        >
          <ShieldQuestion /> Challenge This Idea
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CritiquePanel critique={draft.critique} />
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="lg" onClick={() => void challenge()}>
          Challenge it again
        </Button>
        <Button variant="build" size="lg" onClick={helpMeImprove}>
          <Sparkles /> Help me improve this
        </Button>
      </div>
    </div>
  );
}

export default ChallengePanel;
