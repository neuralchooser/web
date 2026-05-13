import { categories } from "@/content/models/categories"
import { models } from "@/content/models/models"
import type { AIModel, ModelCategory } from "@/types/model"

export function getAllModels() {
  return [...models].sort((a, b) => a.name.localeCompare(b.name))
}

export function getModelBySlug(slug: string) {
  return models.find((model) => model.slug === slug)
}

export function getFeaturedModels(limit?: number) {
  const items = models.filter((model) => model.featured)
  return typeof limit === "number" ? items.slice(0, limit) : items
}

export function getTrendingModels(limit?: number) {
  const items = models.filter((model) => model.trending || model.featured)
  return typeof limit === "number" ? items.slice(0, limit) : items
}

export function getRecentlyAddedModels(limit?: number) {
  const items = [...models].sort((a, b) => {
    const left = a.releaseDate ?? "1900-01-01"
    const right = b.releaseDate ?? "1900-01-01"
    return right.localeCompare(left)
  })

  return typeof limit === "number" ? items.slice(0, limit) : items
}

export function getModelsByCategory(category: ModelCategory) {
  return models.filter((model) => model.categories.includes(category))
}

export function getAllCategories() {
  return categories
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function getRelatedModels(model: AIModel, limit = 4) {
  return models
    .filter((candidate) => candidate.slug !== model.slug)
    .map((candidate) => ({
      model: candidate,
      score:
        candidate.categories.filter((category) => model.categories.includes(category)).length * 3 +
        candidate.tags.filter((tag) => model.tags.includes(tag)).length +
        candidate.bestFor.filter((useCase) => model.bestFor.includes(useCase)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.model)
}

export function getComparableModels(model: AIModel) {
  const comparisonSlugs = model.comparisons ?? []
  const comparableModels: AIModel[] = []

  for (const slug of comparisonSlugs) {
    const candidate = getModelBySlug(slug)
    if (candidate) comparableModels.push(candidate)
  }

  return comparableModels
}

export function formatCategoryName(category: ModelCategory) {
  return getCategoryBySlug(category)?.name ?? category
}
