import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/inspire")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
