import { z } from "zod";

const optionalText = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null));

const optionalUrl = z
  .union([z.string(), z.null()])
  .transform((value) => value ?? "")
  .transform((value) => value.trim())
  .transform((value) => (value.length ? value : null))
  .pipe(z.string().url("Enter a valid URL").nullable());

export const toolSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Tool name must be at least 2 characters"),
  website: z.string().trim().min(1, "Website URL is required").url("Enter a valid website URL"),
  company: optionalText,
  short_description: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters"),
  description: optionalText,
  categories: z.array(z.string()).min(1, "Choose at least one category"),
  tags: z.array(z.string()).default([]),
  founder_email: z.string().trim().min(1, "Founder email is required").email("Enter a valid email address"),
  documentation: optionalUrl,
  pricing_free: z.boolean().default(false),
  pricing_paid: z.boolean().default(false),
  api_available: z.boolean().default(false),
  open_source: z.boolean().default(false),
});

export type ToolSubmissionFormValues = z.input<typeof toolSubmissionSchema>;
export type ToolSubmissionInput = z.output<typeof toolSubmissionSchema>;
