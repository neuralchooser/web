import type { Blog } from "@/types/blog";
import { BlogCard } from "@/components/blog/blog-card";

interface BlogGridProps {
  blogs: Blog[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/10">
        <p className="text-sm text-muted-foreground">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
