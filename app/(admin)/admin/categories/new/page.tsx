import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryForm } from "@/components/admin/categories/category-form";
import { createCategoryAction } from "@/lib/actions/category-actions";
import { requireAdmin } from "@/lib/auth/admin-session";

export const metadata = {
  title: "New Category",
  robots: { index: false, follow: false },
};

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <>
      <AdminPageHeader
        title="New category"
        description="Add a category for platform classification and filtering."
      />
      <CategoryForm action={createCategoryAction} submitLabel="Create category" />
    </>
  );
}
