export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}
