import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { CreationContext, CreationType } from "@/lib/ai";
import { creationTypeConfig } from "@/lib/creationTypes";
import { createDraft } from "@/lib/draft";
import { TypePicker } from "@/components/copilot/TypePicker";
import { ContextWizard } from "@/components/copilot/ContextWizard";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [{ title: "Create Something — Teacher's Pet" }] }),
  component: CreatePage,
});

function CreatePage() {
  const navigate = useNavigate();
  const [type, setType] = useState<CreationType | null>(null);

  function complete(context: CreationContext) {
    if (!type) return;
    const config = creationTypeConfig(type);
    const draft = createDraft({ mode: config.defaultMode, type, context });
    navigate({ to: "/workspace", search: { draft: draft.id, mode: undefined } });
  }

  return (
    <main className="container-app py-8 lg:py-10">
      <Reveal>
        <div className="mb-8 text-center">
          <h1 className="text-headline">What are we creating?</h1>
          <p className="text-body mt-2 text-muted-foreground">
            Pick a starting point — you can always change direction.
          </p>
        </div>
      </Reveal>

      {!type ? (
        <Reveal delay={80}>
          <TypePicker onSelect={setType} className="mx-auto max-w-3xl" />
        </Reveal>
      ) : (
        <ContextWizard typeConfig={creationTypeConfig(type)} onComplete={complete} />
      )}
    </main>
  );
}
