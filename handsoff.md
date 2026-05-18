# HANDSOFF.md

# NeuralChooser

> Discover and choose the right AI platforms for your workflow.

---

# Project Overview

NeuralChooser is a curated AI platform discovery website built using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
- Vercel

The project focuses on helping users discover AI platforms such as:

- ChatGPT
- Claude
- Gemini
- DeepSeek
- Midjourney
- Cursor
- ElevenLabs
- Perplexity
- Runway
- Suno

This project is intentionally:

- content-driven
- SEO-friendly
- statically generated
- scalable
- visually premium
- maintainable

---

# IMPORTANT PRODUCT DIRECTION

The project originally started as:

> an AI model comparison directory

This direction was intentionally changed.

## We are NOT building:

- a giant benchmark database
- per-version model tracking system
- comparison matrix engine

Examples of what we intentionally avoid:

- Claude 3.5
- Claude 3.7
- GPT-4 Turbo
- GPT-4o mini
- benchmark explosion
- static comparison combinations

---

# CURRENT PRODUCT DIRECTION

NeuralChooser is now:

> a curated AI platform discovery product

The primary entities are:

- platforms/providers
  NOT:
- individual model versions

Correct examples:

- ChatGPT
- Claude
- Gemini
- DeepSeek
- Midjourney

Incorrect examples:

- Claude Sonnet 3.7
- GPT-4o mini
- Gemini Flash 2.0

Version-specific models may optionally appear INSIDE detail pages only.

---

# CORE PHILOSOPHY

Prioritize:

- simplicity
- maintainability
- clean UX
- scalability
- editorial feel
- premium UI
- clarity over complexity

Avoid:

- overengineering
- spreadsheet UX
- benchmark obsession
- relational data complexity
- unnecessary abstraction

---

# TECH STACK

Frontend:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- next-themes

Deployment:

- Vercel

Hosting Philosophy:

- static-first architecture
- SEO-first rendering
- minimal client-side JavaScript

---

# PROJECT STRUCTURE

Recommended structure:

/app
/components
/content
/platforms
/lib
/types
/public
/styles

---

# CONTENT ARCHITECTURE

IMPORTANT:
The website is fully data-driven.

DO NOT hardcode platform pages manually.

Each platform should live in its own file.

Example:

/content/platforms
chatgpt.ts
claude.ts
gemini.ts
deepseek.ts

Then export them from:

/content/platforms/index.ts

Example:

```ts
export const platforms = [chatgpt, claude, gemini, deepseek];
```
