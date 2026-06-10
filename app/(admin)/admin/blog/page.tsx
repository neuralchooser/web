import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogTable } from "@/components/admin/blog/blog-table";
import { BooleanFilter, SearchFilterBar } from "@/components/admin/search-filter-bar";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listBlogs } from "@/lib/repositories/blogs-repository";

export const metadata = {
  title: "Admin Blogs",
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const blogs = await listBlogs({
    search: firstParam(params.search),
    published: parseBoolean(firstParam(params.published)),
    featured: parseBoolean(firstParam(params.featured)),
  });

  return (
    <>
      <AdminPageHeader
        title="Blogs"
        description="Create, edit, and manage blog posts."
        action={{ href: "/admin/blog/new", label: "New blog post" }}
      />
      <SearchFilterBar search={firstParam(params.search)}>
        <BooleanFilter name="published" value={firstParam(params.published)} label="Published" />
        <BooleanFilter name="featured" value={firstParam(params.featured)} label="Featured" />
      </SearchFilterBar>
      <BlogTable blogs={blogs} />
    </>
  );
}
