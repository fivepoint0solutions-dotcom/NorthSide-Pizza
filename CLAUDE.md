# CLAUDE.md

Strict operating rules for Claude when working in this repository.

## Project

- TanStack Start app (`@tanstack/react-start` + `@tanstack/react-router`), React 19, TypeScript, Tailwind CSS v4, Radix UI / shadcn-style components in `src/components/ui`.
- Package manager: **bun** (`bun.lock` is the source of truth). Do not generate or commit a competing `package-lock.json` change unless bun is unavailable.
- Deployed via Netlify (`netlify.toml`).
- This project is connected to **Lovable** (see `AGENTS.md`). Commits pushed to the connected branch sync back into the Lovable editor.

## Hard rules

1. **Never rewrite published history.** No `git rebase`, `git commit --amend`, `git push --force`, or squashing of commits already pushed to a remote branch. Lovable and any collaborators depend on linear, additive history.
2. **Never commit directly to `main`/the Lovable-connected branch** unless explicitly told to. Work on a feature branch and let the user decide when to merge.
3. **Always run before declaring work done:**
   - `bun run lint` (ESLint, flat config in `eslint.config.js`)
   - `bun run format` only if formatting was actually part of the task — do not reformat unrelated files
   - `bun run build` for any change that touches routing, config, or build-affecting code
   - All must pass with zero new errors/warnings introduced by your change.
4. **TypeScript strictness is non-negotiable.** No `any`, no `@ts-ignore`/`@ts-expect-error` to silence real type errors, no widening types to make something compile. Fix the underlying type issue.
5. **No new dependencies** without explicit user approval. This repo already carries a large Radix/shadcn UI surface — check `src/components/ui` before reaching for an external library; it likely already exists.
6. **Don't touch generated/vendor files** (`bun.lock`, `package-lock.json`, `.lovable/`) except as a direct, unavoidable consequence of a dependency change the user asked for.
7. **Match existing patterns exactly**: component structure under `src/`, Tailwind v4 conventions (no `tailwind.config.js` — config lives in CSS/`vite.config.ts`), Radix primitives wrapped the way `src/components/ui` already does it. Don't introduce a second styling or component pattern.
8. **No speculative abstraction.** Fix or build exactly what was asked. No new config flags, feature toggles, or "future-proofing" scaffolding.
9. **No comments explaining what code does.** Only comment a genuinely non-obvious constraint or workaround, and keep it to one line.
10. **Images/assets**: this repo contains large binary assets at the root (e.g. product photos). Do not add new binary assets without being asked, and never modify or move existing ones without explicit instruction.

## Before finishing any task

- Diff review: confirm the change is minimal and scoped to what was requested.
- Lint and build clean (see above).
- No unrelated files touched (check `git status`).
- If UI changed, state plainly that it has not been visually verified unless you actually ran the dev server and looked at it.
