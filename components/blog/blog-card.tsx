import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { Blog } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Card className="group h-full overflow-hidden bg-card/85 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lg">
      {blog.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted/40">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          {blog.featured && (
            <Badge className="absolute top-3 left-3" variant="default">
              Featured
            </Badge>
          )}
        </div>
      ) : (
        <div className="relative flex aspect-video w-full items-center justify-center border-b border-border bg-muted/20">
          <span className="text-4xl">📝</span>
          {blog.featured && (
            <Badge className="absolute top-3 left-3" variant="default">
              Featured
            </Badge>
          )}
        </div>
      )}

      <CardContent className="flex h-[calc(100%-56.25%)] flex-col p-5">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <User className="size-3.5" />
            {blog.author}
          </span>
          {publishedDate && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {publishedDate}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-grow text-sm leading-relaxed text-muted-foreground">
          {blog.excerpt}
        </p>

        <div className="mt-5 flex items-center pt-3 border-t border-border/50">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Read article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
