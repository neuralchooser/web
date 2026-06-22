"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Filter, Search, SlidersHorizontal, X } from "lucide-react";

import { PlatformCard } from "@/components/cards/platform-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AIPlatform, PlatformCategory } from "@/types/platform";

const PAGE_SIZE = 24;

interface Filters {
  category: "all" | string;
  pricing: "all" | "free" | "paid";
  openSource: boolean;
  apiAvailable: boolean;
}

const defaultFilters: Filters = {
  category: "all",
  pricing: "all",
  openSource: false,
  apiAvailable: false,
};

function matchesSearch(
  platform: AIPlatform,
  query: string,
  categoryLookup: Record<string, string>,
) {
  const haystack = [
    platform.name,
    platform.company,
    platform.shortDescription,
    platform.description,
    ...(platform.tags ?? []),
    ...(platform.bestFor ?? []),
    ...(platform.models ?? []).map((model) => model.name),
    ...platform.categories.map(
      (category) => categoryLookup[category.slug] ?? category.name,
    ),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function FilterPanel({
  categories,
  filters,
  setFilters,
}: {
  categories: PlatformCategory[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  const pricingOptions: Array<{ label: string; value: Filters["pricing"] }> = [
    { label: "All pricing", value: "all" },
    { label: "Free available", value: "free" },
    { label: "Paid plans", value: "paid" },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="mb-3 text-sm font-medium">Category</p>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() =>
              setFilters((current) => ({ ...current, category: "all" }))
            }
            className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${filters.category === "all"
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:bg-muted"
              }`}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  category: category.slug,
                }))
              }
              className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${filters.category === category.slug
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
        <div className="grid gap-2">
          {pricingOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setFilters((current) => ({ ...current, pricing: option.value }))
              }
              className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${filters.pricing === option.value
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
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
            >
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
  );
}

export function PlatformSearch({
  platforms,
  categories,
  initialCategory = "all",
}: {
  platforms: AIPlatform[];
  categories: PlatformCategory[];
  initialCategory?: Filters["category"];
}) {
  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState<Filters>({
    ...defaultFilters,
    category: initialCategory,
  });
  const [page, setPage] = React.useState(1);

  const categoryLookup = React.useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [category.slug, category.name]),
      ),
    [categories],
  );

  const filteredPlatforms = React.useMemo(() => {
    return platforms.filter((platform) => {
      if (
        query.trim() &&
        !matchesSearch(platform, query.trim(), categoryLookup)
      )
        return false;
      if (
        filters.category !== "all" &&
        !platform.categories.some((c) => c.slug === filters.category)
      )
        return false;
      if (filters.pricing === "free" && !platform.pricing.free) return false;
      if (filters.pricing === "paid" && !platform.pricing.paid) return false;
      if (filters.openSource && !platform.openSource) return false;
      if (filters.apiAvailable && !platform.apiAvailable) return false;
      return true;
    });
  }, [categoryLookup, filters, platforms, query]);

  React.useEffect(() => {
    setPage(1);
  }, [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredPlatforms.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedPlatforms = filteredPlatforms.slice(start, start + PAGE_SIZE);

  const activeFilterCount = [
    filters.category !== "all",
    filters.pricing !== "all",
    filters.openSource,
    filters.apiAvailable,
  ].filter(Boolean).length;

  function resetFilters() {
    setQuery("");
    setFilters({ ...defaultFilters, category: initialCategory });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-lg border border-border bg-card p-5">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="size-4" />
            <h2 className="font-medium">Filters</h2>
          </div>

          <div className="max-h-[calc(100vh-6rem-5rem)] overflow-y-auto pr-1 scrollbar-none">
            <FilterPanel
              categories={categories}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      </aside>

      <div>
        <h2 className="sr-only">Platforms</h2>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search platforms, companies, categories, or use cases"
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
                <SheetDescription className="sr-only">
                  Filter platforms by category, pricing, and capabilities
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel
                  categories={categories}
                  filters={filters}
                  setFilters={setFilters}
                />
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
          <span>
            {filteredPlatforms.length === 0
              ? "0 platforms found"
              : `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filteredPlatforms.length)} of ${filteredPlatforms.length} platforms`}
          </span>
        </div>

        {paginatedPlatforms.length ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedPlatforms.map((platform) => (
                <PlatformCard key={platform.slug} platform={platform} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {safePage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <p className="font-medium">No platforms match these filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Reset filters or try a broader search term.
            </p>
            <Button className="mt-5" variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
