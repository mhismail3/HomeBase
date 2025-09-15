import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().max(280).optional(),
    hero: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false)
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    draft: z.boolean().default(false)
  })
});

export const collections = { posts, pages };
