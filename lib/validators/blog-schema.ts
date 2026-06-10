import { z } from "zod";

const optionalText = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null));

export const blogSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  excerpt: z.string().trim().min(5, "Excerpt must be at least 5 characters"),
  content: z.string().trim().min(10, "Content must be at least 10 characters"),
  cover_image: optionalText,
  author: z.string().trim().min(2, "Author must be at least 2 characters"),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  published_at: optionalText,
});

export type BlogFormValues = z.input<typeof blogSchema>;
export type BlogInput = z.output<typeof blogSchema>;
