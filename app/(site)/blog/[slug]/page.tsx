import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

import Image from "next/image";

import { BlogContent } from "@/components/blog/blog-content";
import { BlogCard } from "@/components/blog/blog-card";
import {
  getBlogBySlug,
  getPublishedBlogs,
  getRelatedBlogs,
} from "@/lib/services/blogs";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return createMetadata({
      title: "Blog Post Not Found",
      path: `/blog/${slug}`,
    });
  }

  const meta = createMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blog/${blog.slug}`,
  });

  if (blog.coverImage) {
    meta.openGraph = {
      ...meta.openGraph,
      images: [{ url: blog.coverImage, alt: blog.title }],
    };
    meta.twitter = {
      ...meta.twitter,
      images: [blog.coverImage],
    };
  }

  return meta;
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog, 3);
  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back navigation */}
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 -ml-3">
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {blog.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="size-4 text-foreground/75" />
            <span>
              By{" "}
              <span className="font-medium text-foreground">{blog.author}</span>
            </span>
          </div>
          {publishedDate && (
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-foreground/75" />
              <span>Published on {publishedDate}</span>
            </div>
          )}
        </div>
      </header>

      {/* Cover image */}
      {blog.coverImage && (
        <div className="mb-10 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/40 shadow-sm relative">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {/* Main post body */}
      <div className="pb-16 border-b border-border">
        <BlogContent content={blog.content} />
      </div>

      {/* Related blogs */}
      {relatedBlogs.length > 0 && (
        <section className="pt-16">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard key={relatedBlog.id} blog={relatedBlog} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
