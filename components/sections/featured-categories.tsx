import { CategoryCard } from "@/components/cards/category-card"
import { getAllCategories, getModelsByCategory } from "@/lib/models"

export function FeaturedCategories() {
  const categories = getAllCategories().filter((category) => category.featured)

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">
          Start with the workflow, then narrow down by pricing, deployment, and capabilities.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            count={getModelsByCategory(category.slug).length}
          />
        ))}
      </div>
    </section>
  )
}
