# AGENTS.md

Purpose: Guidance for any agent or contributor working on this repository. The aim is a minimal, durable portfolio/blog/central hub that lets content shine without visual noise or heavy tooling. All implementation should follow a strict Test‑Driven Development (TDD) approach.

## Core Principles
- Minimalism: Prefer static files and zero client‑side JavaScript by default.
- Content‑first: Typography, spacing, and readability over visual effects.
- Maintainability: Few, boring dependencies; explicit over clever; small surface area.
- Accessibility: WCAG 2.1 AA; keyboard‑first; high contrast; semantic HTML.
- Performance: Instant load on average networks; 95+ Lighthouse Perf/Accessibility.
- Simplicity: No frameworks unless clearly justified by tests and requirements.

## Non‑Goals
- No complex CMS; author locally via Markdown (or a single, simple format).
- No heavy design systems; keep styles small and readable.
- No SPA routing; use plain links or static prerendered pages.

## Scope & MVP
- Home page with short bio and selected links.
- Posts (Markdown) rendered to clean HTML with consistent typography.
- Atom/RSS feed and simple sitemap.
- Simple tag listing (optional if it adds complexity).

## Content Model (proposed)
- Directory: `content/`
  - Posts: `content/posts/{yyyy-mm-dd-slug}.md`
  - Pages: `content/pages/{slug}.md`
- Front matter (YAML or TOML): `title`, `date`, `tags`, `summary`, `draft`.

## Technology Constraints
- Static by default: Use a static site generator or a tiny custom build script.
- Acceptable choices (pick one, justify in README):
  - Eleventy (JS), Hugo (Go), Astro (hybrid with islands disabled by default), or a tiny custom Node/Python script if truly simpler.
- CSS: One small stylesheet (e.g., `styles.css`) with system fonts; no CSS frameworks.
- JS: None client‑side unless a specific feature requires it; must pass a “value vs bytes” test.

## Architecture Baseline
- Inputs: Markdown + front matter → Templates → Static HTML.
- Outputs: `/index.html`, `/posts/{slug}/index.html`, `/feed.xml`, `/sitemap.xml`, `/tags/{tag}/`.
- Templates: Header, footer, post list, post detail.
- URLs: Kebab‑case slugs; trailing slashes OK; stable permalinks.

## TDD Workflow (Required)
- Red → Green → Refactor for every change.
- Start with failing tests that describe the behavior, then implement the minimal code to pass.
- Prefer small, isolated units; add thin integration tests where behavior spans modules.
- Treat HTML as an API: use snapshot tests with stable formatting.
- Never commit untested features; tests must be deterministic and fast.

### Test Coverage Expectations
- Unit:
  - Markdown → HTML rendering rules (headings, code blocks, images, links).
  - Template composition (metadata injection, canonical URLs, date formatting).
  - Feed and sitemap generation.
  - Utilities: slug generation, pagination (if added), tag expansion.
- Integration:
  - Build pipeline: content → output directory with correct structure.
  - Link checker: no broken internal links in the generated site.
- Accessibility (lite):
  - Static axe/aria checks on rendered pages (automated in CI if tooling chosen supports it).
- E2E (optional, small):
  - Headless browser smoke test of built site (home, a post, feed status).

### Recommended Tooling (choose equivalents per stack)
- JS: Vitest/Jest + Testing Library + Playwright (optional for smoke) + Axe.
- Go (Hugo): Go test for custom logic; script‑based snapshot checks for outputs.
- Python (custom): Pytest + markdown/templating libs; use `pytest-regressions` for snapshots.

## Coding Standards
- HTML5 semantic elements; no div soup.
- CSS: mobile‑first, clamp() for fluid type/spacing, max line length ~70–80ch.
- Dates: ISO‑8601 in content; display in localizable long format.
- i18n ready: avoid hard‑coding English in templates where easy to parameterize.
- No global mutable state in build scripts; pure functions where possible.

## Performance & Accessibility
- Budgets: HTML per page < 50KB uncompressed; CSS < 10KB.
- Images: responsive sizes, modern formats if available; no layout shift.
- Color contrast ≥ 4.5:1; focus styles visible; skip links for keyboard users.

## SEO & Metadata
- Each page: `<title>`, meta description, canonical URL, OpenGraph + Twitter cards.
- RSS/Atom feed includes absolute URLs and valid dates.
- Generate `robots.txt` allowing all by default; exclude drafts.

## Repository Conventions
- `content/` for source posts/pages.
- `templates/` for layouts/partials.
- `public/` for static assets.
- `scripts/` for build and test helpers.
- `dist/` (or `build/`) as output; never committed.
- Keep a tiny `README.md` describing how to build, test, and write posts.

## CI Expectations
- On every push/PR:
  - Install deps, run unit/integration tests, run accessibility lint where applicable.
  - Build site; run link check on `dist/`.
  - Artifact `dist/` for preview (if CI supports it).

## Contribution Workflow
- Open a small PR per change; include the tests that drove it.
- Checklist before merge:
  - Tests pass locally and in CI.
  - No new dependencies without clear justification.
  - Lighthouse/axe scores unchanged or improved.
  - Pages render correctly with JS disabled.

## Deployment
- Any static host (e.g., GitHub Pages, Netlify, Cloudflare Pages) is acceptable.
- Cache static assets with long TTL; HTML with short TTL; include `etag`/`last-modified` if using a CDN that supports them.

## Decision Records
- When choosing or changing tools, add a brief ADR in `docs/adr/` explaining options considered and why the chosen approach best fits minimalism + TDD.

---
This document is intentionally opinionated to keep the project simple, testable, and durable. If a change increases complexity, first demonstrate the need with a failing test, then implement the smallest passing solution.

## Implementation Strategy (Astro + GitHub Pages)

### Overview
- Framework: Astro (static export, zero‑JS by default, islands if needed).
- Hosting: GitHub Pages via Actions; `dist/` as artifact; deploy on `main`.
- Priority: Mobile‑first responsive layout; desktop is an enhancement.
- Philosophy: Match the screenshot’s spirit—single column, generous spacing, content‑first.

### Phases
- Foundation:
  - Initialize Astro app, set `site` and `base` in `astro.config.mjs`.
  - Add `content/` with content collections for posts/pages.
  - Create global CSS with system fonts and fluid type/spacing.
  - Write unit tests for utilities (slug/date/frontmatter) with Vitest.
- Templates:
  - `src/layouts/Base.astro` with semantic header/footer, skip link, and nav.
  - `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/posts/[slug].astro`.
  - Post list page mirrors the screenshot: large titles, lots of whitespace.
  - Snapshot tests for rendered HTML (stable formatting enforced).
- Features:
  - Feed: `scripts/generate-feed.ts` → `dist/feed.xml` (with tests for item count/ordering).
  - Sitemap/robots: generate at build; exclude drafts.
  - Tags: optional simple listing; ship only if tests demonstrate value.
  - Search: defer; consider Pagefind or tiny client‑side index if/when needed.
- Quality Gates:
  - Accessibility checks with axe on built pages (headless run in CI).
  - Link checker on `dist/` to prevent broken internal links.
  - Performance budget: CSS <10KB, HTML page <50KB (lint or CI assert).
- CI/CD:
  - GitHub Actions: install, test (unit/integration/a11y), build, deploy to Pages.
  - Upload `dist/` as artifact for preview on PRs.

### Information Architecture
- Home: brief bio + latest posts.
- About: single static page.
- Posts: `/posts/{slug}/`; chronological index on `/` with ~10–20 items.
- Optional: `/tags/{tag}/` for browsing related posts.

### Mobile‑First Design Notes
- Single column up to large breakpoints; max text width ~70–80ch on desktop.
- Fluid type and spacing using `clamp()`; comfortable tap targets (≥44px).
- High‑contrast color palette; visible focus styles; no JS menus by default.
- Avoid layout shift: reserve space for media; lazy‑load images only if needed.

### Directory Layout (planned)
- `content/posts/` and `content/pages/` – Markdown with front matter.
- `src/pages/` – route files; `src/layouts/` – base + post layouts.
- `src/components/` – nav, post list, pagination (if any).
- `src/styles/base.css` – minimal CSS; tokens and utilities.
- `scripts/` – feed/sitemap/link‑check build helpers (typed, testable).
- `tests/` – `unit/`, `integration/` (build output), `a11y/`.

### TDD Milestones
- M1: Content parsing utilities have unit tests (slug/date/frontmatter).
- M2: Base layout renders title/description correctly (snapshot test passes).
- M3: Index lists posts from fixtures; order and links verified.
- M4: Post page renders Markdown (code, images, headings) with correct HTML.
- M5: Feed and sitemap generated and validated against schema checks.
- M6: A11y checks pass; link checker clean; budgets enforced in CI.

### Deployment
- Use official `actions/deploy-pages` workflow; configure Pages to “GitHub Actions”.
- Cache Node modules; build with Node 20; publish `dist/`.

### Extensibility
- Astro islands available for future enhancements (e.g., search) without JS by default.
- Content collections allow new sections (notes, bookmarks) with typed schemas.

See sub‑folder AGENTS.md files for area‑specific guidance.
