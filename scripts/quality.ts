import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, normalize } from 'node:path';

export function listFiles(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listFiles(p, exts));
    else if (exts.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

export function checkLinks(distDir: string): string[] {
  const issues: string[] = [];
  const htmlFiles = listFiles(distDir, ['.html']);
  const filesSet = new Set(htmlFiles.map((p) => normalize(p)));
  const fileExists = (href: string, fromFile: string): boolean => {
    // Strip origin, query, hash
    try {
      if (/^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('#')) return true;
      const clean = href.split('#')[0].split('?')[0];
      const basePrefix = '/HomeBase';
      const path = clean.startsWith(basePrefix) ? clean.slice(basePrefix.length) : clean;
      let targetPath: string;
      if (path.startsWith('/')) {
        targetPath = join(distDir, path.slice(1));
      } else {
        targetPath = resolve(dirname(fromFile), path);
      }
      // Map directories to index.html
      if (statMaybe(targetPath)?.isDirectory()) targetPath = join(targetPath, 'index.html');
      if (targetPath.endsWith('/')) targetPath += 'index.html';
      // Allow non-HTML assets (images, PDFs, icons)
      const assetExts = ['.xml', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.pdf'];
      for (const ext of assetExts) {
        if (targetPath.endsWith(ext)) return statMaybe(targetPath) != null;
      }
      if (!targetPath.endsWith('.html')) targetPath = join(targetPath, 'index.html');
      return filesSet.has(normalize(targetPath));
    } catch {
      return false;
    }
  };

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const anchors = Array.from(html.matchAll(/<a ([^>]*?)href=\"([^\"]+)\"[^>]*>/g));
    for (const m of anchors) {
      const attrs = m[1] ?? '';
      const href = m[2];
      if (/aria-disabled=\"true\"/.test(attrs)) continue; // ignore disabled links
      if (!fileExists(href, file)) issues.push(`${relativeFrom(distDir, file)} -> ${href}`);
    }
  }
  return issues;
}

export function checkA11yLite(distDir: string): string[] {
  const issues: string[] = [];
  const htmlFiles = listFiles(distDir, ['.html']);
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const h1s = (html.match(/<h1\b/gi) || []).length;
    if (h1s !== 1) issues.push(`${relativeFrom(distDir, file)} has ${h1s} <h1>`);
    for (const m of html.matchAll(/<img [^>]*>/gi)) {
      const tag = m[0];
      if (!/\balt=/.test(tag)) issues.push(`${relativeFrom(distDir, file)} image missing alt`);
    }
    for (const m of html.matchAll(/<a ([^>]+)>\s*([^<]*)\s*<\/a>/gi)) {
      const attrs = m[1];
      const text = (m[2] || '').trim();
      const aria = /aria-label=\"([^\"]+)\"/.exec(attrs)?.[1] || '';
      if (!text && !aria) issues.push(`${relativeFrom(distDir, file)} link without text or aria-label`);
    }
  }
  return issues;
}

function statMaybe(p: string) {
  try { return statSync(p); } catch { return null; }
}

function relativeFrom(root: string, p: string) {
  return normalize(p).replace(normalize(root) + '/', '');
}
