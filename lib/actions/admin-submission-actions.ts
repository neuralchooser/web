"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin-session";
import {
  createPlatform,
  updatePlatform,
} from "@/lib/repositories/platforms-repository";
import {
  getToolSubmissionById,
  updateToolSubmission,
} from "@/lib/repositories/tool-submissions-repository";
import { getAllCategories } from "@/lib/services/categories";
import { getPlatformBySlug } from "@/lib/services/platforms";
import {
  adminToolSubmissionSchema,
  type AdminToolSubmissionFormValues,
} from "@/lib/validators/admin-tool-submission-schema";
import type { AdminActionState } from "@/types/admin";

function validationError(error: unknown): AdminActionState {
  if (error && typeof error === "object" && "flatten" in error) {
    const flattened = (
      error as {
        flatten: () => { fieldErrors: AdminActionState["fieldErrors"] };
      }
    ).flatten();
    return {
      ok: false,
      message: "Fix the highlighted fields.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  return { ok: false, message: "Unable to validate submission." };
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-");
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

    if (parsed.data.status === "approved") {
      const submission = await getToolSubmissionById(id);
      if (!submission) {
        return { ok: false, message: "Submission not found after update." };
      }

      const slug = slugify(submission.name);
      const platformInput = {
        slug,
        name: submission.name,
        company: submission.company || submission.name,
        logo: submission.logo,
        accent_color: null as string | null,
        short_description: submission.short_description,
        description: submission.description || submission.short_description,
        website: submission.website,
        documentation: submission.documentation,
        category_ids: submission.categories,
        tags: submission.tags,
        pricing_free: submission.pricing_free,
        pricing_paid: submission.pricing_paid,
        pricing_notes: null as string | null,
        api_available: submission.api_available,
        open_source: submission.open_source,
        featured: false,
        trending: false,
        homepage_sections: [] as string[],
        is_monochrome_logo: false,
        last_updated: new Date().toISOString().slice(0, 10),
      };

      const existing = await getPlatformBySlug(slug);
      if (existing) {
        await updatePlatform(existing.id, platformInput);
        revalidatePath("/");
        revalidatePath("/platforms");
        revalidatePath(`/platforms/${slug}`);
        await revalidateCategorySlugs([
          ...new Set([
            ...existing.categories.map((category) => category.id),
            ...platformInput.category_ids,
          ]),
        ]);
        revalidateTagPaths([
          ...new Set([...(existing.tags ?? []), ...platformInput.tags]),
        ]);
      } else {
        await createPlatform(platformInput);
        revalidatePath("/");
        revalidatePath("/platforms");
        await revalidateCategorySlugs(platformInput.category_ids);
        revalidateTagPaths(platformInput.tags);
      }
    }
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to update submission.",
    };
  }

  redirect("/admin/submissions");
}
