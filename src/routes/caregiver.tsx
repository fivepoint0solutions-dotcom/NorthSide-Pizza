import { createFileRoute } from "@tanstack/react-router";
import { CaregiverSettings } from "@/components/settings/CaregiverSettings";

export const Route = createFileRoute("/caregiver")({
  head: () => ({ meta: [{ title: "Caregiver settings" }] }),
  component: CaregiverSettings,
});
