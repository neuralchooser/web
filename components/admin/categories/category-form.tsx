"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { categorySchema, type CategoryFormValues } from "@/lib/validators/category-schema";
import type { AdminActionState, CategoryRow } from "@/types/admin";

const defaultValues: CategoryFormValues = {
  slug: "",
  name: "",
  description: "",
  featured: false,
  is_active: true,
};

export function CategoryForm({
  category,
  action,
  submitLabel,
}: {
  category?: CategoryRow;
  action: (values: CategoryFormValues) => Promise<AdminActionState>;
  submitLabel: string;
}) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          slug: category.slug,
          name: category.name,
          description: category.description ?? "",
          featured: category.featured,
          is_active: category.is_active,
        }
      : defaultValues,
  });

  function onSubmit(values: CategoryFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      if (!result.ok) {
        setFormError(result.message ?? "Unable to save category.");
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
          if (messages?.[0]) {
            form.setError(field as keyof CategoryFormValues, {
              message: messages[0],
            });
          }
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl space-y-6 rounded-lg border border-border bg-background p-5"
      >
        {formError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {formError}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-1 items-center gap-3 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0">Featured category</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-1 items-center gap-3 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0">Active</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button asChild type="button" variant="outline">
            <Link href="/admin/categories">Cancel</Link>
          </Button>
          <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
