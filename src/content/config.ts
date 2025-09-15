import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().max(280).optional(),
    hero: z.string().optional(),
    // Portfolio metadata (optional; shown when tags include 'portfolio')
    dateRange: z.string().optional(),
    hours: z.string().optional(),
    tech: z.array(z.string()).optional(),
    order: z.number().optional(),
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
