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
  tags: string[];
  pricing_free: boolean;
  pricing_paid: boolean;
  pricing_notes: string | null;
  api_available: boolean;
  open_source: boolean;
  featured: boolean;
  trending: boolean;
  is_monochrome_logo: boolean;
  last_updated: string | null;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface ToolSubmissionRow {
  id: string;
  name: string;
  company: string | null;
  website: string;
  documentation: string | null;
  short_description: string;
  description: string | null;
  categories: string[];
  tags: string[];
  pricing_free: boolean;
  pricing_paid: boolean;
  api_available: boolean;
  open_source: boolean;
  founder_email: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  featured: boolean;
  description: string | null;
}
