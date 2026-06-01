import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PlatformForm } from "@/components/admin/platforms/platform-form";
import { updatePlatformAction } from "@/lib/actions/platform-actions";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listCategories } from "@/lib/repositories/categories-repository";
import { getPlatformById } from "@/lib/repositories/platforms-repository";

export const metadata = {
  title: "Edit Platform",
  robots: { index: false, follow: false },
};

export default async function EditPlatformPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [platform, categories] = await Promise.all([
    getPlatformById(id),
    listCategories(),
  ]);

  if (!platform) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${platform.name}`}
        description="Update platform fields, categories, tags, pricing, and visibility."
      />
      <PlatformForm
        platform={platform}
        categories={categories}
        action={updatePlatformAction.bind(null, platform.id)}
        submitLabel="Save platform"
      />
    </>
  );
}
