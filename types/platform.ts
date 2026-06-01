export type PlatformCategorySlug =
  | "text-generation"
  | "image-generation"
  | "video-generation"
  | "audio"
  | "music"

  // engineering / builders
  | "coding"
  | "app-builder"
  | "website-builder"
  | "ui-design"
  | "automation"
  | "agents"

  // business workflows
  | "research"
  | "lead-generation"
  | "marketing"
  | "sales"
  | "customer-support"
  | "productivity"
  | "presentation"

  // data / enterprise
  | "data-analysis"
  | "search"
  | "knowledge-base"

  // media / creative
  | "3d-generation"
  | "voice-generation"
  | "avatar-generation"

  // infra / ecosystem
  | "developer-tools"
  | "api-platform"
  | "open-source";

export interface BaseCategory {
  slug: PlatformCategorySlug | string;
  name: string;
  description?: string;
  featured?: boolean;
}

export interface PlatformCategory extends BaseCategory {
  id: string;
}

export interface Category extends BaseCategory {
  icon: string;
  color: string;
}

export interface PlatformPricing {
  free: boolean;
  paid: boolean;
  notes?: string;
}

export interface PlatformModel {
  name: string;
  description?: string;
}

export interface AIPlatform {
  id: string;
  slug: string;
  name: string;
  company: string;
  logo?: string;
  accentColor?: string;
  shortDescription: string;
  description: string;
  categories: PlatformCategorySlug[];
  tags?: string[];
  bestFor?: string[];
  pricing: PlatformPricing;
  apiAvailable?: boolean;
  openSource?: boolean;
  website?: string;
  documentation?: string | null;
  strengths?: string[];
  weaknesses?: string[];
  models?: PlatformModel[] | null;
  featured?: boolean;
  trending?: boolean;
  isMonochromeLogo?: boolean;
  lastUpdated?: string;
  metadata?: Record<string, string | number | boolean | null>;
}
