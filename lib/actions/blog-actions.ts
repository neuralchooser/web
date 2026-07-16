"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin-session";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "@/lib/repositories/blogs-repository";
import {
  blogSchema,
  type BlogFormValues,
} from "@/lib/validators/blog-schema";
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

  return { ok: false, message: "Unable to validate blog post." };
}

function revalidateBlogPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/blog", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/admin/blog", "layout");
}

export async function createBlogAction(
  input: BlogFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await createBlog(parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to create blog post.",
    };
  }

  revalidateBlogPaths();
  redirect("/admin/blog");
}

export async function updateBlogAction(
  id: string,
  input: BlogFormValues,
): Promise<AdminActionState> {
  await requireAdmin();

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await updateBlog(id, parsed.data);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to update blog post.",
    };
  }

  revalidateBlogPaths();
  redirect("/admin/blog");
}

export async function deleteBlogAction(id: string): Promise<AdminActionState> {
  await requireAdmin();

  try {
    await deleteBlog(id);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to delete blog post.",
    };
  }

  revalidateBlogPaths();
  return { ok: true };
}
