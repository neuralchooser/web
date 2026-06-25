import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BooleanFilter, SearchFilterBar } from "@/components/admin/search-filter-bar";
import { PlatformsTable } from "@/components/admin/platforms/platforms-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requireAdmin } from "@/lib/auth/admin-session";
import { HOMEPAGE_SECTION_OPTIONS } from "@/lib/constants/homepage-sections";
import { listCategories } from "@/lib/repositories/categories-repository";
import { listPlatforms, type PlatformListFilters } from "@/lib/repositories/platforms-repository";
import { getPlatformEventCountsMap } from "@/lib/repositories/analytics-repository";


export const metadata = {
  title: "Admin Platforms",
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPlatformsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const filters: PlatformListFilters = {
    search: firstParam(params.search),
    category: firstParam(params.category),
    homepageSection: firstParam(params.homepageSection),
    api: firstParam(params.api) as PlatformListFilters["api"],
    openSource: firstParam(params.openSource) as PlatformListFilters["openSource"],
  };
  const [platforms, categories, countsMap] = await Promise.all([
    listPlatforms(filters),
    listCategories(),
    getPlatformEventCountsMap(),
  ]);

  const platformsWithAnalytics = platforms.map((platform) => ({
    ...platform,
    analytics: countsMap[platform.id] || { views: 0, websiteClicks: 0, documentationClicks: 0 },
  }));


  return (
    <>
      <AdminPageHeader
        title="Platforms"
        description="Create, update, search, and remove AI platform records."
        action={{ href: "/admin/platforms/new", label: "New platform" }}
      />
      <SearchFilterBar search={filters.search}>
        <Select name="category" defaultValue={filters.category ?? "all"}>
          <SelectTrigger className="min-w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          name="homepageSection"
          defaultValue={filters.homepageSection ?? "all"}
        >
          <SelectTrigger className="min-w-44">
            <SelectValue placeholder="Homepage section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All homepage sections</SelectItem>
            {HOMEPAGE_SECTION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <BooleanFilter name="api" value={filters.api} label="API" />
        <BooleanFilter
          name="openSource"
          value={filters.openSource}
          label="Open source"
        />
      </SearchFilterBar>
      <PlatformsTable platforms={platformsWithAnalytics} />
    </>
  );
}
