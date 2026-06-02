import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { Blog } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";

interface FeaturedBlogSectionProps {
  blog: Blog;
}

export function FeaturedBlogSection({ blog }: FeaturedBlogSectionProps) {
  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Card className="group overflow-hidden border border-border/80 bg-card/60 backdrop-blur-md">
      <CardContent className="grid gap-6 p-0 md:grid-cols-2">
        <div className="relative aspect-video w-full overflow-hidden bg-muted/40 md:aspect-auto md:h-full min-h-[300px]">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              priority
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/20">
              <span className="text-6xl">📝</span>
            </div>
          )}
          <Badge
            className="absolute top-4 left-4 font-semibold"
            variant="default"
          >
            Featured Article
          </Badge>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" />
              {blog.author}
            </span>
            {publishedDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {publishedDate}
              </span>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl group-hover:text-primary transition-colors">
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {blog.excerpt}
          </p>

          <div className="mt-8 flex items-center">
            <Link
              href={`/blog/${blog.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/95 hover:shadow-md active:scale-95"
            >
              Read full article
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
