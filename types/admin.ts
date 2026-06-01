export interface AdminActionState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export interface PlatformRow {
  id: string;
  slug: string;
  name: string;
  company: string;
  logo: string | null;
  accent_color: string | null;
  short_description: string;
  description: string;
  website: string | null;
  documentation: string | null;
  categories: string[];
  tags: string[];
  pricing_free: boolean;
  pricing_paid: boolean;
  pricing_notes: string | null;
  api_available: boolean;
  open_source: boolean;
  featured: boolean;
  trending: boolean;
  last_updated: string | null;
}

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  featured: boolean;
  description: string | null;
}
