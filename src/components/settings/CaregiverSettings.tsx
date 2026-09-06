import { FEATURE_LABELS, useFeatureFlags, type FeatureKey } from "@/lib/settings/featureFlags";
import { Switch } from "@/components/ui/switch";

/** Caregiver-only screen: flips the flags every home-screen button reads. */
export function CaregiverSettings() {
  const { flags, loading, setFlag } = useFeatureFlags();
  const keys = Object.keys(FEATURE_LABELS) as FeatureKey[];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">What shows on the home screen</h1>
      <p className="mt-2 text-muted-foreground">
        Turn a button off and it disappears from the home screen. Nothing is deleted.
      </p>

      <div className="mt-8 divide-y divide-border rounded-2xl border border-border">
        {keys.map((key) => {
          const label = FEATURE_LABELS[key];
          return (
            <label
              key={key}
              className="flex cursor-pointer items-center justify-between gap-6 px-5 py-5"
            >
              <span>
                <span className="block text-lg font-semibold text-foreground">{label.title}</span>
                <span className="block text-sm text-muted-foreground">{label.hint}</span>
              </span>
              <Switch
                checked={flags[key]}
                disabled={loading}
                onCheckedChange={(checked) => setFlag(key, checked)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
