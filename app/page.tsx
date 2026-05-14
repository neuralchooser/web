import { CtaSection } from "@/components/sections/cta-section"
import { FeaturedCategories } from "@/components/sections/featured-categories"
import { HeroSection } from "@/components/sections/hero-section"
import { PlatformRail } from "@/components/sections/platform-rail"
import {
  getPlatformsByCategory,
  getRecentlyAddedPlatforms,
  getTrendingPlatforms,
} from "@/lib/platforms"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <PlatformRail
        title="Trending platforms"
        description="High-signal AI platforms teams are actively evaluating right now."
        platforms={getTrendingPlatforms(4)}
      />
      <PlatformRail
        title="Best for coding"
        description="Developer platforms for implementation, refactors, review, and agents."
        platforms={getPlatformsByCategory("coding").slice(0, 4)}
      />
      <PlatformRail
        title="Best for image generation"
        description="Creative platforms for campaigns, concepts, product visuals, and art direction."
        platforms={getPlatformsByCategory("image-generation").slice(0, 4)}
      />
      <PlatformRail
        title="Research and writing"
        description="Curated platforms for search, analysis, writing, and source-backed exploration."
        platforms={getPlatformsByCategory("research").slice(0, 4)}
      />
      <PlatformRail
        title="Recently updated"
        description="Platforms with current editorial data in the directory."
        platforms={getRecentlyAddedPlatforms(4)}
      />
      <CtaSection />
    </>
  )
}
