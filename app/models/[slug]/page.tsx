import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightLeft, CheckCircle2, ExternalLink, XCircle } from "lucide-react"

import { ModelCard } from "@/components/cards/model-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createComparisonSlug } from "@/lib/compare"
import {
  formatCategoryName,
  getAllModels,
  getComparableModels,
  getModelBySlug,
  getRelatedModels,
} from "@/lib/models"
import { createMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return getAllModels().map((model) => ({ slug: model.slug }))
}

export async function generateMetadata(props: PageProps<"/models/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const model = getModelBySlug(slug)

  if (!model) return createMetadata({ title: "Model not found", path: `/models/${slug}` })

  return createMetadata({
    title: `${model.name} AI Model`,
    description: model.shortDescription,
    path: `/models/${model.slug}`,
  })
}

export default async function ModelPage(props: PageProps<"/models/[slug]">) {
  const { slug } = await props.params
  const model = getModelBySlug(slug)

  if (!model) notFound()

  const relatedModels = getRelatedModels(model)
  const comparableModels = getComparableModels(model)

  return (
    <article>
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <div className="flex flex-wrap gap-2">
              {model.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {formatCategoryName(category)}
                </Badge>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{model.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{model.company}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{model.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {model.website ? (
                <Button asChild>
                  <a href={model.website} target="_blank" rel="noreferrer">
                    Visit website
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ) : null}
              {model.documentation ? (
                <Button asChild variant="outline">
                  <a href={model.documentation} target="_blank" rel="noreferrer">
                    Documentation
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <Card className="bg-card/90">
            <CardContent className="grid gap-4 p-6">
              {[
                ["Pricing", model.pricing.startingPrice ?? model.pricing.type],
                ["API", model.apiAvailable ? "Available" : "Unavailable"],
                ["Open source", model.openSource ? "Yes" : "No"],
                ["Local runnable", model.localRunnable ? "Yes" : "No"],
                ["Context window", model.contextWindow ? `${model.contextWindow.toLocaleString()} tokens` : "Not listed"],
                ["Speed", model.speed ?? "Not listed"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-right font-medium capitalize">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">Best use cases</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {model.bestFor.map((item) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <CheckCircle2 className="size-5 text-emerald-500" />
                  Strengths
                </h2>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
                  {(model.strengths ?? []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <XCircle className="size-5 text-amber-500" />
                  Tradeoffs
                </h2>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
                  {(model.weaknesses ?? []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>

          {relatedModels.length ? (
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Related models</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedModels.map((related) => <ModelCard key={related.slug} model={related} compact />)}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {model.tags.map((tag) => <Badge key={tag} variant="muted">{tag}</Badge>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Compare</h2>
              <Separator className="my-4" />
              <div className="grid gap-2">
                {comparableModels.map((candidate) => {
                  const ordered = [model.slug, candidate.slug].sort()
                  return (
                    <Button key={candidate.slug} asChild variant="outline" className="justify-start">
                      <Link href={`/compare/${createComparisonSlug(ordered[0], ordered[1])}`}>
                        <ArrowRightLeft className="size-4" />
                        {candidate.name}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </article>
  )
}
