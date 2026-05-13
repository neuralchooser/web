import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getComparisonBySlug, getComparisonPairs } from "@/lib/compare"
import { createMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return getComparisonPairs().map((pair) => ({ slug: pair.slug }))
}

export async function generateMetadata(props: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const pair = getComparisonBySlug(slug)

  if (!pair) return createMetadata({ title: "Comparison not found", path: `/compare/${slug}` })

  const [left, right] = pair.models
  return createMetadata({
    title: `${left.name} vs ${right.name}`,
    description: `Compare ${left.name} and ${right.name} by pricing, strengths, weaknesses, context, API access, and best use cases.`,
    path: `/compare/${pair.slug}`,
  })
}

export default async function CompareDetailPage(props: PageProps<"/compare/[slug]">) {
  const { slug } = await props.params
  const pair = getComparisonBySlug(slug)

  if (!pair) notFound()

  const [left, right] = pair.models
  const rows = [
    ["Company", left.company, right.company],
    ["Pricing", left.pricing.startingPrice ?? left.pricing.type, right.pricing.startingPrice ?? right.pricing.type],
    ["API support", left.apiAvailable ? "Available" : "Unavailable", right.apiAvailable ? "Available" : "Unavailable"],
    ["Open source", left.openSource ? "Yes" : "No", right.openSource ? "Yes" : "No"],
    ["Local runnable", left.localRunnable ? "Yes" : "No", right.localRunnable ? "Yes" : "No"],
    ["Context window", left.contextWindow ? `${left.contextWindow.toLocaleString()} tokens` : "Not listed", right.contextWindow ? `${right.contextWindow.toLocaleString()} tokens` : "Not listed"],
    ["Speed", left.speed ?? "Not listed", right.speed ?? "Not listed"],
  ]

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Comparison</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {left.name} vs {right.name}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A practical comparison of pricing, deployment, context, strengths, weaknesses, and best-fit workflows.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[140px_1fr_1fr] bg-muted/50 text-sm font-medium sm:grid-cols-[220px_1fr_1fr]">
          <div className="p-4">Criteria</div>
          <div className="p-4">{left.name}</div>
          <div className="p-4">{right.name}</div>
        </div>
        {rows.map(([label, leftValue, rightValue]) => (
          <div key={label} className="grid grid-cols-[140px_1fr_1fr] border-t border-border text-sm sm:grid-cols-[220px_1fr_1fr]">
            <div className="bg-muted/20 p-4 text-muted-foreground">{label}</div>
            <div className="p-4 capitalize">{leftValue}</div>
            <div className="p-4 capitalize">{rightValue}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[left, right].map((model) => (
          <Card key={model.slug}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">{model.name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.shortDescription}</p>
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium">Best for</p>
                <div className="flex flex-wrap gap-2">
                  {model.bestFor.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium">Strengths</p>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {(model.strengths ?? []).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Tradeoffs</p>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {(model.weaknesses ?? []).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <Button asChild className="mt-6" variant="outline">
                <Link href={`/models/${model.slug}`}>View {model.name}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </article>
  )
}
