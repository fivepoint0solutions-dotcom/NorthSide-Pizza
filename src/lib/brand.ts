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
  name: "SR Sidekick",
  shortName: "Sidekick",
  legalName: "SR Sidekick",
  domain: "srsidekick.org",
  /* Positioning taken from the reference site and deck. */
  category: "Senior care & safety platform",
  tagline: "A calm daily companion for orientation, safety, and emotional connection.",
  promise:
    "Not another app to learn. A companion that learns you — where you are, who your people are, what calms you, and what today holds.",
  logo: {
    /** Set to an asset path (e.g. "/brand/senior-sidekick-logo.svg") to use the real logo. */
    src: null as string | null,
    alt: "SR Sidekick",
  },
  contact: {
    general: "hello@srsidekick.org",
    support: "support@srsidekick.org",
    accessibility: "access@srsidekick.org",
    partnerships: "partners@srsidekick.org",
    privacy: "privacy@srsidekick.org",
  },
} as const;
