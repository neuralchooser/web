"use server";

import { submitToolService } from "@/lib/services/tool-submissions";
import {
  toolSubmissionSchema,
  type ToolSubmissionFormValues,
} from "@/lib/validators/tool-submission-schema";

export interface SubmissionActionState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

function validationError(error: unknown): SubmissionActionState {
  if (error && typeof error === "object" && "flatten" in error) {
    const flattened = (error as { flatten: () => { fieldErrors: SubmissionActionState["fieldErrors"] } }).flatten();
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  return { ok: false, message: "Unable to validate tool submission." };
}

export async function submitToolAction(
  input: ToolSubmissionFormValues,
): Promise<SubmissionActionState> {
  const parsed = toolSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    await submitToolService(parsed.data);
    return { ok: true, message: "Submission received successfully." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to submit your tool.",
    };
  }
}
