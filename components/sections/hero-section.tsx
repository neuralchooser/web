import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="surface-grid border-b border-border">
      <div className="mx-auto grid min-h-[620px] w-full max-w-7xl content-center gap-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
            Curated AI platform discovery
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Find the right AI platform for your workflow
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Browse curated AI platforms across text, image, video, coding,
            audio, research, and open ecosystems.
          </p>
        </div>

        <div className="flex max-w-2xl flex-col gap-3 rounded-lg border border-border bg-background/85 p-2 shadow-xl shadow-foreground/5 backdrop-blur sm:flex-row">
          <Link
            href="/platforms"
            className="flex min-h-12 flex-1 items-center gap-3 rounded-md px-4 text-left text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <Search className="size-4" />
            Search platforms, companies, categories, or use cases
          </Link>
          <Button asChild size="lg">
            <Link href="/platforms">
              Browse platforms
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
