import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recent-work")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
