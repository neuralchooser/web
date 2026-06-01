import type {
  AIPlatform,
  PlatformCategory,
  PlatformCategorySlug,
} from "@/types/platform";
import {
  getAllPlatforms as getAllPlatformsFromDb,
  getFeaturedPlatforms as getFeaturedPlatformsFromDb,
  getPlatformBySlug as getPlatformBySlugFromDb,
  getTrendingPlatforms as getTrendingPlatformsFromDb,
} from "@/lib/services/platforms";
import { categories as categoryMetadata } from "@/content/models/categories";

import { getAllCategories as getAllCategoriesFromDb } from "@/lib/services/categories";

export async function getAllPlatforms() {
  return getAllPlatformsFromDb();
}

export async function getPlatformBySlug(slug: string) {
  return getPlatformBySlugFromDb(slug);
}

export async function getFeaturedPlatforms(limit?: number) {
  return getFeaturedPlatformsFromDb(limit);
}

export async function getTrendingPlatforms(limit?: number) {
  return getTrendingPlatformsFromDb(limit);
}

export async function getRecentlyAddedPlatforms(limit?: number) {
  const items = [...(await getAllPlatforms())].sort((a, b) => {
    const left = a.lastUpdated ?? "1900-01-01";
    const right = b.lastUpdated ?? "1900-01-01";
    return right.localeCompare(left);
  });

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export async function getPlatformsByCategory(category: PlatformCategorySlug) {
  return (await getAllPlatforms()).filter((platform) =>
    platform.categories.includes(category),
  );
}

export async function getAllCategories(): Promise<PlatformCategory[]> {
  return getAllCategoriesFromDb();
}

export async function getCategoryBySlug(slug: string) {
  return (await getAllCategoriesFromDb()).find(
    (category) => category.slug === slug,
  );
}

export async function getRelatedPlatforms(platform: AIPlatform, limit = 4) {
  return (await getAllPlatforms())
    .filter((candidate) => candidate.slug !== platform.slug)
    .map((candidate) => ({
      platform: candidate,
      score:
        candidate.categories.filter((category) =>
          platform.categories.includes(category),
        ).length *
          3 +
        (candidate.tags ?? []).filter((tag) =>
          (platform.tags ?? []).includes(tag),
        ).length +
        (candidate.bestFor ?? []).filter((useCase) =>
          (platform.bestFor ?? []).includes(useCase),
        ).length,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.platform.name.localeCompare(b.platform.name),
    )
    .slice(0, limit)
    .map((item) => item.platform);
}

export function formatCategoryName(category: PlatformCategorySlug) {
  return (
    categoryMetadata.find((item) => item.slug === category)?.name ?? category
  );
}
