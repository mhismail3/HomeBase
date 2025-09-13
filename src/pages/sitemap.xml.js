export async function GET({ site }) {
  // Do not use leading slashes so base path is preserved
  const pages = [
    '',
    'about/',
    'feed.xml'
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    pages.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('') +
    `</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
