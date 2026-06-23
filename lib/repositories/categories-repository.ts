import { supabaseServer } from "@/lib/supabase/server";
import type { CategoryInput } from "@/lib/validators/category-schema";
import type { CategoryRow } from "@/types/admin";

const CATEGORY_SELECT = "id, slug, name, featured, is_active, description";

function assertSupabaseConfig() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY environment variables",
    );
  }
}

function mapCategory(row: Record<string, unknown>): CategoryRow {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    featured: Boolean(row.featured),
    is_active: Boolean(row.is_active ?? true),
    description:
      row.description === null ? null : String(row.description ?? ""),
  };
}

export interface CategoryListFilters {
  search?: string;
  featured?: "all" | "true" | "false";
}

export async function listCategories(filters: CategoryListFilters = {}) {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("categories")
    .select(CATEGORY_SELECT)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  let categories = (data ?? []).map(mapCategory);
  const search = filters.search?.trim().toLowerCase();

  if (search) {
    categories = categories.filter((category) =>
      [category.name, category.slug, category.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }

  if (filters.featured === "true") {
    categories = categories.filter((category) => category.featured);
  }

  if (filters.featured === "false") {
    categories = categories.filter((category) => !category.featured);
  }

  return categories;
}

export async function getCategories() {
  return listCategories();
}

export async function getCategoryById(id: string) {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ? mapCategory(data) : null;
}

export async function createCategory(input: CategoryInput) {
  assertSupabaseConfig();

  const { error } = await supabaseServer.from("categories").insert(input);
  if (error) throw new Error(error.message);
}

export async function updateCategory(id: string, input: CategoryInput) {
  assertSupabaseConfig();

  const { error } = await supabaseServer
    .from("categories")
    .update(input)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteCategory(id: string) {
  assertSupabaseConfig();

  const { error } = await supabaseServer
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}
