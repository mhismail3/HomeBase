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
    expect(html).toMatch(/>posts<|>posts\./i);
    expect(html).toMatch(/\/(HomeBase\/)?posts\//);
    expect(html).toMatch(/\/(HomeBase\/)?page\/2\//);
    // date inline with title uses class post-date
    expect(html).toMatch(/class=\"post-date\"/);
    // tag chips under title and tag cloud
    expect(html).toMatch(/class=\"tag\"/);
    expect(html).toMatch(/id=\"tag-filters\"/);
  });

  it('renders a portfolio project page (Loops)', () => {
    const file = join(dist, 'posts', '2023-10-30-loops-tasks-app', 'index.html');
    expect(existsSync(file)).toBe(true);
    const html = readFileSync(file, 'utf8');
    expect(html).toMatch(/Loops/i);
    expect(html).toMatch(/10\/15\/2023/);
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
    const portfolioTag = join(dist, 'tags', 'portfolio', 'index.html');
    expect(existsSync(portfolioTag)).toBe(true);
    const html = readFileSync(portfolioTag, 'utf8');
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
