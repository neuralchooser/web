import { PlatformSearch } from "@/components/search/platform-search";
import { getAllCategories } from "@/lib/platforms";
import type { AIPlatform } from "@/types/platform";

export async function FilteredPlatformsPage({
  title,
  description,
  platforms,
  eyebrow = "Explore",
}: {
  title: string;
  description: string;
  platforms: AIPlatform[];
  eyebrow?: string;
}) {
  const categories = await getAllCategories();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
      <PlatformSearch platforms={platforms} categories={categories} />
    </section>
  );
}
