import { defineConfig } from 'astro/config';

// Project pages are intended to be served at https://mhismail3.github.io/HomeBase/
// Adjust `site` and `base` if the repository or username changes.
export default defineConfig({
  site: 'https://mhismail3.github.io/HomeBase',
  base: '/HomeBase',
  trailingSlash: 'always'
});

