import { createFileRoute } from "@tanstack/react-router";
import { LibraryView } from "@/components/copilot/LibraryView";

export const Route = createFileRoute("/materials")({
  head: () => ({ meta: [{ title: "Classroom Materials — Teacher's Pet" }] }),
  component: () => (
    <LibraryView
      category="material"
      title="Classroom Materials"
      subtitle="Worksheets, quizzes, rubrics and parent messages, ready to use."
    />
  ),
});
