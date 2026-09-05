import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { DinerTreatsBoard } from "@/components/DinerTreatsBoard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dairy King Frozen Fountain" },
      {
        name: "description",
        content:
          "Hand-spun milkshakes, 20+ hard ice cream flavors and custom flurries at Dairy King Frozen Fountain — 5204 51 Ave.",
      },
      { property: "og:title", content: "Dairy King Frozen Fountain" },
      {
        property: "og:description",
        content: "Ice cream, hand-spun shakes and custom flurries — available in-store only.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-diner-dark text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-diner-mustard">
            Dairy King Frozen Fountain
          </p>
          <h1 className="font-display text-3xl font-black tracking-tight sm:text-5xl">
            Dairy King &amp; Buddies Pizza
          </h1>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              5204 51 Ave
            </span>
            <a href="tel:7805942833" className="flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              (780) 594-2833
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0" aria-hidden="true" />
              Open Daily
            </span>
          </div>
        </div>
      </header>

      <main>
        <DinerTreatsBoard />
      </main>

      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dairy King &amp; Buddies Pizza. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
