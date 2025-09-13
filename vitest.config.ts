import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    reporters: 'default',
    hookTimeout: 120000,
    testTimeout: 120000,
    // serial is safer since some tests build the site
    sequence: { concurrent: false }
  }
});

