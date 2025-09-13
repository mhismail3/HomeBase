# AGENTS.md — tests/

Purpose: TDD structure and expectations.

## Layout
- `tests/unit/` — utilities: slug, date formatting, front matter parsing.
- `tests/integration/` — build site from fixtures, assert files/HTML.
- `tests/a11y/` — axe checks on built pages.
- `tests/fixtures/` — sample content used by tests (small and deterministic).

## Tools
- Vitest for unit/integration; Playwright (optional) for smoke; axe‑core for a11y.

## Core Tests
- Index page lists latest N posts, correct order and links.
- Post page renders Markdown features (headings, code, images) correctly.
- Feed and sitemap generated and valid; drafts excluded.
- No broken internal links; canonical URLs present.

## Rules
- Red → Green → Refactor. Commit the failing test first when practical.
- Snapshots are stable and reviewed; regenerate intentionally.

