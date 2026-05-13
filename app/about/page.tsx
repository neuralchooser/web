import type { Metadata } from "next"

import { Card, CardContent } from "@/components/ui/card"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn how NeuralChooser organizes AI model data for scalable discovery and comparison.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          A practical directory for choosing AI models
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          NeuralChooser is built as a structured, data-driven catalog. Every card,
          category, detail page, and comparison is generated from typed model data,
          so the directory can scale without rewriting UI.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Data-first", "Model information lives in typed content files rather than JSX."],
          ["Static by default", "Public pages are generated for speed, SEO, and Vercel-friendly deployment."],
          ["Comparison-ready", "The schema supports future rankings, benchmarks, integrations, and voting."],
        ].map(([title, body]) => (
          <Card key={title}>
            <CardContent className="p-6">
              <h2 className="font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
