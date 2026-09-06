import { useAccessibility } from "@/lib/accessibility";
import { useT } from "@/lib/i18n";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * Display and motion controls, available from every page.
 *
 * These are not a settings page buried three levels down: for a large part
 * of this audience, the first thing they need is bigger text, and asking
 * them to find it in a submenu is the same as not offering it.
 */
export function AccessibilityMenu({ className }: { className?: string }) {
  const t = useT();
  const { textScale, contrast, motion, setTextScale, setContrast, setMotion, reset } =
    useAccessibility();

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "tap-target rounded-full border border-border px-3 py-2 text-foreground transition-refined hover:border-interactive hover:text-interactive",
          className,
        )}
        aria-label={t("a11y.open")}
      >
        <Icon name="accessibility" className="h-5 w-5" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 rounded-2xl p-4">
        <p className="text-title mb-4 text-foreground">{t("a11y.title")}</p>

        <ChoiceRow
          label={t("a11y.textSize")}
          options={[
            { value: "normal", label: t("a11y.textNormal") },
            { value: "large", label: t("a11y.textLarge") },
            { value: "xlarge", label: t("a11y.textXLarge") },
          ]}
          value={textScale}
          onChange={(v) => setTextScale(v as typeof textScale)}
        />
        <ChoiceRow
          label={t("a11y.contrast")}
          options={[
            { value: "normal", label: t("a11y.contrastNormal") },
            { value: "high", label: t("a11y.contrastHigh") },
          ]}
          value={contrast}
          onChange={(v) => setContrast(v as typeof contrast)}
        />
        <ChoiceRow
          label={t("a11y.motion")}
          options={[
            { value: "full", label: t("a11y.motionFull") },
            { value: "reduced", label: t("a11y.motionReduced") },
          ]}
          value={motion}
          onChange={(v) => setMotion(v as typeof motion)}
        />

        <button type="button" onClick={reset} className="link-underline mt-1 text-sm font-semibold">
          Reset to defaults
        </button>
      </PopoverContent>
    </Popover>
  );
}

function ChoiceRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="mb-4">
      <legend className="text-caption mb-2 font-semibold text-muted-foreground">{label}</legend>
      <div className="flex gap-2" role="group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-11 flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-refined",
              value === option.value
                ? "border-interactive bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:border-interactive hover:text-interactive",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
