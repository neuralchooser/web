import type { MetadataRoute } from "next";

import { getAllCategories, getAllPlatforms } from "@/lib/platforms";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const platforms = await getAllPlatforms();
  const staticRoutes = ["", "/platforms", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }));

  const platformRoutes = platforms.map((platform) => ({
    url: `${siteConfig.url}/platforms/${platform.slug}`,
    lastModified: platform.lastUpdated ? new Date(platform.lastUpdated) : now,
  }));

  const categories = await getAllCategories();
  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...platformRoutes, ...categoryRoutes];
}
