# Home Base

A minimal, mobile‑first portfolio/blog built with Astro. Clean typography, no frills, content‑first. Deployed to GitHub Pages.

## Quick Start
- Install: `npm install`
- Dev: `npm run dev`
- Test: `npm test`
- Build: `npm run build` (outputs to `dist/`)

## Content
- Posts: `src/content/posts/{yyyy-mm-dd-slug}.md`
- Pages: `src/content/pages/{slug}.md`
- Front matter: `title` (string), `date` (ISO), `summary?`, `tags?`, `draft` (bool)

## Decisions
- Framework: Astro (static export; zero‑JS by default; islands if needed)
- Hosting: GitHub Pages via Actions
- Base path: `/HomeBase` — all links are computed with Astro’s base URL
- CSS: single small stylesheet (`src/styles/base.css`) with system fonts

## CI/CD
- `.github/workflows/ci.yml` runs tests and builds on push/PR
- `.github/workflows/pages.yml` deploys to Pages on `main`

## TDD
- Unit tests under `tests/unit`
- Integration tests build the site and verify output, links, and lite a11y

## Customization
- Site title and nav are in `src/layouts/Base.astro`
- Index page content is `src/pages/index.astro`

---
See `AGENTS.md` for the full implementation strategy and contribution rules (TDD‑first, minimal dependencies, accessibility, performance budgets).
