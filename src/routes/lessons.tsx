import { createFileRoute } from "@tanstack/react-router";
import { LibraryView } from "@/components/copilot/LibraryView";

export const Route = createFileRoute("/lessons")({
  head: () => ({ meta: [{ title: "My Lessons — Teacher's Pet" }] }),
  component: () => (
    <LibraryView
      category="lesson"
      title="My Lessons"
      subtitle="Lessons and activities you've built and saved."
    />
  ),
});
