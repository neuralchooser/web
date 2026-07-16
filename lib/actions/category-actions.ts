"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/repositories/categories-repository";
import { requireAdmin } from "@/lib/auth/admin-session";
import {
  categorySchema,
  type CategoryFormValues,
} from "@/lib/validators/category-schema";
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

  return { ok: false, message: "Unable to validate category." };
}

function revalidateCategoryPaths(slug?: string | null) {
  revalidatePath("/", "layout");
  revalidatePath("/platforms", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/admin/categories", "layout");
  revalidatePath("/explore", "layout");
  if (slug) {
    revalidatePath(`/categories/${slug}`, "layout");
  }
}

export async function createCategoryAction(
  input: CategoryFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await createCategory(parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to create category.",
    };
  }

  revalidateCategoryPaths(parsed.data.slug);
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  id: string,
  input: CategoryFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await updateCategory(id, parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to update category.",
    };
  }

  revalidateCategoryPaths(parsed.data.slug);
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string): Promise<AdminActionState> {
  await requireAdmin();

  try {
    await deleteCategory(id);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to delete category.",
    };
  }

  revalidateCategoryPaths();
  return { ok: true };
}
