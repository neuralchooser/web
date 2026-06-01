import { cache } from "react";

import { getCategories } from "@/lib/repositories/categories-repository";
import {
  getAllUniqueTags,
  getPlatforms,
} from "@/lib/repositories/platforms-repository";
import { mapPlatformRow } from "@/lib/services/platforms";

export type SEOPageType = "category" | "tag";

export interface SEOPlatformFilters {
  type: string;
  slug: string;
}

export const getSEOPlatforms = cache(async function getSEOPlatforms({
  type,
  slug,
}: SEOPlatformFilters) {
  if (type === "category") {
    const categories = await getCategories();

    if (!categories.some((category) => category.slug === slug)) {
      return null;
    }

    const platforms = await getPlatforms({ categories: [slug] });
    return platforms.map(mapPlatformRow);
  }

  if (type === "tag") {
    const tags = await getAllUniqueTags();

    if (!tags.includes(slug)) {
      return null;
    }

    const platforms = await getPlatforms({ tags: [slug] });
    return platforms.map(mapPlatformRow);
  }

  return null;
});
