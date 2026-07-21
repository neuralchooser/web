import type { Metadata } from "next";
import { getPublishedBlogs } from "@/lib/services/blogs";
import { FeaturedBlogSection } from "@/components/blog/featured-blog-section";
import { BlogGrid } from "@/components/blog/blog-grid";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI & Technology Blog",
  description:
    "Educational content, AI tool comparisons, alternatives, and curated roundups of the best artificial intelligence tools.",
  path: "/blog",
});

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  // Find the first featured blog post, or fallback to the latest post if none are featured
  const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0];
  
  // The rest of the blogs to list in the grid
  const remainingBlogs = featuredBlog
    ? blogs.filter((blog) => blog.id !== featuredBlog.id)
    : blogs;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          NeuralChooser Blog
        </span>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Insights & Guides
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          In-depth comparisons, alternatives, roundups, and guides to help you discover and choose the right AI platforms.
        </p>
      </div>

      {featuredBlog && (
        <div className="mb-16">
          <FeaturedBlogSection blog={featuredBlog} />
        </div>
      )}

      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Recent Articles
        </h2>
        <BlogGrid blogs={remainingBlogs} />
      </div>
    </section>
  );
}
