export type PlatformCategory =
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
  categories: PlatformCategory[];
  tags?: string[];
  bestFor?: string[];
  pricing: PlatformPricing;
  apiAvailable?: boolean;
  openSource?: boolean;
  website?: string;
  documentation?: string;
  strengths?: string[];
  weaknesses?: string[];
  models?: PlatformModel[];
  featured?: boolean;
  trending?: boolean;
  lastUpdated?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface Category {
  slug: PlatformCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  featured?: boolean;
}
