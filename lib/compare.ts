import { getAllModels, getModelBySlug } from "@/lib/models"
import type { AIModel } from "@/types/model"

export interface ComparisonPair {
  slug: string
  models: [AIModel, AIModel]
}

export function createComparisonSlug(left: string, right: string) {
  return `${left}-vs-${right}`
}

export function parseComparisonSlug(slug: string) {
  const [left, right] = slug.split("-vs-")
  if (!left || !right) return null
  return { left, right }
}

export function getComparisonBySlug(slug: string): ComparisonPair | null {
  const parsed = parseComparisonSlug(slug)
  if (!parsed) return null

  const left = getModelBySlug(parsed.left)
  const right = getModelBySlug(parsed.right)

  if (!left || !right) return null

  return { slug, models: [left, right] }
}

export function getComparisonPairs() {
  const pairs = new Map<string, ComparisonPair>()

  for (const model of getAllModels()) {
    for (const comparisonSlug of model.comparisons ?? []) {
      const other = getModelBySlug(comparisonSlug)
      if (!other) continue

      const ordered = [model.slug, other.slug].sort()
      const slug = createComparisonSlug(ordered[0], ordered[1])
      const left = getModelBySlug(ordered[0])
      const right = getModelBySlug(ordered[1])

      if (left && right) {
        pairs.set(slug, { slug, models: [left, right] })
      }
    }
  }

  return [...pairs.values()].sort((a, b) => a.slug.localeCompare(b.slug))
}
