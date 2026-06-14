import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PlatformForm } from "@/components/admin/platforms/platform-form";
import { updatePlatformAction } from "@/lib/actions/platform-actions";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listCategories } from "@/lib/repositories/categories-repository";
import { getPlatformById } from "@/lib/repositories/platforms-repository";
import {
  getPlatformViewCount,
  getPlatformWebsiteClickCount,
  getPlatformDocumentationClickCount,
} from "@/lib/repositories/analytics-repository";

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
  const [platform, categories, views, websiteClicks, docClicks] = await Promise.all([
    getPlatformById(id),
    listCategories(),
    getPlatformViewCount(id),
    getPlatformWebsiteClickCount(id),
    getPlatformDocumentationClickCount(id),
  ]);

  if (!platform) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${platform.name}`}
        description="Update platform fields, categories, tags, pricing, and visibility."
      />

      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Views</p>
          <p className="mt-2 text-3xl font-semibold font-mono">{views}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Website Clicks</p>
          <p className="mt-2 text-3xl font-semibold font-mono">{websiteClicks}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Documentation Clicks</p>
          <p className="mt-2 text-3xl font-semibold font-mono">{docClicks}</p>
        </div>
      </div>

      <PlatformForm
        platform={platform}
        categories={categories}
        action={updatePlatformAction.bind(null, platform.id)}
        submitLabel="Save platform"
      />
    </>
  );
}
