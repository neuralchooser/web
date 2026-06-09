"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteBlogAction } from "@/lib/actions/blog-actions";
import type { Blog } from "@/types/blog";

function formatDate(iso: string | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BlogTable({ blogs }: { blogs: Blog[] }) {
  if (!blogs.length) {
    return (
      <EmptyState
        title="No blog posts yet"
        description="Create a blog post or adjust your search and filters."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden sm:table-cell">Published</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="w-14" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <p className="font-medium">{blog.title}</p>
                <p className="text-xs text-muted-foreground">{blog.slug}</p>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {blog.author}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                {formatDate(blog.publishedAt)}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {blog.published ? (
                  <Badge>Published</Badge>
                ) : (
                  <Badge variant="muted">Draft</Badge>
                )}
                {blog.featured && (
                  <Badge variant="secondary" className="ml-1.5">
                    Featured
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open row actions">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/blog/${blog.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/blog/${blog.slug}`}>View public page</Link>
                    </DropdownMenuItem>
                    <div className="px-1 py-1">
                      <DeleteDialog
                        title={`Delete ${blog.title}?`}
                        description="This permanently removes the blog post from Supabase."
                        action={() => deleteBlogAction(blog.id)}
                      />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
