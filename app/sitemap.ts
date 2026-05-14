import type { MetadataRoute } from "next"

import { getAllCategories, getAllPlatforms } from "@/lib/platforms"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ["", "/platforms", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }))

  const platformRoutes = getAllPlatforms().map((platform) => ({
    url: `${siteConfig.url}/platforms/${platform.slug}`,
    lastModified: platform.lastUpdated ? new Date(platform.lastUpdated) : now,
  }))

  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: now,
  }))

  return [...staticRoutes, ...platformRoutes, ...categoryRoutes]
}
