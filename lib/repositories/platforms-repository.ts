import { supabaseServer } from "@/lib/supabase/server";
import { mapPlatformRow } from "@/lib/services/platforms";
import type { PlatformInput } from "@/lib/validators/platform-schema";
import type { AIPlatform } from "@/types/platform";

const PLATFORM_SELECT = `
  id,
  slug,
  name,
  company,
  logo,
  accent_color,
  short_description,
  description,
  website,
  documentation,
  tags,
  pricing_free,
  pricing_paid,
  pricing_notes,
  api_available,
  open_source,
  featured,
  is_monochrome_logo,
  trending,
  last_updated,
  is_deleted,
  platform_categories(category:categories(id, slug, name))
`;

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

export interface PlatformListFilters {
  search?: string;
  category?: string;
  featured?: "all" | "true" | "false";
  trending?: "all" | "true" | "false";
  api?: "all" | "true" | "false";
  openSource?: "all" | "true" | "false";
}

function filterBoolean<T extends AIPlatform>(
  items: T[],
  value: "all" | "true" | "false" | undefined,
  key: keyof Pick<
    AIPlatform,
    "featured" | "trending" | "apiAvailable" | "openSource"
  >,
) {
  if (!value || value === "all") return items;
  return items.filter((item) => Boolean(item[key]) === (value === "true"));
}

export async function listPlatforms(filters: PlatformListFilters = {}) {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .is("is_deleted", false)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  let platforms = (data ?? []).map(mapPlatformRow);
  const search = filters.search?.trim().toLowerCase();

  if (search) {
    platforms = platforms.filter((platform) =>
      [
        platform.name,
        platform.slug,
        platform.company,
        platform.shortDescription,
        platform.description,
        (platform.tags ?? []).join(" "),
        platform.categories.map((c) => c.slug).join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }

  if (filters.category && filters.category !== "all") {
    platforms = platforms.filter((platform) =>
      platform.categories.some((c) => c.slug === filters.category),
    );
  }

  platforms = filterBoolean(platforms, filters.featured, "featured");
  platforms = filterBoolean(platforms, filters.trending, "trending");
  platforms = filterBoolean(platforms, filters.api, "apiAvailable");
  platforms = filterBoolean(platforms, filters.openSource, "openSource");

  return platforms;
}

export async function getPlatformById(id: string): Promise<AIPlatform | null> {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .eq("id", id)
    .is("is_deleted", false)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ? mapPlatformRow(data) : null;
}

export async function createPlatform(input: PlatformInput) {
  assertSupabaseConfig();

  const { category_ids, ...platformData } = input;

  const { data, error } = await supabaseServer
    .from("platforms")
    .insert(platformData)
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  if (category_ids.length > 0) {
    const relations = category_ids.map((category_id) => ({
      platform_id: data.id as string,
      category_id,
    }));
    const { error: relError } = await supabaseServer
      .from("platform_categories")
      .insert(relations);
    if (relError) throw new Error(relError.message);
  }
}

export async function updatePlatform(id: string, input: PlatformInput) {
  assertSupabaseConfig();

  const { category_ids, ...platformData } = input;

  const { error } = await supabaseServer
    .from("platforms")
    .update(platformData)
    .eq("id", id);
  if (error) throw new Error(error.message);

  const { error: delError } = await supabaseServer
    .from("platform_categories")
    .delete()
    .eq("platform_id", id);
  if (delError) throw new Error(delError.message);

  if (category_ids.length > 0) {
    const relations = category_ids.map((category_id) => ({
      platform_id: id,
      category_id,
    }));
    const { error: insError } = await supabaseServer
      .from("platform_categories")
      .insert(relations);
    if (insError) throw new Error(insError.message);
  }
}

export async function deletePlatform(id: string) {
  assertSupabaseConfig();

  const { error } = await supabaseServer
    .from("platforms")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export interface PlatformFilters {
  categories?: string[];
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  apiAvailable?: boolean;
  openSource?: boolean;
  pricingFree?: boolean;
}

export async function getPlatforms(filters: PlatformFilters = {}): Promise<Record<string, unknown>[]> {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .is("is_deleted", false)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  let rows = (data ?? []) as unknown as Record<string, unknown>[];

  if (filters.categories?.length) {
    rows = rows.filter((row) => {
      const cats = row.platform_categories;
      return (
        Array.isArray(cats) &&
        cats.some((pc) => {
          const catObj = pc as Record<string, unknown>;
          const category = catObj?.category as Record<string, unknown>;
          return category && filters.categories!.includes(String(category.slug));
        })
      );
    });
  }

  if (filters.tags?.length) {
    rows = rows.filter((row) => {
      const tags = row.tags;
      return Array.isArray(tags) && tags.some((t) => filters.tags!.includes(String(t)));
    });
  }

  if (typeof filters.featured === "boolean") {
    rows = rows.filter((row) => Boolean(row.featured) === filters.featured);
  }

  if (typeof filters.trending === "boolean") {
    rows = rows.filter((row) => Boolean(row.trending) === filters.trending);
  }

  if (typeof filters.apiAvailable === "boolean") {
    rows = rows.filter((row) => Boolean(row.api_available) === filters.apiAvailable);
  }

  if (typeof filters.openSource === "boolean") {
    rows = rows.filter((row) => Boolean(row.open_source) === filters.openSource);
  }

  if (typeof filters.pricingFree === "boolean") {
    rows = rows.filter((row) => Boolean(row.pricing_free) === filters.pricingFree);
  }

  return rows;
}

export async function getAllUniqueTags(): Promise<string[]> {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("platforms")
    .select("tags")
    .is("is_deleted", false)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as Record<string, unknown>[];

  return Array.from(
    new Set(
      rows
        .flatMap((row) => (Array.isArray(row.tags) ? row.tags : []))
        .filter(Boolean)
        .map(String),
    ),
  ).sort((left, right) => left.localeCompare(right));
}

