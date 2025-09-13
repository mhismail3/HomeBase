# AGENTS.md — src/styles/

Purpose: Minimal, readable, mobile‑first CSS shared across pages.

## Principles
- System UI fonts: `ui-sans-serif, -apple-system, Segoe UI, Roboto, ...`.
- Base size ~16px with fluid scaling using `clamp()`.
- Line length target ~70–80ch; line height ~1.5–1.7.
- Color contrast ≥ 4.5:1; focus styles visible and non‑subtle.
- No CSS frameworks; small custom stylesheet (<10KB unminified target).

## Tokens (suggested)
- Space: `--space-1..5` using `clamp()` for fluid spacing.
- Type scale: `--step--1..3` for sizes; large titles on index as in screenshot.
- Colors: foreground, background, subtle link color with hover underline.

## Layout
- Single column container with max width; full‑bleed background when useful.
- Use `@media (min-width: 48rem)` for desktop refinements.

## Performance
- Avoid webfonts; if ever used, preload and provide safe fallbacks.
- Minimize custom properties; avoid heavy shadows/filters.

