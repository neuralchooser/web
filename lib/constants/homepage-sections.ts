export const HOMEPAGE_SECTIONS = {
  FEATURED: "featured",
  TRENDING: "trending",
  CODING: "coding",
  IMAGE: "image",
  RESEARCH: "research",
} as const;

export type HomepageSection =
  (typeof HOMEPAGE_SECTIONS)[keyof typeof HOMEPAGE_SECTIONS];

export const HOMEPAGE_SECTION_VALUES = Object.values(
  HOMEPAGE_SECTIONS,
) as HomepageSection[];

export const HOMEPAGE_SECTION_OPTIONS: {
  value: HomepageSection;
  label: string;
}[] = [
  { value: HOMEPAGE_SECTIONS.FEATURED, label: "Featured Platforms" },
  { value: HOMEPAGE_SECTIONS.TRENDING, label: "Trending Platforms" },
  { value: HOMEPAGE_SECTIONS.CODING, label: "Best for Coding" },
  { value: HOMEPAGE_SECTIONS.IMAGE, label: "Best for Image Generation" },
  { value: HOMEPAGE_SECTIONS.RESEARCH, label: "Research & Writing" },
];

export function isHomepageSection(value: string): value is HomepageSection {
  return HOMEPAGE_SECTION_VALUES.includes(value as HomepageSection);
}
