import { supabaseServer } from "@/lib/supabase/server";
import type { AIPlatform, PlatformCategory } from "@/types/platform";

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
  trending,
  homepage_sections,
  is_monochrome_logo,
  last_updated,
  is_deleted,
  platform_categories(category:categories(id, slug, name))
`;

export function mapPlatformRow(row: Record<string, unknown>): AIPlatform {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    company: String(row.company ?? ""),
    logo: row.logo === null ? undefined : String(row.logo ?? ""),
    accentColor:
      row.accent_color === null ? undefined : String(row.accent_color ?? ""),
    shortDescription: String(row.short_description ?? ""),
    description: String(row.description ?? ""),
    website: row.website === null ? undefined : String(row.website ?? ""),
    documentation:
      row.documentation === null ? undefined : String(row.documentation ?? ""),
    categories: Array.isArray(row.platform_categories)
      ? (row.platform_categories as Array<{ category: { id: string; slug: string; name: string } | null }>)
          .filter((pc) => pc.category)
          .map((pc): PlatformCategory => ({
            id: pc.category!.id,
            slug: pc.category!.slug,
            name: pc.category!.name,
          }))
      : [],
    tags: Array.isArray(row.tags)
      ? row.tags.filter(Boolean).map(String)
      : undefined,
    pricing: {
      free: Boolean(row.pricing_free),
      paid: Boolean(row.pricing_paid),
      notes:
        row.pricing_notes === null
          ? undefined
          : String(row.pricing_notes ?? ""),
    },
    apiAvailable: Boolean(row.api_available),
    openSource: Boolean(row.open_source),
    featured: Boolean(row.featured),
    trending: Boolean(row.trending),
    homepageSections: Array.isArray(row.homepage_sections)
      ? row.homepage_sections.filter(Boolean).map(String)
      : [],
    isMonochromeLogo: Boolean(row.is_monochrome_logo),
    lastUpdated:
      row.last_updated === null ? undefined : String(row.last_updated ?? ""),
  };
}

export async function getAllPlatforms(): Promise<AIPlatform[]> {
  assertSupabaseConfig();
  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .is("is_deleted", false)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapPlatformRow);
}

export async function getPlatformBySlug(
  slug: string,
): Promise<AIPlatform | null> {
  assertSupabaseConfig();
  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .eq("slug", slug)
    .is("is_deleted", false)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapPlatformRow(data) : null;
}

export async function getFeaturedPlatforms(
  limit?: number,
): Promise<AIPlatform[]> {
  assertSupabaseConfig();
  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .eq("featured", true)
    .is("is_deleted", false)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const platforms = (data ?? []).map(mapPlatformRow);
  return typeof limit === "number" ? platforms.slice(0, limit) : platforms;
}

export async function getTrendingPlatforms(
  limit?: number,
): Promise<AIPlatform[]> {
  assertSupabaseConfig();
  const { data, error } = await supabaseServer
    .from("platforms")
    .select(PLATFORM_SELECT)
    .or("trending.eq.true,featured.eq.true")
    .is("is_deleted", false)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const platforms = (data ?? []).map(mapPlatformRow);
  return typeof limit === "number" ? platforms.slice(0, limit) : platforms;
}
