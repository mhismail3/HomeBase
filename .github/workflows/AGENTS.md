# AGENTS.md — .github/workflows/

Purpose: Continuous integration and GitHub Pages deployment pipeline.

## Build & Test Job
- Trigger: push and PR to `main`.
- Steps: checkout → setup Node 20 → install → run unit/integration/a11y tests → `astro build` → run link check.
- Artifact: upload `dist/` for PR preview.

## Deploy Job
- Trigger: on push to `main` after build passes.
- Uses `actions/upload-pages-artifact` and `actions/deploy-pages`.
- GitHub Pages is configured to “GitHub Actions” in repo settings.

## Guards
- Fail the pipeline if budgets/a11y/link checks fail.

