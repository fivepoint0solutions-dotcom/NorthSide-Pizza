import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import lockupAsset from "@/assets/west-coast-realty-lockup.png.asset.json";

/**
 * Global navigation architecture.
 * Transparent over hero imagery, transitioning to a frosted Bone bar on scroll.
 * Routes are referenced as plain hrefs so the header can be mounted before
 * the individual pages exist.
 */

type NavItem = { label: string; href: string; ai?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Properties", href: "/properties" },
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Our Realtors", href: "/realtors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "AI Assistant", href: "/ai-assistant", ai: true },
];

function BrandMark({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="West Coast Realty — home"
      className="group inline-flex items-center leading-none transition-transform duration-300 ease-[var(--ease-editorial)] hover:scale-[1.03]"
    >
      <span className="inline-flex items-center justify-center rounded-xs bg-background/95 px-3 py-2 shadow-subtle ring-1 ring-border">
        <img
          src={lockupAsset.url}
          alt="West Coast Realty — Victoria, British Columbia"
          className={cn("w-auto object-contain", compact ? "h-10" : "h-12 md:h-16")}
        />
      </span>
    </Link>
  );
}


function ExploreCta({ full = false, onClick }: { full?: boolean; onClick?: () => void }) {
  return (
    <a
      href="/properties"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 bg-interactive px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-interactive-foreground shadow-subtle transition-all duration-300 ease-[var(--ease-editorial)] hover:shadow-raised hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        full ? "w-full rounded-xs py-4" : "rounded-xs",
      )}
    >
      Explore Properties
      <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1" />
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scrolling while the mobile overlay is open.
  useEffect(() => {
    if (!open) return;
    scrollY.current = window.scrollY;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const overHero = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-editorial)]",
        scrolled || open
          ? "border-b border-border bg-background/95 text-foreground shadow-subtle backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-primary/70 via-primary/35 to-transparent text-primary-foreground backdrop-blur-[2px]",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-editorial flex items-center justify-between gap-6 py-4 md:py-5"
      >
        <div className="hidden md:block">
          <BrandMark />
        </div>
        <div className="md:hidden">
          <BrandMark compact onClick={() => setOpen(false)} />
        </div>

        {/* Desktop items */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "group relative inline-flex items-center gap-2 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                  overHero
                    ? "text-primary-foreground [text-shadow:0_1px_2px_color-mix(in_oklab,var(--brand-green)_60%,transparent)] hover:text-highlight"
                    : "text-foreground/85 hover:text-foreground",
                )}
              >

                {item.ai && (
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-interactive opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-interactive" />
                  </span>
                )}
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-interactive transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ExploreCta />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex size-12 items-center justify-center rounded-xs transition-colors duration-300 hover:text-interactive lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile / touch overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col bg-background transition-all duration-500 ease-[var(--ease-editorial)] lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex-1 overflow-y-auto px-[var(--spacing-gutter)] pb-8 pt-28">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-border/70">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 py-5 font-display text-3xl text-foreground transition-colors duration-300 hover:text-interactive"
                >
                  <span className="inline-flex items-center gap-3">
                    {item.ai && (
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-interactive opacity-70" />
                        <span className="relative inline-flex size-2 rounded-full bg-interactive" />
                      </span>
                    )}
                    {item.label}
                  </span>
                  <ArrowRight className="size-5 text-interactive" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border px-[var(--spacing-gutter)] py-6">
          <ExploreCta full onClick={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
