import { createFileRoute } from "@tanstack/react-router";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";

export const Route = createFileRoute("/inspire")({
  head: () => ({ meta: [{ title: "Inspire Me — Teacher's Pet" }] }),
  component: () => <CopilotWorkspace mode="inspire" />,
});
