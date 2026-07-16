import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PlatformSearch } from "@/components/search/platform-search";
import { getAllCategories, getAllPlatforms } from "@/lib/platforms";
import { createMetadata } from "@/lib/seo";
import type { PlatformCategory } from "@/types/platform";

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: PlatformCategory) => ({
    category: category.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/categories/[category]">,
): Promise<Metadata> {
  const { category: slug } = await props.params;
  const categories = await getAllCategories();
  const category = categories.find((category) => category.slug === slug);

  if (!category)
    return createMetadata({
      title: "Category not found",
      path: `/categories/${slug}`,
    });

  return createMetadata({
    title: category.name,
    description: category.name,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage(
  props: PageProps<"/categories/[category]">,
) {
  const { category: slug } = await props.params;
  const categories = await getAllCategories();
  const category = categories.find((category) => category.slug === slug);

  if (!category) notFound();

  const platforms = await getAllPlatforms();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">Category</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {category.description}
        </p>
      </div>
      <PlatformSearch
        platforms={platforms}
        categories={categories}
        initialCategory={category.slug}
      />
    </section>
  );
}
