import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Device chrome for product mockups. The screens inside are real markup,
 * not screenshots — they scale, respect the visitor's text size and
 * contrast settings, and stay readable when the page is zoomed.
 */
export function DeviceFrame({
  kind = "tablet",
  children,
  className,
  label,
}: {
  kind?: "phone" | "tablet" | "desktop";
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  if (kind === "desktop") {
    return (
      <figure className={cn("device-desktop", className)}>
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-highlight/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
          {label ? (
            <span className="text-caption ml-3 truncate text-muted-foreground">{label}</span>
          ) : null}
        </div>
        <div className="device-screen max-h-[42rem] bg-background">{children}</div>
      </figure>
    );
  }

  return (
    <figure className={cn(kind === "phone" ? "device-phone" : "device-tablet", className)}>
      <div className="relative bg-background">
        <span
          aria-hidden="true"
          className="absolute top-2 left-1/2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/15"
        />
        {/* A real device has a fixed screen: the content scrolls inside it
            rather than stretching the frame to the height of the markup. */}
        <div
          className={cn("device-screen", kind === "phone" ? "h-[38rem]" : "h-[34rem] sm:h-[38rem]")}
        >
          {children}
        </div>
      </div>
    </figure>
  );
}
