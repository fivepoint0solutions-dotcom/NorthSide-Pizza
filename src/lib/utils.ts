import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge can't know about the project's own `@utility` classes, so
 * it treats `text-headline` as a text *colour* and drops it when a real
 * colour like `text-foreground` follows. Registering the typography scale as
 * font-size utilities keeps size and colour in separate conflict groups —
 * `cn("text-headline", "text-foreground")` then keeps both, which is what
 * every heading in the site relies on.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "headline",
            "subhead",
            "title",
            "eyebrow",
            "lede",
            "body",
            "caption",
            "senior",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
