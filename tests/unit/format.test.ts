import { describe, it, expect } from 'vitest';
import { formatISODate, slugify } from '../../src/lib/format';

describe('formatISODate', () => {
  it('formats date as YYYY-MM-DD in UTC', () => {
    // Jan 2, 2025
    const d = new Date(Date.UTC(2025, 0, 2));
    expect(formatISODate(d)).toBe('2025-01-02');
  });
});

describe('slugify', () => {
  it('lowercases, removes diacritics, and collapses to hyphens', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
    expect(slugify('Café Déjà Vu')).toBe('cafe-deja-vu');
    expect(slugify('  trim  ends  ')).toBe('trim-ends');
  });
});

