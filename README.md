# Teacher's Pet

An AI teaching assistant built to amplify a teacher's creativity, expertise and confidence — not replace them.

> You're still the teacher. Teacher's Pet just helps you do more with your ideas.

## Modes

- **Inspire Me** — ideas and angles, never a finished lesson.
- **Build With Me** — a few quick questions, then a lesson developed collaboratively.
- **Do The Busywork** — worksheets, quizzes, rubrics, parent messages, done fast.
- **Challenge Me** — a second opinion that pokes at weak spots, never a verdict.

"Ask Teacher's Pet" is available from anywhere in the app for plain-language help — no prompts or settings required.

## AI architecture

All AI functionality goes through a single seam: `src/lib/ai/index.ts` exports `aiProvider`, typed as `AIProvider` (`src/lib/ai/types.ts`). The shipped implementation, `mockProvider.ts`, is a template engine that needs no API key — swap the export for a real provider (Anthropic, OpenAI, Gemini, etc.) and every screen keeps working unchanged.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c67a08f-dc9c-4e88-9708-fac180af881f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
