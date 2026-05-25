"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CategoryMultiSelect } from "@/components/admin/platforms/category-multi-select";
import { TagsInput } from "@/components/admin/platforms/tags-input";
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
import { platformSchema, type PlatformFormValues } from "@/lib/validators/platform-schema";
import type { AdminActionState, CategoryRow, PlatformRow } from "@/types/admin";

const defaultValues: PlatformFormValues = {
  slug: "",
  name: "",
  company: "",
  logo: "",
  accent_color: "",
  short_description: "",
  description: "",
  website: "",
  documentation: "",
  categories: [],
  tags: [],
  pricing_free: false,
  pricing_paid: false,
  pricing_notes: "",
  api_available: false,
  open_source: false,
  featured: false,
  trending: false,
  last_updated: new Date().toISOString().slice(0, 10),
};

function valuesFromPlatform(platform?: PlatformRow): PlatformFormValues {
  if (!platform) return defaultValues;

  return {
    slug: platform.slug,
    name: platform.name,
    company: platform.company,
    logo: platform.logo ?? "",
    accent_color: platform.accent_color ?? "",
    short_description: platform.short_description,
    description: platform.description,
    website: platform.website ?? "",
    documentation: platform.documentation ?? "",
    categories: platform.categories,
    tags: platform.tags,
    pricing_free: platform.pricing_free,
    pricing_paid: platform.pricing_paid,
    pricing_notes: platform.pricing_notes ?? "",
    api_available: platform.api_available,
    open_source: platform.open_source,
    featured: platform.featured,
    trending: platform.trending,
    last_updated: platform.last_updated ?? "",
  };
}

function TextField({
  name,
  label,
  form,
  type = "text",
}: {
  name: keyof PlatformFormValues;
  label: string;
  form: ReturnType<typeof useForm<PlatformFormValues>>;
  type?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} value={String(field.value ?? "")} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function BooleanField({
  name,
  label,
  form,
}: {
  name: keyof PlatformFormValues;
  label: string;
  form: ReturnType<typeof useForm<PlatformFormValues>>;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-3 rounded-md border border-border p-3">
          <FormControl>
            <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="!mt-0">{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}

export function PlatformForm({
  platform,
  categories,
  action,
  submitLabel,
}: {
  platform?: PlatformRow;
  categories: CategoryRow[];
  action: (values: PlatformFormValues) => Promise<AdminActionState>;
  submitLabel: string;
}) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const form = useForm<PlatformFormValues>({
    resolver: zodResolver(platformSchema),
    defaultValues: valuesFromPlatform(platform),
  });

  function onSubmit(values: PlatformFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      if (!result.ok) {
        setFormError(result.message ?? "Unable to save platform.");
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
          if (messages?.[0]) {
            form.setError(field as keyof PlatformFormValues, {
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
        className="space-y-6 rounded-lg border border-border bg-background p-5"
      >
        {formError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {formError}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-3">
          <TextField form={form} name="name" label="Name" />
          <TextField form={form} name="slug" label="Slug" />
          <TextField form={form} name="company" label="Company" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <TextField form={form} name="logo" label="Logo path" />
          <TextField form={form} name="accent_color" label="Accent color" />
          <TextField form={form} name="last_updated" label="Last updated" type="date" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TextField form={form} name="website" label="Website URL" />
          <TextField form={form} name="documentation" label="Documentation URL" />
        </div>

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea {...field} value={String(field.value ?? "")} className="min-h-20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={String(field.value ?? "")} className="min-h-40" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <CategoryMultiSelect
                    categories={categories}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsInput value={field.value ?? []} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="pricing_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing notes</FormLabel>
              <FormControl>
                <Textarea {...field} value={String(field.value ?? "")} className="min-h-20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <BooleanField form={form} name="pricing_free" label="Free tier" />
          <BooleanField form={form} name="pricing_paid" label="Paid plans" />
          <BooleanField form={form} name="api_available" label="API available" />
          <BooleanField form={form} name="open_source" label="Open source" />
          <BooleanField form={form} name="featured" label="Featured" />
          <BooleanField form={form} name="trending" label="Trending" />
        </div>

        <div className="flex justify-end gap-2">
          <Button asChild type="button" variant="outline">
            <Link href="/admin/platforms">Cancel</Link>
          </Button>
          <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
