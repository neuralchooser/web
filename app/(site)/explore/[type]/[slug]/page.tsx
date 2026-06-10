import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FilteredPlatformsPage } from "@/components/listings/filtered-platforms-page";
import { getCategories } from "@/lib/repositories/categories-repository";
import { getAllUniqueTags } from "@/lib/repositories/platforms-repository";
import { createMetadata } from "@/lib/seo";
import { getSEOPlatforms } from "@/lib/services/seo-platforms";

function formatSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createSEOCopy(type: string, slug: string) {
  const label = formatSlug(slug);

  if (type === "category") {
    return {
      title: `${label} AI Tools`,
      description: `Compare the best ${label.toLowerCase()} AI tools by pricing, API access, open-source status, and workflow fit.`,
      eyebrow: "Category",
    };
  }

  if (type === "tag") {
    return {
      title: `${label} AI Tools`,
      description: `Explore AI tools tagged ${label.toLowerCase()} and filter them by pricing, API access, categories, and openness.`,
      eyebrow: "Tag",
    };
  }

  return {
    title: "AI Tools",
    description:
      "Explore AI tools by category, tag, pricing, API access, and openness.",
    eyebrow: "Explore",
  };
}

export async function generateStaticParams() {
  const [categories, tags] = await Promise.all([
    getCategories(),
    getAllUniqueTags(),
  ]);

  return [
    ...categories.map((category) => ({
      type: "category",
      slug: category.slug,
    })),
    ...tags.map((tag) => ({
      type: "tag",
      slug: tag,
    })),
  ];
}

export async function generateMetadata(
  props: PageProps<"/explore/[type]/[slug]">,
): Promise<Metadata> {
  const { type, slug } = await props.params;
  const platforms = await getSEOPlatforms({ type, slug });

  if (!platforms) {
    return createMetadata({
      title: "AI tools not found",
      path: `/explore/${type}/${slug}`,
    });
  }

  const copy = createSEOCopy(type, slug);

  return createMetadata({
    title: copy.title,
    description: copy.description,
    path: `/explore/${type}/${slug}`,
  });
}

export default async function Page(props: PageProps<"/explore/[type]/[slug]">) {
  const { type, slug } = await props.params;
  const platforms = await getSEOPlatforms({ type, slug });

  if (!platforms) notFound();

  const copy = createSEOCopy(type, slug);

  return (
    <FilteredPlatformsPage
      title={copy.title}
      description={copy.description}
      eyebrow={copy.eyebrow}
      platforms={platforms}
    />
  );
}
