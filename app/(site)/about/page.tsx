import type { Metadata } from "next"

import { Card, CardContent } from "@/components/ui/card"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about NeuralChooser, a curated AI tools directory for discovering and comparing AI platforms.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="surface-grid border-b border-border">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">
              About NeuralChooser
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Discover and compare AI tools with confidence
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              NeuralChooser is a curated AI tools directory designed to help you
              find the right platform for your workflow—faster, clearer, and
              with less noise.
            </p>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold tracking-tight">Curated Listings</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Thoughtful picks you can trust—focused on quality, relevance, and
                what you actually need.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold tracking-tight">Smart Discovery</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Explore tools by category, pricing, API availability, and more.
                Find options that match your use case.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold tracking-tight">Community Driven</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Suggestions come from the people using these platforms. You
                help improve the directory over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content sections */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              Our Mission
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              AI tool overload makes it hard to choose. NeuralChooser exists to
              simplify discovery with curated listings, clear details, and
              comparisons that help you move from “maybe” to “this is the one.”
            </p>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              What You’ll Find
            </h2>
            <ul className="mt-5 space-y-3 text-lg leading-8 text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                AI tool listings
              </li>
              <li className="flex items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                Categories
              </li>
              <li className="flex  items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                Pricing info
              </li>
              <li className="flex items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                API availability
              </li>
              <li className="flex items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                Open-source indicators
              </li>
              <li className="flex items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                Featured and trending tools
              </li>
              <li className="flex items-center gap-3">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/60" />
                Search and filtering
              </li>
            </ul>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              How Tools Are Added
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Tools are curated and community-submitted. Every suggestion is
              reviewed before it appears, so the directory stays focused on
              quality, relevance, and usefulness.
            </p>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              Built For
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Developers, founders, creators, marketers, researchers, and AI
              enthusiasts—anyone who needs a confident starting point in the fast
              moving world of AI.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

