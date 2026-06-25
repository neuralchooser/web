import { CtaSection } from "@/components/sections/cta-section";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { HeroSection } from "@/components/sections/hero-section";
import { PlatformRail } from "@/components/sections/platform-rail";
import { getAllPlatforms } from "@/lib/platforms";

export default async function Home() {
  const platforms = await getAllPlatforms();
  // const featuredPlatforms = platforms
  //   .filter((platform) => platform.homepageSections?.includes("featured"))
  //   .slice(0, 4);
  const trendingPlatforms = platforms
    .filter((platform) => platform.homepageSections?.includes("trending"))
    .slice(0, 4);
  const codingPlatforms = platforms
    .filter((platform) => platform.homepageSections?.includes("coding"))
    .slice(0, 4);
  const imagePlatforms = platforms
    .filter((platform) => platform.homepageSections?.includes("image"))
    .slice(0, 4);
  const researchPlatforms = platforms
    .filter((platform) => platform.homepageSections?.includes("research"))
    .slice(0, 4);
  const recentlyUpdated = [...platforms]
    .sort((a, b) => {
      const left = a.lastUpdated ?? "1900-01-01";
      const right = b.lastUpdated ?? "1900-01-01";
      return right.localeCompare(left);
    })
    .slice(0, 4);

  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      {/* <PlatformRail
        title="Featured platforms"
        description="Featured AI platforms from team neural chooser."
        platforms={featuredPlatforms}
      /> */}
      <PlatformRail
        title="Trending platforms"
        description="High-signal AI platforms teams are actively evaluating right now."
        platforms={trendingPlatforms}
      />
      <PlatformRail
        title="Best for coding"
        description="Developer platforms for implementation, refactors, review, and agents."
        platforms={codingPlatforms}
      />
      <PlatformRail
        title="Best for image generation"
        description="Creative platforms for campaigns, concepts, product visuals, and art direction."
        platforms={imagePlatforms}
      />
      <PlatformRail
        title="Research and writing"
        description="Curated platforms for search, analysis, writing, and source-backed exploration."
        platforms={researchPlatforms}
      />
      <PlatformRail
        title="Recently updated"
        description="Platforms with current editorial data in the directory."
        platforms={recentlyUpdated}
      />
      <CtaSection />
    </>
  );
}
