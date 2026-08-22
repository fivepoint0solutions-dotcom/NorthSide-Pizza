import { createFileRoute } from "@tanstack/react-router";
import { LibraryView } from "@/components/copilot/LibraryView";

export const Route = createFileRoute("/ideas")({
  head: () => ({ meta: [{ title: "My Ideas — Teacher's Pet" }] }),
  component: () => (
    <LibraryView
      category="idea"
      title="My Ideas"
      subtitle="Brainstorms and sparks worth coming back to."
    />
  ),
});
