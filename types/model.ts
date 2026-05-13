export type PricingType = "free" | "freemium" | "paid" | "enterprise"

export type ModelCategory =
  | "text-generation"
  | "image-generation"
  | "video-generation"
  | "coding"
  | "audio"
  | "music"
  | "research"
  | "open-source"

export type ModelModality =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "music"
  | "code"
  | "reasoning"
  | "multimodal"

export interface ModelBenchmark {
  name: string
  score: number | string
  unit?: string
  higherIsBetter?: boolean
  source?: string
}

export interface ModelPricing {
  type: PricingType
  startingPrice?: string
  billingUnit?: string
  notes?: string
}

export interface ModelIntegration {
  name: string
  url?: string
  type?: "api" | "app" | "sdk" | "marketplace" | "local"
}

export interface ModelRanking {
  label: string
  rank: number
  scope?: string
  source?: string
}

export interface AIModel {
  id: string
  slug: string
  name: string
  company: string
  logo?: string
  accentColor?: string
  shortDescription: string
  description: string
  categories: ModelCategory[]
  tags: string[]
  bestFor: string[]
  modalities: ModelModality[]
  pricing: ModelPricing
  apiAvailable: boolean
  openSource: boolean
  localRunnable?: boolean
  contextWindow?: number
  releaseDate?: string
  website?: string
  documentation?: string
  featured?: boolean
  trending?: boolean
  recentlyAdded?: boolean
  comparisons?: string[]
  strengths?: string[]
  weaknesses?: string[]
  speed?: "slow" | "moderate" | "fast" | "very-fast"
  benchmarks?: ModelBenchmark[]
  integrations?: ModelIntegration[]
  rankings?: ModelRanking[]
  metadata?: Record<string, string | number | boolean | null>
  lastUpdated?: string
}

export interface Category {
  slug: ModelCategory
  name: string
  description: string
  icon: string
  color: string
  featured?: boolean
}
