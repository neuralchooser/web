import { ComparisonSection } from "@/components/sections/comparison-section"
import { CtaSection } from "@/components/sections/cta-section"
import { FeaturedCategories } from "@/components/sections/featured-categories"
import { HeroSection } from "@/components/sections/hero-section"
import { ModelRail } from "@/components/sections/model-rail"
import {
  getModelsByCategory,
  getRecentlyAddedModels,
  getTrendingModels,
} from "@/lib/models"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <ModelRail
        title="Trending models"
        description="High-signal models and products teams are actively evaluating right now."
        models={getTrendingModels(4)}
      />
      <ModelRail
        title="Best for coding"
        description="Code models and tools for implementation, refactors, review, and agents."
        models={getModelsByCategory("coding").slice(0, 4)}
      />
      <ModelRail
        title="Best for image generation"
        description="Creative image systems for campaigns, concepts, product visuals, and local pipelines."
        models={getModelsByCategory("image-generation").slice(0, 4)}
      />
      <ModelRail
        title="Recently added"
        description="Newer entries and major model families worth reviewing."
        models={getRecentlyAddedModels(4)}
      />
      <ComparisonSection />
      <CtaSection />
    </>
  )
}
