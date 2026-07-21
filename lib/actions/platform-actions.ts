"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin-session";
import {
  createPlatform,
  deletePlatform,
  getPlatformById,
  updatePlatform,
} from "@/lib/repositories/platforms-repository";
import { getAllCategories } from "@/lib/services/categories";
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

async function revalidateCategorySlugs(categoryIds: string[]) {
  if (!categoryIds.length) return;
  const ids = new Set(categoryIds);
  const categories = await getAllCategories();
  for (const category of categories) {
    if (ids.has(category.id)) {
      revalidatePath(`/categories/${category.slug}`);
      revalidatePath(`/explore/category/${category.slug}`);
    }
  }
}

function revalidateTagPaths(tags: string[]) {
  for (const tag of tags) {
    revalidatePath(`/explore/tag/${tag}`);
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

  revalidatePath("/");
  revalidatePath("/platforms");
  await revalidateCategorySlugs(parsed.data.category_ids);
  revalidateTagPaths(parsed.data.tags);
  redirect("/admin/platforms");
}

export async function updatePlatformAction(
  id: string,
  input: PlatformFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = platformSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  const previous = await getPlatformById(id);

  try {
    await updatePlatform(id, parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to update platform.",
    };
  }

  revalidatePath("/");
  revalidatePath("/platforms");
  revalidatePath(`/platforms/${parsed.data.slug}`);
  if (previous && previous.slug !== parsed.data.slug) {
    revalidatePath(`/platforms/${previous.slug}`);
  }
  await revalidateCategorySlugs([
    ...new Set([
      ...(previous?.categories.map((category) => category.id) ?? []),
      ...parsed.data.category_ids,
    ]),
  ]);
  revalidateTagPaths([
    ...new Set([...(previous?.tags ?? []), ...parsed.data.tags]),
  ]);
  redirect("/admin/platforms");
}

export async function deletePlatformAction(id: string): Promise<AdminActionState> {
  await requireAdmin();

  const existing = await getPlatformById(id);

  try {
    await deletePlatform(id);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to delete platform.",
    };
  }

  revalidatePath("/");
  revalidatePath("/platforms");
  if (existing) {
    revalidatePath(`/platforms/${existing.slug}`);
    await revalidateCategorySlugs(existing.categories.map((category) => category.id));
    revalidateTagPaths(existing.tags ?? []);
  }

  return { ok: true };
}
