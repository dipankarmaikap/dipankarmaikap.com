import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const category = defineCollection({
  // Load Markdown and MDX files in the `src/content/category/` directory.
  loader: glob({ base: "./src/content/category", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});
const post = defineCollection({
  // Load Markdown and MDX files in the `src/content/post/` directory.
  loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).nonempty(),
    category: z
      .string()
      .regex(
        /^[a-z0-9-]+$/,
        "Must be lowercase, no spaces, and only letters, numbers, or hyphens",
      ),
    draft: z.boolean().default(false),
  }),
});

export const collections = { category, post };
