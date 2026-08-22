import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { CreationContext, IdeaOption } from "@/lib/ai";
import { aiProvider } from "@/lib/ai";
import { createDraft } from "@/lib/draft";
import { AIThinking } from "../AIThinking";
import { IdeaCard } from "../IdeaCard";
import { QuickActionBar } from "../QuickActionBar";
import { QuickCapture } from "../QuickCapture";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import type { PanelProps } from "../panelTypes";

export function InspirePanel({ draft, patch }: PanelProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function generate(contextOverride?: CreationContext) {
    setLoading(true);
    const context = contextOverride ?? draft.context;
    const ideas = await aiProvider.inspire(context);
    patch({ ideas, context });
    setLoading(false);
  }

  function useIdea(idea: IdeaOption) {
    const next = createDraft({
      mode: "build",
      type: draft.type === "brainstorm" ? "lesson" : draft.type,
      context: { ...draft.context, idea: `${idea.title} — ${idea.description}` },
    });
    navigate({ to: "/workspace", search: { draft: next.id, mode: undefined } });
  }

  if (!draft.context.topic && draft.ideas.length === 0) {
    return (
      <QuickCapture
        title="What's on your mind?"
        subtitle="Just a topic is enough — I'll bring a few different angles."
        fields={[
          {
            key: "topic",
            label: "Topic or idea",
            kind: "text",
            placeholder: "e.g. the water cycle, persuasive writing…",
            required: true,
          },
          { key: "subject", label: "Subject (optional)", kind: "text" },
        ]}
        cta="Get Ideas"
        ctaVariant="inspire"
        onSubmit={(context) => void generate(context)}
      />
    );
  }

  if (loading) return <AIThinking gradientClass="gradient-inspire" />;

  if (draft.ideas.length === 0) {
    return (
      <div className="flex justify-center">
        <Button variant="inspire" size="lg" onClick={() => void generate()}>
          Get Ideas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {draft.ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} onUse={useIdea} />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <QuickActionBar
          actions={["three-approaches", "different-approach"]}
          onAction={() => void generate()}
          disabled={loading}
        />
        <Button variant="ghost" size="sm" onClick={() => void generate()} disabled={loading}>
          <RefreshCw className="size-4" /> More ideas
        </Button>
      </div>
      <p className="text-caption text-muted-foreground">
        These are starting points, not finished lessons — pick one and make it yours.
      </p>
    </div>
  );
}

export default InspirePanel;
