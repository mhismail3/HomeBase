# AGENTS.md — scripts/

Purpose: Small, typed Node scripts that assist build verification and generation.

## Scripts (planned)
- `generate-feed.ts` — Build Atom/RSS from content collections.
- `generate-sitemap.ts` — Output `sitemap.xml` and `robots.txt`.
- `check-links.ts` — Validate internal links within `dist/`.

## Practices
- TypeScript with strict mode; pure functions where possible.
- TDD: write tests against functions returning strings/objects; keep I/O thin.
- Fast: scripts must run in seconds and be CI‑friendly.

