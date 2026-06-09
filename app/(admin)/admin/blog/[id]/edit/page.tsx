import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogForm } from "@/components/admin/blog/blog-form";
import { updateBlogAction } from "@/lib/actions/blog-actions";
import { requireAdmin } from "@/lib/auth/admin-session";
import { getBlogById } from "@/lib/repositories/blogs-repository";

export const metadata = {
  title: "Edit Blog Post",
  robots: { index: false, follow: false },
};

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${blog.title}`}
        description="Update the blog post content and settings."
      />
      <BlogForm
        blog={blog}
        action={updateBlogAction.bind(null, blog.id)}
        submitLabel="Save blog post"
      />
    </>
  );
}
