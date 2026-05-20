import Link from "next/link";

import { getAllCategories } from "@/lib/platforms";
import { SiteLogo } from "./site-logo";
import { PlatformCategory } from "@/types/platform";

export async function SiteFooter() {
  const categories = (await getAllCategories()).slice(0, 5);

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <SiteLogo />
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            A curated directory for discovering modern AI platforms by workflow,
            capability, pricing, and product fit.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Explore</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/platforms" className="hover:text-foreground">
              All platforms
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Categories</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {categories.map((category: PlatformCategory) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
