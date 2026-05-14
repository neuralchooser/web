import { categories } from "@/content/models/categories";
import { platforms } from "@/content/platforms/platforms";
import type { AIPlatform, PlatformCategory } from "@/types/platform";

export function getAllPlatforms() {
  return [...platforms].sort((a, b) => a.name.localeCompare(b.name));
}

export function getPlatformBySlug(slug: string) {
  return platforms.find((platform) => platform.slug === slug);
}

export function getFeaturedPlatforms(limit?: number) {
  const items = platforms.filter((platform) => platform.featured);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getTrendingPlatforms(limit?: number) {
  const items = platforms.filter((platform) => platform.trending || platform.featured);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getRecentlyAddedPlatforms(limit?: number) {
  const items = [...platforms].sort((a, b) => {
    const left = a.lastUpdated ?? "1900-01-01";
    const right = b.lastUpdated ?? "1900-01-01";
    return right.localeCompare(left);
  });

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getPlatformsByCategory(category: PlatformCategory) {
  return platforms.filter((platform) => platform.categories.includes(category));
}

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getRelatedPlatforms(platform: AIPlatform, limit = 4) {
  return platforms
    .filter((candidate) => candidate.slug !== platform.slug)
    .map((candidate) => ({
      platform: candidate,
      score:
        candidate.categories.filter((category) => platform.categories.includes(category)).length * 3 +
        (candidate.tags ?? []).filter((tag) => (platform.tags ?? []).includes(tag)).length +
        (candidate.bestFor ?? []).filter((useCase) => (platform.bestFor ?? []).includes(useCase)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.platform.name.localeCompare(b.platform.name))
    .slice(0, limit)
    .map((item) => item.platform);
}

export function formatCategoryName(category: PlatformCategory) {
  return getCategoryBySlug(category)?.name ?? category;
}
