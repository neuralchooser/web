import { z } from "zod";

import { HOMEPAGE_SECTION_VALUES } from "@/lib/constants/homepage-sections";

const optionalText = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null));

const safeHttpUrl = z
  .string()
  .url("Enter a valid URL")
  .refine((url) => /^https?:\/\//i.test(url), {
    message: "URL must use http or https",
  });

const optionalUrl = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null))
  .pipe(safeHttpUrl.nullable());

const dateString = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null))
  .pipe(
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format")
      .nullable(),
  );

export const platformSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  company: z.string().trim().min(2, "Company must be at least 2 characters"),
  logo: optionalText,
  accent_color: z
    .union([z.string(), z.null()])
    .transform((value) => value ?? "")
    .transform((value) => value.trim())
    .transform((value) => (value.length ? value : null))
    .pipe(
      z
        .string()
        .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Use a hex color such as #111827")
        .nullable(),
    ),
  short_description: z
    .string()
    .trim()
    .min(12, "Short description must be at least 12 characters"),
  description: z
    .string()
    .trim()
    .min(24, "Description must be at least 24 characters"),
  website: optionalUrl,
  documentation: optionalUrl,
  category_ids: z.array(z.string()).min(1, "Choose at least one category"),
  tags: z.array(z.string()).default([]),
  pricing_free: z.boolean().default(false),
  pricing_paid: z.boolean().default(false),
  pricing_notes: optionalText,
  api_available: z.boolean().default(false),
  open_source: z.boolean().default(false),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  homepage_sections: z
    .array(z.enum(HOMEPAGE_SECTION_VALUES as [string, ...string[]]))
    .default([]),
  is_monochrome_logo: z.boolean().default(false),
  last_updated: dateString,
});

export type PlatformFormValues = z.input<typeof platformSchema>;
export type PlatformInput = z.output<typeof platformSchema>;
