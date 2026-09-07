import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { PRIMARY_NAV } from "@/lib/site/navigation";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SidekickLogo } from "@/components/brand/SidekickLogo";
import { FeatherMark } from "@/components/brand/FeatherMark";
import { LanguagePicker } from "./LanguagePicker";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { Icon } from "./Icon";

/**
 * Global header. Transparent over the hero, glass once scrolled, and a full
 * panel on small screens — with the language and accessibility controls kept
 * visible at every breakpoint rather than folded away into the menu.
 */
export function SiteHeader() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="skip-link text-base font-semibold">
        {t("nav.skipToContent")}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-refined",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-wide flex h-20 items-center justify-between gap-4">
          <FeatherMark className="hidden h-14 w-11 opacity-90 lg:block" />
          <Link to="/" className="shrink-0" aria-label="Senior Sidekick — home">
            <SidekickLogo variant="wordmark" />
          </Link>

          {/* nav-desktop / nav-toggle are swapped by CSS at the largest text
              size, where six labels no longer fit on one line. */}
          <nav aria-label="Primary" className="nav-desktop hidden items-center gap-1 xl:flex">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold whitespace-nowrap transition-refined",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.labelKey ? t(item.labelKey) : item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <AccessibilityMenu className="hidden sm:inline-flex" />
            <LanguagePicker className="hidden sm:inline-flex" />
            <Link
              to="/get-started"
              className="tap-target gradient-action gradient-motion hidden rounded-full px-6 py-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white shadow-raised transition-refined hover:-translate-y-0.5 lg:inline-flex"
            >
              {t("nav.getStarted")}
            </Link>
            <FeatherMark flip className="hidden h-14 w-11 opacity-90 lg:block" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="nav-toggle tap-target rounded-full border border-border px-3 py-2 text-foreground transition-refined hover:border-interactive xl:hidden"
            >
              <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
              <span className="sr-only">{open ? t("nav.close") : t("nav.menu")}</span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-20 z-40 overflow-y-auto bg-background/97 backdrop-blur-xl xl:hidden"
        >
          <nav aria-label="Mobile" className="container-app flex flex-col gap-2 py-8">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="tap-target justify-between rounded-2xl border border-border px-5 py-4 text-lg font-semibold text-foreground transition-refined hover:border-interactive hover:text-interactive"
              >
                {item.labelKey ? t(item.labelKey) : item.label}
                <Icon name="chevron-right" className="h-5 w-5 opacity-50" />
              </Link>
            ))}
            <Link
              to="/get-started"
              className="tap-target gradient-action gradient-motion mt-3 rounded-2xl px-5 py-4 text-lg font-semibold text-white"
            >
              {t("nav.getStarted")}
            </Link>
            <div className="mt-4 flex items-center gap-2 sm:hidden">
              <LanguagePicker variant="full" />
              <AccessibilityMenu />
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
