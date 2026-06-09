"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  blogSchema,
  type BlogFormValues,
} from "@/lib/validators/blog-schema";
import type { AdminActionState } from "@/types/admin";
import type { Blog } from "@/types/blog";

const defaultValues: BlogFormValues = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: null,
  author: "",
  published: false,
  featured: false,
  published_at: null,
};

function valuesFromBlog(blog?: Blog): BlogFormValues {
  if (!blog) return defaultValues;

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    cover_image: blog.coverImage ?? null,
    author: blog.author,
    published: blog.published,
    featured: blog.featured,
    published_at: blog.publishedAt ?? null,
  };
}

export function BlogForm({
  blog,
  action,
  submitLabel,
}: {
  blog?: Blog;
  action: (values: BlogFormValues) => Promise<AdminActionState>;
  submitLabel: string;
}) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: valuesFromBlog(blog),
  });

  function onSubmit(values: BlogFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      if (!result.ok) {
        setFormError(result.message ?? "Unable to save blog post.");
        Object.entries(result.fieldErrors ?? {}).forEach(
          ([field, messages]) => {
            if (messages?.[0]) {
              form.setError(field as keyof BlogFormValues, {
                message: messages[0],
              });
            }
          },
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border border-border bg-background p-5"
      >
        {formError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {formError}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} value={String(field.value ?? "")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} value={String(field.value ?? "")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} value={String(field.value ?? "")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover image URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    placeholder="https://example.com/image.jpg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={String(field.value ?? "")}
                  className="min-h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={String(field.value ?? "")}
                  className="min-h-64"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Published at</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={String(field.value ?? "")}
                  type="datetime-local"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Published</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Featured</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button asChild type="button" variant="outline">
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
