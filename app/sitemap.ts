import type { MetadataRoute } from "next";

import { getAllUniqueTags } from "@/lib/repositories/platforms-repository";
import { getAllCategories, getAllPlatforms } from "@/lib/platforms";
import { getPublishedBlogs } from "@/lib/services/blogs";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [platforms, categories, blogs, tags] = await Promise.all([
    getAllPlatforms(),
    getAllCategories(),
    getPublishedBlogs(),
    getAllUniqueTags(),
  ]);

  const staticRoutes = [
    "",
    "/platforms",
    "/about",
    "/blog",
    "/contact",
    "/submit",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }));

  const platformRoutes = platforms.map((platform) => ({
    url: `${siteConfig.url}/platforms/${platform.slug}`,
    lastModified: platform.lastUpdated ? new Date(platform.lastUpdated) : now,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: now,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: blog.publishedAt ? new Date(blog.publishedAt) : now,
  }));

  // Tag explore pages only. Category explore pages are canonicalized to
  // /categories/[slug], so they are intentionally left out to avoid duplicates.
  const tagRoutes = tags.map((tag) => ({
    url: `${siteConfig.url}/explore/tag/${tag}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...platformRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...tagRoutes,
  ];
}
