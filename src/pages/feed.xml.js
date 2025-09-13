import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: 'Home Base',
    description: 'Minimal, content‑first posts',
    site: context.site,
    items: posts.map((post) => ({
      // Do not prefix with leading slash so `site` base is respected
      link: `posts/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary
    }))
  });
}
