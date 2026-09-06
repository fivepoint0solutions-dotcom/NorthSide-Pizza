# Senior Sidekick

A premium, global marketing and product-experience site for **Senior Sidekick** — a warm, voice-first
companion for older adults, and a quiet line of connection for the families around them.

> The companion that learns how to be there for you.

The site is built as a product ecosystem rather than a set of pages: one design system, one content
layer, live interactive product mockups, a four-language localisation system, and accessibility
wired into the design tokens instead of bolted on at the end.

---

## ⚠️ Brand tokens need one confirmation pass

The build was asked to match `srsidekick.org` exactly as the visual source of truth. **That domain is
blocked by this environment's network egress policy**, so the reference palette, fonts and logo could
not be extracted. Everything is therefore built against a documented, deliberately isolated brand
layer so locking the real brand is a small, contained edit rather than a rewrite:

| What                     | Where                                                                                                                             | How to swap                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Colour palette           | `src/styles.css` → `:root` → "1. BRAND PRIMITIVES"                                                                                | Replace the seven `--brand-*` values. Every semantic role, gradient, shadow and component derives from them via `color-mix()`. |
| Gradients                | `src/styles.css` → "2. SIGNATURE GRADIENTS"                                                                                       | Built from the primitives; adjust only if the reference uses different gradient geometry.                                      |
| Fonts                    | `src/styles.css` → `@theme inline` (`--font-display`, `--font-sans`) **and** the Google Fonts `<link>` in `src/routes/__root.tsx` | Change both together.                                                                                                          |
| Corner radius            | `src/styles.css` → `--radius`                                                                                                     | The whole radius scale is derived from it.                                                                                     |
| Logo                     | `src/lib/brand.ts` → `BRAND.logo.src`                                                                                             | Drop the asset in `public/brand/` and set the path. Until then, `<SidekickLogo />` draws a built-in vector mark.               |
| Names, taglines, contact | `src/lib/brand.ts`                                                                                                                | Single source of truth for brand copy.                                                                                         |

Nothing else in the codebase hardcodes a colour, font or logo.

---

## Architecture

```
src/
  styles.css              Design system: brand primitives → semantic roles → utilities
  lib/
    brand.ts              Brand config + replaceable logo asset path
    accessibility.tsx     Text size / contrast / motion preferences (data attributes on <html>)
    i18n/                 Language provider, locale-aware dates, 4 translation dictionaries
    site/
      navigation.ts       Header + footer information architecture
      adventures.ts       The adventure system (7 experiences, scripted beats, permissions)
      content.ts          Value props, journey, day timelines, comparison, regions, voices
      trust.ts            Privacy, safety, permissions matrix, accessibility, memory, legacy
      plans.ts            Plans, pricing notes, partnership tracks
      knowledge.ts        FAQ, resources, support channels
  components/
    brand/                SidekickLogo (replaceable)
    site/                 Header, footer, primitives, icon registry, language + a11y menus
    product/              Live product mockups: avatar, device frames, senior UI,
                          caregiver dashboard, conversation demo, day timeline, world map
    adventures/           Adventure cards
    home/                 Homepage hero and narrative sections
    motion/               Scroll reveal + parallax (both no-op under reduced motion)
  routes/                 File-based routes (TanStack Start)
```

Content lives in typed data modules, not in JSX, so every section is CMS-ready: swap a module for a
fetch and the components are unchanged.

## Routes

`/` · `/how-it-works` · `/seniors` · `/families` · `/adventures` · `/adventures/$slug` ·
`/day-in-the-life` · `/memories` · `/languages` · `/scenarios` · `/pricing` · `/partners` ·
`/resources` · `/faq` · `/support` · `/about` · `/privacy` · `/safety` · `/accessibility` ·
`/terms` · `/get-started`

## The interactive pieces

These are live components, not screenshots — they respond to the visitor's language and
accessibility settings:

- **Conversation demo** (homepage hero) — ask Sidekick a question and watch it answer, with real
  browser speech synthesis in the selected language where available.
- **Senior experience** — the actual senior-facing interface inside a device frame; open an
  adventure, come back, change the text size and watch it adapt.
- **Caregiver dashboard** — four tabs including the permissions matrix families ask about first.
- **A day, both sides** — parallel interactive timelines for the senior and the caregiver.
- **World map** — availability and localisation roadmap, with an equivalent keyboard-navigable list.
- **Onboarding** — the eight-step setup flow, completable in the browser.

## Accessibility

Accessibility is expressed as design tokens, so a preference changes the entire site consistently:

- `html[data-text-scale]` — normal / large / largest (the header nav folds into the menu at largest)
- `html[data-contrast]` — standard / high (drops every decorative gradient and shimmer)
- `html[data-motion]` — full / calm (independent of the OS setting, which is also respected)

Plus: 44px minimum targets (60px+ in the senior experience), voice-first framing, a skip link,
semantic landmarks, live regions on the interactive demos, and `lang` kept in sync with the chosen
language.

## Localisation

English, French, Spanish and Hindi. The dictionaries in `src/lib/i18n/translations.ts` cover the
global chrome, the homepage narrative and the adventure system; each language is typed against the
English key set, so a missing key is a compile error. Dates and times are formatted per locale via
`Intl`, and the language picker states plainly that voice, activities and stories change with the
language — not just the menus.

## Development

```sh
npm i
npm run dev      # vite dev server
npm run build    # production build
npm run lint     # eslint + prettier
npx tsc --noEmit # typecheck
```

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c67a08f-dc9c-4e88-9708-fac180af881f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.
