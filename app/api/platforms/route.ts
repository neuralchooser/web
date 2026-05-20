import { NextResponse } from "next/server";
import { getAllPlatforms } from "@/lib/services/platforms";
import type { PlatformCategorySlug } from "@/types/platform";

function normalizeBoolean(value: string | null): boolean {
  return value === "true" || value === "1";
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get(
      "category",
    ) as PlatformCategorySlug | null;
    const pricing = url.searchParams.get("pricing");
    const openSource = url.searchParams.get("openSource");
    const apiAvailable = url.searchParams.get("apiAvailable");
    const search = url.searchParams.get("search");

    let platforms = await getAllPlatforms();

    if (category) {
      platforms = platforms.filter((platform) =>
        platform.categories.includes(category),
      );
    }

    if (pricing === "free") {
      platforms = platforms.filter((platform) => platform.pricing.free);
    } else if (pricing === "paid") {
      platforms = platforms.filter((platform) => platform.pricing.paid);
    }

    if (openSource !== null) {
      platforms = platforms.filter(
        (platform) => platform.openSource === normalizeBoolean(openSource),
      );
    }

    if (apiAvailable !== null) {
      platforms = platforms.filter(
        (platform) => platform.apiAvailable === normalizeBoolean(apiAvailable),
      );
    }

    if (search) {
      const query = search.toLowerCase();
      platforms = platforms.filter((platform) => {
        const properties = [
          platform.name,
          platform.company,
          platform.shortDescription,
          platform.description,
        ]
          .join(" ")
          .toLowerCase();
        const tags = (platform.tags ?? []).join(" ").toLowerCase();
        const categorySlugs = platform.categories.join(" ").toLowerCase();
        return (
          properties.includes(query) ||
          tags.includes(query) ||
          categorySlugs.includes(query)
        );
      });
    }

    return NextResponse.json(platforms);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load platforms",
      },
      { status: 500 },
    );
  }
}
