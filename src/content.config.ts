// content.config.ts — Astro content collections.
// The "blog" collection powers Barndo Buzz. Add a post by dropping a markdown
// file into src/content/blog/ with the frontmatter below; the index and the
// [slug] pages pick it up automatically.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    image: z.string().optional(), //   hero image slot — undefined renders a placeholder
    youtube: z.string().optional(), // optional tour/video, embedded on the post page
  }),
});

export const collections = { blog };
