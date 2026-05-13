import type { MetadataRoute } from "next"

import { getComparisonPairs } from "@/lib/compare"
import { getAllCategories, getAllModels } from "@/lib/models"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ["", "/models", "/compare", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }))

  const modelRoutes = getAllModels().map((model) => ({
    url: `${siteConfig.url}/models/${model.slug}`,
    lastModified: model.lastUpdated ? new Date(model.lastUpdated) : now,
  }))

  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: now,
  }))

  const comparisonRoutes = getComparisonPairs().map((pair) => ({
    url: `${siteConfig.url}/compare/${pair.slug}`,
    lastModified: now,
  }))

  return [...staticRoutes, ...modelRoutes, ...categoryRoutes, ...comparisonRoutes]
}
