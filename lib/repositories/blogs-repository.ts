import { supabaseServer } from "@/lib/supabase/server";
import type { BlogInput } from "@/lib/validators/blog-schema";
import type { Blog } from "@/types/blog";

const BLOG_SELECT = `
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image,
  author,
  published,
  featured,
  created_at,
  updated_at,
  published_at
`;

function assertSupabaseConfig() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY environment variables",
    );
  }
}

export function mapBlog(row: Record<string, unknown>): Blog {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    coverImage: row.cover_image === null ? undefined : String(row.cover_image ?? ""),
    author: String(row.author ?? ""),
    published: Boolean(row.published),
    featured: Boolean(row.featured),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    publishedAt: row.published_at === null ? undefined : String(row.published_at ?? ""),
  };
}

export interface BlogListFilters {
  published?: boolean;
  featured?: boolean;
  search?: string;
}

export async function listBlogs(filters: BlogListFilters = {}): Promise<Blog[]> {
  try {
    assertSupabaseConfig();

    let query = supabaseServer.from("blogs").select(BLOG_SELECT);

    if (filters.published !== undefined) {
      query = query.eq("published", filters.published);
    }

    if (filters.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    const { data, error } = await query.order("published_at", { ascending: false });

    if (error) {
      console.warn("Database query warning in listBlogs:", error.message);
      return [];
    }

    let blogs = (data ?? []).map(mapBlog);

    const search = filters.search?.trim().toLowerCase();
    if (search) {
      blogs = blogs.filter((blog) =>
        [blog.title, blog.excerpt, blog.content, blog.author]
          .join(" ")
          .toLowerCase()
          .includes(search),
      );
    }

    return blogs;
  } catch (err) {
    console.error("Error in listBlogs repository function:", err);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    assertSupabaseConfig();

    const { data, error } = await supabaseServer
      .from("blogs")
      .select(BLOG_SELECT)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.warn("Database query warning in getBlogById:", error.message);
      return null;
    }

    return data ? mapBlog(data) : null;
  } catch (err) {
    console.error("Error in getBlogById repository function:", err);
    return null;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    assertSupabaseConfig();

    const { data, error } = await supabaseServer
      .from("blogs")
      .select(BLOG_SELECT)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.warn("Database query warning in getBlogBySlug:", error.message);
      return null;
    }

    return data ? mapBlog(data) : null;
  } catch (err) {
    console.error("Error in getBlogBySlug repository function:", err);
    return null;
  }
}

export async function createBlog(input: BlogInput): Promise<Blog> {
  assertSupabaseConfig();

  const dataToInsert = {
    ...input,
    published_at: input.published && !input.published_at ? new Date().toISOString() : input.published_at,
  };

  const { data, error } = await supabaseServer
    .from("blogs")
    .insert(dataToInsert)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return mapBlog(data);
}

export async function updateBlog(id: string, input: BlogInput): Promise<Blog> {
  assertSupabaseConfig();

  const dataToUpdate = {
    ...input,
    published_at: input.published && !input.published_at ? new Date().toISOString() : input.published_at,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseServer
    .from("blogs")
    .update(dataToUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return mapBlog(data);
}

export async function deleteBlog(id: string): Promise<void> {
  assertSupabaseConfig();

  const { error } = await supabaseServer
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
