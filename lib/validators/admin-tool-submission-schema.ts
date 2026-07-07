import { z } from "zod";

import { toolSubmissionSchema } from "@/lib/validators/tool-submission-schema";

export const adminToolSubmissionSchema = toolSubmissionSchema.extend({
  status: z.enum(["pending", "approved", "rejected"]),
});

export type AdminToolSubmissionFormValues = z.input<
  typeof adminToolSubmissionSchema
>;
export type AdminToolSubmissionInput = z.output<typeof adminToolSubmissionSchema>;
