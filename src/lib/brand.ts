/**
 * BRAND CONFIG — single source of truth for names, taglines and the logo asset.
 *
 * The visual tokens (colour, gradients, radii, shadows, fonts) live in
 * src/styles.css under "BRAND PRIMITIVES". This file holds the *content*
 * side of the brand plus the swappable logo asset path.
 *
 * TO DROP IN THE OFFICIAL LOGO:
 *   1. put the file at `public/brand/senior-sidekick-logo.svg` (or .png)
 *   2. set `logo.src` below to that path
 * Everything on the site renders <SidekickLogo />, so nothing else changes.
 * Until an asset exists, the component draws the built-in vector mark.
 */

export const BRAND = {
  name: "Senior Sidekick",
  shortName: "Sidekick",
  legalName: "Senior Sidekick",
  domain: "srsidekick.org",
  tagline: "The companion that learns how to be there for you.",
  promise:
    "Not another app to learn. A companion that learns you — your voice, your people, your stories, your day.",
  logo: {
    /** Set to an asset path (e.g. "/brand/senior-sidekick-logo.svg") to use the real logo. */
    src: null as string | null,
    alt: "Senior Sidekick",
  },
  contact: {
    general: "hello@srsidekick.org",
    support: "support@srsidekick.org",
    accessibility: "access@srsidekick.org",
    partnerships: "partners@srsidekick.org",
    privacy: "privacy@srsidekick.org",
  },
} as const;
