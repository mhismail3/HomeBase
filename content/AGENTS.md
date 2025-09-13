# AGENTS.md — content/

Purpose: Authoring guidance for Markdown content. Keep content clean and portable. All contributions follow TDD by adding/adjusting tests that validate how content is rendered.

## File Structure
- Note: With Astro Content Collections, files actually live under `src/content/`.
- Posts: `src/content/posts/{yyyy-mm-dd-slug}.md`
- Pages: `src/content/pages/{slug}.md`
- Assets: `src/content/assets/{slug}/...` (images colocated per post when needed)

## Front Matter
- Required: `title` (string), `date` (ISO‑8601), `summary` (short), `draft` (bool)
- Optional: `tags` (array of strings), `canonical`, `updated`

## Writing Rules
- One sentence per line for clean diffs.
- Alt text is required for images; captions optional.
- Use fenced code blocks with language hints.
- Avoid HTML in Markdown unless necessary; prefer Markdown syntax.

## Slugs & Naming
- Slug: `kebab-case`, stable; changing slugs requires a redirect entry when redirects are introduced.

## Drafts
- Mark drafts with `draft: true`; excluded from build, feed, and sitemap.

## Tests (TDD)
- Add/modify fixtures in `tests/fixtures/content/` when changing rendering rules.
- Update unit tests covering front matter parsing and slug generation.
- Snapshot tests must assert expected HTML for headings, code, images, links.

## Accessibility
- Keep headings hierarchical (h1 once per page via template; posts start at h2).
- Provide meaningful link text; avoid “here/this”.

## Performance
- Prefer small images; provide width/height to avoid CLS; use modern formats if possible.
