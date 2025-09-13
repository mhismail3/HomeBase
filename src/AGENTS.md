# AGENTS.md — src/

Purpose: Guidance for source code and templates using Astro. Keep components small, semantic, and focused on content rendering.

## Structure
- `src/pages/` — route files. Avoid logic; assemble data and render.
- `src/layouts/` — `Base.astro`, `Post.astro` with semantic regions and shared meta.
- `src/components/` — small pieces: `Nav.astro`, `PostList.astro`, `Footer.astro`.
- `src/styles/` — global CSS (`base.css`) and tokens.

## Practices
- Mobile‑first CSS; desktop refinements via min‑width media queries.
- Default to zero client JS; if needed, use Astro islands with explicit `client:*` directives and tests that justify them.
- Use Astro Content Collections to type front matter and validate at build.
- Keep HTML accessible: landmarks, proper headings, labels, and focus order.

## Layout
- Header: site title, small nav; include a skip link.
- Main: single column, max width ~70–80ch on wide screens.
- Footer: simple links; updated year.

## SEO
- Set `<title>`, `meta[name=description]`, canonical URL, OpenGraph/Twitter.

## Tests (TDD)
- Snapshot pages with fixture content; assert post list order and links.
- Unit tests for utilities (slug/date/collections).

