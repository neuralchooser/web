import { supabaseServer } from "@/lib/supabase/server";
import { getAllPlatforms } from "@/lib/services/platforms";
import type { PlatformAnalytics, PlatformEventType } from "@/types/platform";
import type { AIPlatform } from "@/types/platform";

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

/**
 * Inserts a platform event into the database.
 * Silently ignores errors to not disrupt user experience.
 */
async function trackEvent(platformId: string, eventType: PlatformEventType): Promise<void> {
  try {
    assertSupabaseConfig();
    const { error } = await supabaseServer
      .from("platform_events")
      .insert({
        platform_id: platformId,
        event_type: eventType,
      });

    if (error) {
      console.error(`Failed to track event ${eventType} for platform ${platformId}:`, error.message);
    }
  } catch (err) {
    console.error(`Error in trackEvent for ${eventType}:`, err);
  }
}

export async function trackPlatformView(platformId: string): Promise<void> {
  await trackEvent(platformId, "platform_view");
}

export async function trackWebsiteClick(platformId: string): Promise<void> {
  await trackEvent(platformId, "website_click");
}

export async function trackDocumentationClick(platformId: string): Promise<void> {
  await trackEvent(platformId, "documentation_click");
}

/**
 * Helper to get the count of a specific event type for a platform
 */
async function getEventCount(platformId: string, eventType: PlatformEventType): Promise<number> {
  try {
    assertSupabaseConfig();
    const { count, error } = await supabaseServer
      .from("platform_events")
      .select("*", { count: "exact", head: true })
      .eq("platform_id", platformId)
      .eq("event_type", eventType);

    if (error) {
      console.error(`Error counting ${eventType} for platform ${platformId}:`, error.message);
      return 0;
    }

    return count ?? 0;
  } catch (err) {
    console.error(`Error in getEventCount:`, err);
    return 0;
  }
}

export async function getPlatformViewCount(platformId: string): Promise<number> {
  return getEventCount(platformId, "platform_view");
}

export async function getPlatformWebsiteClickCount(platformId: string): Promise<number> {
  return getEventCount(platformId, "website_click");
}

export async function getPlatformDocumentationClickCount(platformId: string): Promise<number> {
  return getEventCount(platformId, "documentation_click");
}

interface DatabaseEventCountRow {
  platform_id: string;
  event_type: string;
  count: number;
}

interface DatabaseEventRow {
  platform_id: string;
}

/**
 * Fetches event counts (views, website clicks, documentation clicks) for all platforms
 * using the platform_event_counts view.
 */
export async function getPlatformEventCountsMap(): Promise<Record<string, PlatformAnalytics>> {
  try {
    assertSupabaseConfig();
    const { data, error } = await supabaseServer
      .from("platform_event_counts")
      .select("platform_id, event_type, count");

    const countsMap: Record<string, PlatformAnalytics> = {};

    if (error) {
      console.error("Error fetching event counts view:", error.message);
      return countsMap;
    }

    const rows = (data ?? []) as unknown as DatabaseEventCountRow[];
    rows.forEach((row) => {
      const platformId = row.platform_id;
      if (!countsMap[platformId]) {
        countsMap[platformId] = { views: 0, websiteClicks: 0, documentationClicks: 0 };
      }
      const count = Number(row.count ?? 0);
      if (row.event_type === "platform_view") {
        countsMap[platformId].views = count;
      } else if (row.event_type === "website_click") {
        countsMap[platformId].websiteClicks = count;
      } else if (row.event_type === "documentation_click") {
        countsMap[platformId].documentationClicks = count;
      }
    });

    return countsMap;
  } catch (err) {
    console.error("Error in getPlatformEventCountsMap:", err);
    return {};
  }
}

/**
 * Retrieves platforms sorted by views in the last 30 days.
 */
export async function getTrendingPlatformsByViews30Days(limit?: number): Promise<AIPlatform[]> {
  try {
    assertSupabaseConfig();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabaseServer
      .from("platform_events")
      .select("platform_id")
      .eq("event_type", "platform_view")
      .gte("created_at", thirtyDaysAgo.toISOString());

    if (error) {
      console.error("Error fetching trending platforms events:", error.message);
      return [];
    }

    // Aggregate counts in memory
    const counts: Record<string, number> = {};
    const rows = (data ?? []) as unknown as DatabaseEventRow[];
    rows.forEach((row) => {
      counts[row.platform_id] = (counts[row.platform_id] || 0) + 1;
    });

    // Sort platform IDs by view count desc
    const sortedIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    if (sortedIds.length === 0) {
      return [];
    }

    // Fetch platforms
    const allPlatforms = await getAllPlatforms();

    // Map and sort platforms
    const trendingPlatforms = allPlatforms
      .filter((platform) => sortedIds.includes(platform.id))
      .sort((a, b) => sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id));

    return typeof limit === "number" ? trendingPlatforms.slice(0, limit) : trendingPlatforms;
  } catch (err) {
    console.error("Error in getTrendingPlatformsByViews30Days:", err);
    return [];
  }
}
