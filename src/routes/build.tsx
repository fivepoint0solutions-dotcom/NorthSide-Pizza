import { createFileRoute } from "@tanstack/react-router";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";

export const Route = createFileRoute("/build")({
  head: () => ({ meta: [{ title: "Build With Me — Teacher's Pet" }] }),
  component: () => <CopilotWorkspace mode="build" />,
});
