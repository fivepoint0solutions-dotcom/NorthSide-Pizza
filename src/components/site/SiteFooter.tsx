import { Link } from "@tanstack/react-router";
import { FOOTER_COLUMNS } from "@/lib/site/navigation";
import { BRAND } from "@/lib/brand";
import { useT } from "@/lib/i18n";
import { SidekickLogo } from "@/components/brand/SidekickLogo";
import { LanguagePicker } from "./LanguagePicker";
import { Icon } from "./Icon";

export function SiteFooter() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-border bg-surface/70">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
          <div className="flex flex-col gap-5">
            <SidekickLogo />
            <p className="text-body max-w-sm text-muted-foreground">{t("brand.tagline")}</p>
            <div className="flex flex-wrap items-center gap-3">
              <LanguagePicker variant="full" />
              <a
                href={`mailto:${BRAND.contact.general}`}
                className="tap-target rounded-full border border-border px-4 py-2 text-sm font-semibold transition-refined hover:border-interactive hover:text-interactive"
              >
                {BRAND.contact.general}
              </a>
            </div>
            <p className="text-caption text-muted-foreground">{t("footer.madeFor")}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.headingKey} aria-label={t(column.headingKey)}>
                <h2 className="text-eyebrow mb-4 text-foreground">{t(column.headingKey)}</h2>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="text-[0.9375rem] text-muted-foreground transition-refined hover:text-interactive"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            © {year} {BRAND.legalName}. {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {[
              { label: "Privacy", to: "/privacy" },
              { label: "Safety", to: "/safety" },
              { label: "Accessibility", to: "/accessibility" },
              { label: "Terms", to: "/terms" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-caption text-muted-foreground transition-refined hover:text-interactive"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 text-muted-foreground">
              <Icon name="shield-check" className="h-4 w-4" />
              <span className="text-caption">WCAG 2.2 AA</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
