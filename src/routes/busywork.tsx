import { createFileRoute } from "@tanstack/react-router";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";

export const Route = createFileRoute("/busywork")({
  head: () => ({ meta: [{ title: "Do The Busywork — Teacher's Pet" }] }),
  component: () => <CopilotWorkspace mode="busywork" />,
});
