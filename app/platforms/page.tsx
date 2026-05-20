import type { Metadata } from "next";

import { PlatformSearch } from "@/components/search/platform-search";
import { getAllCategories, getAllPlatforms } from "@/lib/platforms";
import { createMetadata } from "@/lib/seo";
import type { AIPlatform } from "@/types/platform";

export const metadata: Metadata = createMetadata({
  title: "AI Platform Directory",
  description:
    "Search and filter modern AI platforms by category, pricing, API access, open-source status, and best-fit workflow.",
  path: "/platforms",
});

export default async function PlatformsPage() {
  const platforms = await getAllPlatforms();
  const categories = await getAllCategories();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">Directory</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Explore AI platforms
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Browse curated AI platforms by workflow, pricing, API access, and
          openness.
        </p>
      </div>
      <PlatformSearch platforms={platforms} categories={categories} />
    </section>
  );
}
