"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin-session";
import { updateToolSubmission } from "@/lib/repositories/tool-submissions-repository";
import {
  adminToolSubmissionSchema,
  type AdminToolSubmissionFormValues,
} from "@/lib/validators/admin-tool-submission-schema";
import type { AdminActionState } from "@/types/admin";

function validationError(error: unknown): AdminActionState {
  if (error && typeof error === "object" && "flatten" in error) {
    const flattened = (error as { flatten: () => { fieldErrors: AdminActionState["fieldErrors"] } }).flatten();
    return {
      ok: false,
      message: "Fix the highlighted fields.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  return { ok: false, message: "Unable to validate submission." };
}

function revalidateSubmissionPaths(id: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  revalidatePath(`/admin/submissions/${id}`);
}

export async function updateSubmissionAction(
  id: string,
  input: AdminToolSubmissionFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = adminToolSubmissionSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await updateToolSubmission(id, parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to update submission.",
    };
  }

  revalidateSubmissionPaths(id);
  redirect("/admin/submissions");
}
