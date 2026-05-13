import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-border bg-foreground p-8 text-background md:p-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Build your shortlist in minutes</h2>
          <p className="mt-3 text-background/70">
            Filter by workflow, deployment constraints, API access, and pricing to find the best fit.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="secondary">
            <Link href="/models">Explore models</Link>
          </Button>
          <Button asChild variant="outline" className="border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background">
            <Link href="/compare">Compare models</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
