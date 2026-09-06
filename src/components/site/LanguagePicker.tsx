import { LANGUAGES, languageOption, useLanguage, useT } from "@/lib/i18n";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * Global language selector. Present in the header and the footer, because
 * someone who lands mid-site in the wrong language shouldn't have to scroll
 * to fix it.
 */
export function LanguagePicker({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const current = languageOption(language);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "tap-target gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-refined hover:border-interactive hover:text-interactive",
          className,
        )}
        aria-label={t("lang.choose")}
      >
        <Icon name="globe" className="h-4.5 w-4.5" />
        <span>{variant === "full" ? current.nativeName : current.code.toUpperCase()}</span>
        <Icon name="chevron-down" className="h-4 w-4 opacity-60" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 rounded-2xl p-2">
        <p className="text-eyebrow px-3 pt-2 pb-3 text-muted-foreground">{t("lang.choose")}</p>
        <ul className="flex flex-col">
          {LANGUAGES.map((option) => {
            const active = option.code === language;
            return (
              <li key={option.code}>
                <button
                  type="button"
                  onClick={() => setLanguage(option.code)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition-refined",
                    active ? "bg-primary/12 text-primary" : "hover:bg-secondary",
                  )}
                >
                  <span className="flex flex-col">
                    <span className="text-base font-semibold">{option.nativeName}</span>
                    <span className="text-caption text-muted-foreground">
                      {option.englishName} · {option.voice}
                    </span>
                  </span>
                  {active ? <Icon name="check" className="h-5 w-5" strokeWidth={2.5} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-caption border-t border-border px-3 pt-3 pb-1 text-muted-foreground">
          Voice, activities, stories and dates change with the language — not just the menus.
        </p>
      </PopoverContent>
    </Popover>
  );
}
