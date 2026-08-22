import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { deleteLibraryItem, useLibrary, type LibraryCategory } from "@/lib/library";
import { LibraryCard } from "./LibraryCard";
import { Button } from "@/components/ui/button";

type LibraryViewProps = {
  category?: LibraryCategory;
  title: string;
  subtitle: string;
};

export function LibraryView({ category, title, subtitle }: LibraryViewProps) {
  const items = useLibrary(category);

  return (
    <div className="container-app py-8 lg:py-10">
      <div className="mb-8">
        <h1 className="text-headline">{title}</h1>
        <p className="text-body mt-2 text-muted-foreground">{subtitle}</p>
      </div>

      {items.length === 0 ? (
        <div className="card-soft flex flex-col items-center gap-4 p-10 text-center">
          <span className="gradient-hero gradient-motion grid size-14 place-items-center rounded-2xl text-white">
            <Sparkles className="size-6" />
          </span>
          <p className="text-title">Nothing here yet</p>
          <p className="text-body max-w-sm text-muted-foreground">
            Once you save something from a Teacher's Pet session, it'll show up here.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/create">Create Something</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} onDelete={deleteLibraryItem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryView;
