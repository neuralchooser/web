import type { Metadata } from "next"

import { ModelSearch } from "@/components/search/model-search"
import { createMetadata } from "@/lib/seo"
import { getAllCategories, getAllModels } from "@/lib/models"

export const metadata: Metadata = createMetadata({
  title: "AI Model Directory",
  description: "Search and filter modern AI models by category, pricing, API access, open-source status, and local deployment.",
  path: "/models",
})

export default function ModelsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">Directory</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Explore AI models</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Filter the catalog by workflow, pricing, openness, API support, and deployment constraints.
        </p>
      </div>
      <ModelSearch models={getAllModels()} categories={getAllCategories()} />
    </section>
  )
}
