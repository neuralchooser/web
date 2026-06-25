import { supabaseServer } from "@/lib/supabase/server";
import type { PlatformCategory } from "@/types/platform";

function assertSupabaseConfig() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables",
    );
  }
}

function mapCategoryRow(row: Record<string, unknown>): PlatformCategory {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    description: String(row.description ?? ""),
    featured: Boolean(row.featured ?? false),
  };
}

const CATEGORY_SELECT = `
  id,
  slug,
  name,
  description,
  featured
`;

export async function getAllCategories(): Promise<PlatformCategory[]> {
  assertSupabaseConfig();
  const { data, error } = await supabaseServer
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapCategoryRow);
}
