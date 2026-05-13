"use client"

import * as React from "react"
import { Filter, Search, SlidersHorizontal, X } from "lucide-react"

import { ModelCard } from "@/components/cards/model-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getCategoryBySlug } from "@/lib/models"
import type { AIModel, Category, ModelCategory, PricingType } from "@/types/model"

interface Filters {
  category: "all" | ModelCategory
  pricing: "all" | PricingType
  openSource: boolean
  apiAvailable: boolean
  localRunnable: boolean
}

const defaultFilters: Filters = {
  category: "all",
  pricing: "all",
  openSource: false,
  apiAvailable: false,
  localRunnable: false,
}

function matchesSearch(model: AIModel, query: string) {
  const haystack = [
    model.name,
    model.company,
    model.shortDescription,
    model.description,
    ...model.tags,
    ...model.bestFor,
    ...model.categories.map((category) => getCategoryBySlug(category)?.name ?? category),
  ]
    .join(" ")
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

function FilterPanel({
  categories,
  filters,
  setFilters,
}: {
  categories: Category[]
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) {
  const pricingOptions: Array<{ label: string; value: Filters["pricing"] }> = [
    { label: "All pricing", value: "all" },
    { label: "Free", value: "free" },
    { label: "Freemium", value: "freemium" },
    { label: "Paid", value: "paid" },
    { label: "Enterprise", value: "enterprise" },
  ]

  return (
    <div className="grid gap-6">
      <div>
        <p className="mb-3 text-sm font-medium">Category</p>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => setFilters((current) => ({ ...current, category: "all" }))}
            className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
              filters.category === "all" ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
            }`}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setFilters((current) => ({ ...current, category: category.slug }))}
              className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                filters.category === category.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Pricing</p>
        <div className="grid grid-cols-2 gap-2">
          {pricingOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilters((current) => ({ ...current, pricing: option.value }))}
              className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                filters.pricing === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Capabilities</p>
        <div className="grid gap-2">
          {[
            ["openSource", "Open source"],
            ["apiAvailable", "API available"],
            ["localRunnable", "Local runnable"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={Boolean(filters[key as keyof Filters])}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
                className="size-4 accent-foreground"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ModelSearch({
  models,
  categories,
  initialCategory = "all",
}: {
  models: AIModel[]
  categories: Category[]
  initialCategory?: Filters["category"]
}) {
  const [query, setQuery] = React.useState("")
  const [filters, setFilters] = React.useState<Filters>({ ...defaultFilters, category: initialCategory })

  const filteredModels = React.useMemo(() => {
    return models.filter((model) => {
      if (query.trim() && !matchesSearch(model, query.trim())) return false
      if (filters.category !== "all" && !model.categories.includes(filters.category)) return false
      if (filters.pricing !== "all" && model.pricing.type !== filters.pricing) return false
      if (filters.openSource && !model.openSource) return false
      if (filters.apiAvailable && !model.apiAvailable) return false
      if (filters.localRunnable && !model.localRunnable) return false
      return true
    })
  }, [filters, models, query])

  const activeFilterCount = [
    filters.category !== "all",
    filters.pricing !== "all",
    filters.openSource,
    filters.apiAvailable,
    filters.localRunnable,
  ].filter(Boolean).length

  function resetFilters() {
    setQuery("")
    setFilters({ ...defaultFilters, category: initialCategory })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-lg border border-border bg-card p-5">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="size-4" />
            <h2 className="font-medium">Filters</h2>
          </div>
          <FilterPanel categories={categories} filters={filters} setFilters={setFilters} />
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by model, company, tag, or use case"
              className="h-11 pl-10"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="size-4" />
                Filters
                {activeFilterCount ? `(${activeFilterCount})` : null}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel categories={categories} filters={filters} setFilters={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
          {(query || activeFilterCount > 0) && (
            <Button variant="ghost" onClick={resetFilters}>
              <X className="size-4" />
              Reset
            </Button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredModels.length} models found</span>
          <span>Client-side instant filtering</span>
        </div>

        {filteredModels.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <p className="font-medium">No models match these filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">Reset filters or try a broader search term.</p>
            <Button className="mt-5" variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
