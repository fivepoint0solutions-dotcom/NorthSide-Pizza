# Global Visual Design System — Premium Victoria, BC Real Estate

Foundation only: tokens, typography, motion, and a small set of reusable primitives. No homepage, property cards, listings, property pages, or logo.

## Colour system

Five brand colours only, defined once as CSS variables in `src/styles.css` (oklch), then mapped to semantic roles so every future component reads roles, never raw hex.

| Brand | Role |
| --- | --- |
| Old-Growth Green `#263F35` | primary dark, nav, major headings, dark sections |
| Cedar `#76533F` | warm secondary / accent |
| Pacific Teal `#28717A` | links, interactive, selected states, key CTAs |
| Fern `#87965B` | natural secondary accent, subtle highlights |
| Bone `#E7E0D2` | primary light background and light surfaces |

Semantic mapping (light): background = Bone, foreground = Old-Growth Green, primary = Old-Growth Green, accent = Cedar, ring/link/CTA = Pacific Teal, highlight = Fern, card/surface = near-white Bone tint, borders = low-opacity Old-Growth Green.

Dark mode: background = Old-Growth Green, foreground/surfaces = Bone tints, Pacific Teal and Fern lifted slightly for contrast. Restraint by design — Cedar and Fern stay as small accents, not large fills.

## Typography

- Editorial serif for display/headlines, clean modern sans for body and UI, loaded via `<link>` in the root route head (no CSS `@import` of remote URLs).
- Proposed pairing: **Cormorant Garamond** (display) + **Karla** (body/UI). Tokens `--font-display` and `--font-sans`, plus a reusable heading/eyebrow/lede/body type scale with editorial tracking and line-height.

## Other tokens

- Spacing rhythm and generous editorial section padding scale.
- Border radius set (mostly small/architectural, with one soft option for images).
- Shadows tuned to natural materials: soft, low-contrast, green-tinted rather than grey.
- Motion tokens: durations, cinematic easing curves, and named transitions.

## Interaction language

- Refined custom cursor treatment on interactive surfaces.
- Subtle button interactions (fill/underline/lift) as component variants.
- Smooth hover states with token-driven timing.
- Scroll-based reveal utility (IntersectionObserver, one-shot, opacity + small translate).
- Subtle parallax and smooth image movement helpers, capped in intensity.
- All motion respects `prefers-reduced-motion`, uses transform/opacity only, and never hijacks scroll or blocks reading.

## Technical notes

- `src/styles.css`: brand variables, `@theme inline` semantic mappings, light/dark blocks, base layer, `@utility` definitions for editorial type, reveal, hover-lift, cursor, and parallax helpers.
- Fonts wired in `src/routes/__root.tsx` head links; `head()` metadata updated away from the placeholder title/description.
- Small reusable pieces: `src/components/ui/button.tsx` variants (if present; otherwise added), plus `src/components/motion/Reveal.tsx`, `Parallax.tsx`, `SmoothImage.tsx`, and `src/hooks/use-reduced-motion.ts`.
- `src/routes/index.tsx` becomes a design-system reference page (palette, type scale, buttons, motion demos) rather than a homepage — a style guide, not marketing content or listings.
