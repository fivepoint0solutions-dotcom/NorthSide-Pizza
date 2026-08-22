import { createFileRoute } from "@tanstack/react-router";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";

export const Route = createFileRoute("/challenge")({
  head: () => ({ meta: [{ title: "Challenge Me — Teacher's Pet" }] }),
  component: () => <CopilotWorkspace mode="challenge" />,
});
