import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryForm } from "@/components/admin/categories/category-form";
import { updateCategoryAction } from "@/lib/actions/category-actions";
import { requireAdmin } from "@/lib/auth/admin-session";
import { getCategoryById } from "@/lib/repositories/categories-repository";

export const metadata = {
  title: "Edit Category",
  robots: { index: false, follow: false },
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${category.name}`}
        description="Update category naming, description, and featured state."
      />
      <CategoryForm
        category={category}
        action={updateCategoryAction.bind(null, category.id)}
        submitLabel="Save category"
      />
    </>
  );
}
