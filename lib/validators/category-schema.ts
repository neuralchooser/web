import { z } from "zod";

const optionalText = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null));

export const categorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  description: optionalText,
  featured: z.boolean().default(false),
});

export type CategoryFormValues = z.input<typeof categorySchema>;
export type CategoryInput = z.output<typeof categorySchema>;
