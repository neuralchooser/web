"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin-session";
import {
  createPlatform,
  deletePlatform,
  updatePlatform,
} from "@/lib/repositories/platforms-repository";
import {
  platformSchema,
  type PlatformFormValues,
} from "@/lib/validators/platform-schema";
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

  return { ok: false, message: "Unable to validate platform." };
}

function revalidatePlatformPaths(slug?: string | null) {
  revalidatePath("/", "layout");
  revalidatePath("/platforms", "layout");
  revalidatePath("/blog", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/admin/platforms", "layout");
  revalidatePath("/explore", "layout");
  if (slug) {
    revalidatePath(`/platforms/${slug}`, "layout");
    revalidatePath(`/categories/${slug}`, "layout");
  }
}

export async function createPlatformAction(
  input: PlatformFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = platformSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await createPlatform(parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to create platform.",
    };
  }

  revalidatePlatformPaths(parsed.data.slug);
  redirect("/admin/platforms");
}

export async function updatePlatformAction(
  id: string,
  input: PlatformFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = platformSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await updatePlatform(id, parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to update platform.",
    };
  }

  revalidatePlatformPaths(parsed.data.slug);
  redirect("/admin/platforms");
}

export async function deletePlatformAction(id: string): Promise<AdminActionState> {
  await requireAdmin();

  try {
    await deletePlatform(id);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to delete platform.",
    };
  }

  revalidatePlatformPaths();
  return { ok: true };
}
