import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/busywork")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
