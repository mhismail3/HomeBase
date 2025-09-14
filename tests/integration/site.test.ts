import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { checkLinks, checkA11yLite } from '../../scripts/quality';

const root = process.cwd();
const dist = join(root, 'dist');

describe('site build and quality', () => {
  beforeAll(() => {
    execSync('rm -rf dist', { stdio: 'inherit' });
    execSync('npm run --silent build', { stdio: 'inherit' });
  }, 180000);

  it('produces an index.html with base-aware links, dates, tags, and pagination', () => {
    const file = join(dist, 'index.html');
    expect(existsSync(file)).toBe(true);
    const html = readFileSync(file, 'utf8');
    expect(html).toMatch(/mohsin ismail/i);
    expect(html).toMatch(/\/(HomeBase\/)?posts\//);
    expect(html).toMatch(/\/(HomeBase\/)?page\/2\//);
    // date sub-lines
    expect(html).toMatch(/<time datetime=\"\d{4}-\d{2}-\d{2}\"/);
    // tag chips and tag cloud
    expect(html).toMatch(/class=\"tag\"/);
    expect(html).toMatch(/id=\"tag-filters\"/);
  });

  it('renders the welcome post page', () => {
    const file = join(dist, 'posts', '2025-01-01-welcome', 'index.html');
    expect(existsSync(file)).toBe(true);
    const html = readFileSync(file, 'utf8');
    expect(html).toContain('Welcome');
  });

  it('generates a feed', () => {
    const feed = join(dist, 'feed.xml');
    expect(existsSync(feed)).toBe(true);
    const xml = readFileSync(feed, 'utf8');
    expect(xml).toMatch(/<rss|<feed/);
  });

  it('builds tag index and a tag detail page', () => {
    const tagIndex = join(dist, 'tags', 'index.html');
    expect(existsSync(tagIndex)).toBe(true);
    const metaTag = join(dist, 'tags', 'meta', 'index.html');
    expect(existsSync(metaTag)).toBe(true);
    const html = readFileSync(metaTag, 'utf8');
    expect(html).toMatch(/posts\//);
  });

  it('renders a mobile-friendly resume page', () => {
    const file = join(dist, 'resume', 'index.html');
    expect(existsSync(file)).toBe(true);
    const html = readFileSync(file, 'utf8');
    expect(html).toMatch(/Mohsin Ismail/i);
    expect(html).toMatch(/Experience/i);
    expect(html).toMatch(/Amazon/i);
    expect(html).toMatch(/Epic Systems/i);
  });

  it('has no broken internal links', () => {
    const issues = checkLinks(dist);
    expect(issues).toEqual([]);
  });

  it('passes lite a11y checks', () => {
    const issues = checkA11yLite(dist);
    expect(issues).toEqual([]);
  });
});
