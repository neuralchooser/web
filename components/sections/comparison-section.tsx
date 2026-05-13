import Link from "next/link"

import { ComparisonCard } from "@/components/cards/comparison-card"
import { Button } from "@/components/ui/button"
import { getComparisonPairs } from "@/lib/compare"

export function ComparisonSection() {
  const pairs = getComparisonPairs().slice(0, 3)

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Compare models side by side</h2>
          <p className="mt-2 text-muted-foreground">
            See where models differ before you commit to an API, subscription, or deployment path.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/compare">View comparisons</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pairs.map((pair) => (
          <ComparisonCard key={pair.slug} pair={pair} />
        ))}
      </div>
    </section>
  )
}
