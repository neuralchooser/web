import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogForm } from "@/components/admin/blog/blog-form";
import { createBlogAction } from "@/lib/actions/blog-actions";
import { requireAdmin } from "@/lib/auth/admin-session";

export const metadata = {
  title: "New Blog Post",
  robots: { index: false, follow: false },
};

export default async function NewBlogPage() {
  await requireAdmin();

  return (
    <>
      <AdminPageHeader
        title="New blog post"
        description="Write a new blog post using Markdown."
      />
      <BlogForm action={createBlogAction} submitLabel="Create blog post" />
    </>
  );
}
