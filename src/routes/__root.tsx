import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../lib/i18n";
import { AccessibilityProvider } from "../lib/accessibility";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { Toaster } from "../components/ui/sonner";

const SITE_DESCRIPTION =
  "Senior Sidekick is a warm, voice-first companion for older adults — conversation, music, memories, games and family connection — with a caregiver experience families can trust. Available in English, French, Spanish and Hindi.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display text-foreground">404</h1>
        <h2 className="text-subhead mt-4 text-foreground">We couldn't find that page</h2>
        <p className="text-body mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has moved. Let's get you back somewhere
          useful.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="tap-target gradient-hero gradient-motion rounded-full px-7 py-3.5 text-base font-semibold text-white"
          >
            Go home
          </Link>
          <Link
            to="/support"
            className="tap-target rounded-full border border-border-strong px-7 py-3.5 text-base font-semibold"
          >
            Get help
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-subhead text-foreground">This page didn't load</h1>
        <p className="text-body mt-3 text-muted-foreground">
          Something went wrong on our end. Try again, or head back home.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="tap-target gradient-hero gradient-motion rounded-full px-7 py-3.5 text-base font-semibold text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="tap-target rounded-full border border-border-strong px-7 py-3.5 text-base font-semibold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Senior Sidekick — the companion that learns how to be there for you" },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "senior companionship, senior technology, caregiver support, aging independently, family connection, memory preservation, senior activities, multilingual senior technology, digital companion, senior accessibility",
      },
      { property: "og:site_name", content: "Senior Sidekick" },
      { property: "og:title", content: "Senior Sidekick" },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "fr_FR" },
      { property: "og:locale:alternate", content: "es_ES" },
      { property: "og:locale:alternate", content: "hi_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1F7A7D" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        // Two families only, weights trimmed to what the design system uses.
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/brand/sidekick-mark.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/brand/sidekick-mark.svg" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <LanguageProvider>
          <SiteHeader />
          <main id="main">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}
