import { supabaseServer } from "@/lib/supabase/server";
import type { PlatformInput } from "@/lib/validators/platform-schema";
import type { PlatformRow } from "@/types/admin";

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
  categories,
  tags,
  pricing_free,
  pricing_paid,
  pricing_notes,
  api_available,
  open_source,
  featured,
  trending,
  last_updated
`;

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

function mapPlatform(row: Record<string, unknown>): PlatformRow {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    company: String(row.company ?? ""),
    logo: row.logo === null ? null : String(row.logo ?? ""),
    accent_color:
      row.accent_color === null ? null : String(row.accent_color ?? ""),
    short_description: String(row.short_description ?? ""),
    description: String(row.description ?? ""),
    website: row.website === null ? null : String(row.website ?? ""),
    documentation:
      row.documentation === null ? null : String(row.documentation ?? ""),
    categories: Array.isArray(row.categories) ? row.categories.map(String) : [],
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    pricing_free: Boolean(row.pricing_free),
    pricing_paid: Boolean(row.pricing_paid),
    pricing_notes:
      row.pricing_notes === null ? null : String(row.pricing_notes ?? ""),
    api_available: Boolean(row.api_available),
    open_source: Boolean(row.open_source),
    featured: Boolean(row.featured),
    trending: Boolean(row.trending),
    last_updated:
      row.last_updated === null ? null : String(row.last_updated ?? ""),
  };
}

export interface PlatformListFilters {
  search?: string;
  category?: string;
  featured?: "all" | "true" | "false";
  trending?: "all" | "true" | "false";
  api?: "all" | "true" | "false";
  openSource?: "all" | "true" | "false";
}

function filterBoolean<T extends PlatformRow>(
  items: T[],
  value: "all" | "true" | "false" | undefined,
  key: keyof T,
) {
  if (!value || value === "all") return items;
  return items.filter((item) => Boolean(item[key]) === (value === "true"));
}

export async function listPlatforms(filters: PlatformListFilters = {}) {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  let platforms = (data ?? []).map(mapPlatform);
  const search = filters.search?.trim().toLowerCase();

  if (search) {
    platforms = platforms.filter((platform) =>
      [
        platform.name,
        platform.slug,
        platform.company,
        platform.short_description,
        platform.description,
        platform.tags.join(" "),
        platform.categories.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }

  if (filters.category && filters.category !== "all") {
    platforms = platforms.filter((platform) =>
      platform.categories.includes(filters.category as string),
    );
  }

  platforms = filterBoolean(platforms, filters.featured, "featured");
  platforms = filterBoolean(platforms, filters.trending, "trending");
  platforms = filterBoolean(platforms, filters.api, "api_available");
  platforms = filterBoolean(platforms, filters.openSource, "open_source");

  return platforms;
}

export async function getPlatformById(id: string) {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ? mapPlatform(data) : null;
}

export async function createPlatform(input: PlatformInput) {
  assertSupabaseConfig();

  const { error } = await supabaseServer.from("platforms").insert(input);
  if (error) throw new Error(error.message);
}

export async function updatePlatform(id: string, input: PlatformInput) {
  assertSupabaseConfig();

  const { error } = await supabaseServer
    .from("platforms")
    .update(input)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deletePlatform(id: string) {
  assertSupabaseConfig();

  const { error } = await supabaseServer
    .from("platforms")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}
