import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FolderOpen, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeCard } from "@/components/copilot/ModeCard";
import { LibraryCard } from "@/components/copilot/LibraryCard";
import { Reveal } from "@/components/motion/Reveal";
import { MODES } from "@/lib/modes";
import { deleteLibraryItem, useLibrary, useRecentWork } from "@/lib/library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teacher's Pet" },
      {
        name: "description",
        content:
          "An AI teaching assistant that amplifies your creativity, expertise and confidence — you're still the teacher, AI just helps you do more with your ideas.",
      },
      { property: "og:title", content: "Teacher's Pet" },
      {
        property: "og:description",
        content: "You're still the teacher. AI just helps you do more with your ideas.",
      },
    ],
  }),
  component: Dashboard,
});

const SHORTCUTS = [
  { label: "My Lessons", to: "/lessons" as const, icon: BookOpen, category: "lesson" as const },
  { label: "My Ideas", to: "/ideas" as const, icon: Lightbulb, category: "idea" as const },
  {
    label: "Classroom Materials",
    to: "/materials" as const,
    icon: FolderOpen,
    category: "material" as const,
  },
];

function ShortcutRow() {
  const lessons = useLibrary("lesson");
  const ideas = useLibrary("idea");
  const materials = useLibrary("material");
  const counts = { lesson: lessons.length, idea: ideas.length, material: materials.length };

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {SHORTCUTS.map((s) => (
        <Link
          key={s.to}
          to={s.to}
          className="card-soft group flex items-center justify-between gap-4 p-5 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-interactive">
              <s.icon className="size-5" />
            </span>
            <div>
              <p className="font-semibold">{s.label}</p>
              <p className="text-caption text-muted-foreground">{counts[s.category]} saved</p>
            </div>
          </div>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}

function RecentWork() {
  const recent = useRecentWork(6);
  if (recent.length === 0) return null;

  return (
    <section className="section-y">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-headline">Recent work</h2>
        <Link to="/recent-work" className="text-sm font-semibold text-interactive hover:underline">
          See all
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((item) => (
          <LibraryCard key={item.id} item={item} onDelete={deleteLibraryItem} />
        ))}
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <main>
      <section className="container-app pb-4 pt-16 text-center lg:pt-24">
        <Reveal>
          <p className="text-eyebrow text-interactive">Teacher's Pet</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-display measure mx-auto mt-5">
            You're still the teacher.
            <br />
            AI just helps you do more with your ideas.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-lede measure mx-auto mt-6 text-muted-foreground">
            Bring your expertise. Choose a mode below, and let's turn your idea into something even
            better — together.
          </p>
        </Reveal>
        <Reveal delay={240} className="mt-9 flex justify-center">
          <Button asChild variant="hero" size="xl">
            <Link to="/create">
              <Sparkles /> Create Something
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="container-app section-y">
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {MODES.map((mode) => (
              <ModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-app">
        <Reveal>
          <ShortcutRow />
        </Reveal>
      </section>

      <div className="container-app">
        <RecentWork />
      </div>
    </main>
  );
}
