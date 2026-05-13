import type { Metadata } from "next"

import { ComparisonCard } from "@/components/cards/comparison-card"
import { createMetadata } from "@/lib/seo"
import { getComparisonPairs } from "@/lib/compare"

export const metadata: Metadata = createMetadata({
  title: "Compare AI Models",
  description: "Compare AI models side by side across pricing, API support, context window, strengths, weaknesses, and best use cases.",
  path: "/compare",
})

export default function ComparePage() {
  const pairs = getComparisonPairs()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">Comparisons</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Compare AI models</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Review tradeoffs across popular model pairs before choosing a product, API, or deployment strategy.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair) => <ComparisonCard key={pair.slug} pair={pair} />)}
      </div>
    </section>
  )
}
