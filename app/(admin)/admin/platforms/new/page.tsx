import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PlatformForm } from "@/components/admin/platforms/platform-form";
import { createPlatformAction } from "@/lib/actions/platform-actions";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listCategories } from "@/lib/repositories/categories-repository";

export const metadata = {
  title: "New Platform",
  robots: { index: false, follow: false },
};

export default async function NewPlatformPage() {
  await requireAdmin();
  const categories = await listCategories();

  return (
    <>
      <AdminPageHeader
        title="New platform"
        description="Add a platform to the public directory."
      />
      <PlatformForm
        categories={categories}
        action={createPlatformAction}
        submitLabel="Create platform"
      />
    </>
  );
}
