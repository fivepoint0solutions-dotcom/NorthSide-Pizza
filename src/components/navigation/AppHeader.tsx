import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/" as const },
  { label: "My Lessons", to: "/lessons" as const },
  { label: "My Ideas", to: "/ideas" as const },
  { label: "Materials", to: "/materials" as const },
];

export function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="container-app flex items-center justify-between gap-4 py-4"
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="gradient-hero gradient-motion grid size-9 place-items-center rounded-xl text-white shadow-subtle transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="size-4.5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Teacher's Pet</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/75 transition-refined hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="default">
            <Link to="/create">Create Something</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-1 grid size-11 place-items-center rounded-full text-foreground hover:bg-secondary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-[var(--ease-editorial)] md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="container-app flex flex-col gap-1 pb-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-foreground/85 hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              variant="hero"
              size="lg"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              <Link to="/create">Create Something</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
