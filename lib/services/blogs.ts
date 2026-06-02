import { getBlogBySlug as repoGetBlogBySlug, listBlogs } from "@/lib/repositories/blogs-repository";
import type { Blog } from "@/types/blog";

export async function getPublishedBlogs(): Promise<Blog[]> {
  return listBlogs({ published: true });
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blog = await repoGetBlogBySlug(slug);
  if (!blog || !blog.published) return null;
  return blog;
}

export async function getRelatedBlogs(currentBlog: Blog, limit = 3): Promise<Blog[]> {
  const allPublished = await getPublishedBlogs();
  
  // Filter out current blog
  const candidateBlogs = allPublished.filter((blog) => blog.id !== currentBlog.id);
  
  // Sort candidate blogs: featured ones first, then by publishedAt DESC
  const sorted = [...candidateBlogs].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    const left = a.publishedAt ?? "1900-01-01";
    const right = b.publishedAt ?? "1900-01-01";
    return right.localeCompare(left);
  });
  
  return sorted.slice(0, limit);
}
