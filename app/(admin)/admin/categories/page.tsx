import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoriesTable } from "@/components/admin/categories/categories-table";
import { BooleanFilter, SearchFilterBar } from "@/components/admin/search-filter-bar";
import { requireAdmin } from "@/lib/auth/admin-session";
import {
  listCategories,
  type CategoryListFilters,
} from "@/lib/repositories/categories-repository";

export const metadata = {
  title: "Admin Categories",
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const filters: CategoryListFilters = {
    search: firstParam(params.search),
    featured: firstParam(params.featured) as CategoryListFilters["featured"],
  };
  const categories = await listCategories(filters);

  return (
    <>
      <AdminPageHeader
        title="Categories"
        description="Create, update, search, and remove category records."
        action={{ href: "/admin/categories/new", label: "New category" }}
      />
      <SearchFilterBar search={filters.search}>
        <BooleanFilter name="featured" value={filters.featured} label="Featured" />
      </SearchFilterBar>
      <CategoriesTable categories={categories} />
    </>
  );
}
