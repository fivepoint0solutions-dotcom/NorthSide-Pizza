import { createFileRoute } from "@tanstack/react-router";
import { LibraryView } from "@/components/copilot/LibraryView";

export const Route = createFileRoute("/recent-work")({
  head: () => ({ meta: [{ title: "Recent Work — Teacher's Pet" }] }),
  component: () => (
    <LibraryView title="Recent Work" subtitle="Everything you've saved, newest first." />
  ),
});
