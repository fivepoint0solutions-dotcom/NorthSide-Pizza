# Senior Sidekick

A premium, global marketing and product-experience site for **Senior Sidekick** — a warm, voice-first
companion for older adults, and a quiet line of connection for the families around them.

> The companion that learns how to be there for you.

The site is built as a product ecosystem rather than a set of pages: one design system, one content
layer, live interactive product mockups, a four-language localisation system, and accessibility
wired into the design tokens instead of bolted on at the end.

---

## Brand

The visual identity is taken from srsidekick.org (supplied as screenshots — the domain itself is
blocked by this environment's egress proxy). What the site adopts:

| Token              | Value      | Where it shows on the reference                   |
| ------------------ | ---------- | ------------------------------------------------- |
| `--brand-rose`     | ~`#C0708A` | Nav pill, greeting, "Tap to talk", card gradients |
| `--brand-blue`     | ~`#6C86B4` | The other half of every gradient, control borders |
| `--brand-lavender` | ~`#8B7BA8` | The middle of the rose→blue ramp                  |
| `--brand-teal`     | ~`#5E8CA6` | Help cards ("Call Caregiver")                     |
| `--brand-amber`    | ~`#D8933F` | The contrasting border on nearly every surface    |
| `--brand-ink`      | ~`#1B2430` | Body and date type                                |
| `--brand-pearl`    | ~`#FAF6F0` | The warm pearl ground                             |

Also carried over: the serif display voice (Playfair Display, italic for expressive lines) over a
geometric sans (Poppins); large radii with pill buttons; 2px contrasting borders instead of
hairlines; gradient-painted headline words (`text-gradient`); and the feather motif, which flanks
the header and sits as a watermark behind the hero (`FeatherMark`).

`--grad-action` is the same rose→blue ramp dropped in lightness so white labels clear 4.5:1 — the
reference's brighter ramp is kept for decorative surfaces that carry no text.

**Two things still open:**

1. **The name.** The reference brand is _Senior Sidekick_; the brief for this site says _Senior
   Sidekick_ throughout, so that's what's built. Changing it is one edit in `src/lib/brand.ts` plus
   the `brand.tagline` keys in the four translation dictionaries.
2. **The logo.** No wordmark asset was available, so `<SidekickLogo />` sets the name in the brand
   serif beside the feather mark. Drop a file in `public/brand/` and set `BRAND.logo.src` to use the
   real one — every usage on the site goes through that component.

## Product scope

The screenshots also settled what the product _is_: a senior care and safety platform, not only a
companion. `src/lib/site/pillars.ts` carries the six pillars from the reference deck — Location
Safety, People Identifier, Audio Therapy, Brain Games, Schedule & Reminders, Emergency Help — and
the senior mockup mirrors the shipping app's four tabs (Now, Schedule, People, Help), its
"Right now: you are at home" orientation card, and its permanent Tap-to-talk and Caregiver controls.

Because orientation is a real feature, the privacy and safety copy says so plainly: Sidekick always
tells the senior where they are, a caregiver sees location only by explicit permission, and no
movement history is kept for anyone to scroll.

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

## SEO & discoverability

- Per-route title, description, canonical and Open Graph tags via `seoHead()` in
  `src/lib/site/seo.ts` — one call per route, so metadata can't drift from the page.
- `?lang=fr|es|hi` selects a language on load and is written into the URL when the picker is used,
  which makes localised pages linkable, shareable and crawlable. Every route declares hreflang
  alternates for all four languages plus `x-default`.
- Structured data: Organization and WebSite site-wide, FAQPage on `/faq`, Product with offers on
  `/pricing`.
- `public/sitemap.xml` is regenerated on every build (`prebuild` → `scripts/generate-sitemap.mjs`)
  from the routes that actually exist on disk plus the adventure slugs, with hreflang alternates per
  URL. `robots.txt` points at it.
- Social card: `public/brand/og-image.png`, authored in `scripts/og-image.html`. Re-render that file
  at 1200×630 after any brand change (the committed PNG was rendered without the brand webfonts,
  which this environment can't reach).

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
