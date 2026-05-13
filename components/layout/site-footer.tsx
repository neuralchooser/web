import Link from "next/link"

import { getAllCategories } from "@/lib/models"

export function SiteFooter() {
  const categories = getAllCategories().slice(0, 5)

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-semibold tracking-tight">NeuralChooser</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            A data-driven directory for evaluating modern AI models by workflow,
            capability, pricing, and deployment fit.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Explore</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/models" className="hover:text-foreground">All models</Link>
            <Link href="/compare" className="hover:text-foreground">Compare</Link>
            <Link href="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Categories</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="hover:text-foreground">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
