"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/admin/submit-button";
import { CategoryMultiSelect } from "@/components/admin/platforms/category-multi-select";
import { TagsInput } from "@/components/admin/platforms/tags-input";
import { PlatformLogo } from "@/components/cards/platform-logo";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  adminToolSubmissionSchema,
  type AdminToolSubmissionFormValues,
} from "@/lib/validators/admin-tool-submission-schema";
import type { AdminActionState, CategoryRow, ToolSubmissionRow } from "@/types/admin";

export function SubmissionDetailsForm({
  submission,
  categories,
  action,
}: {
  submission: ToolSubmissionRow;
  categories: CategoryRow[];
  action: (values: AdminToolSubmissionFormValues) => Promise<AdminActionState>;
}) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const form = useForm<AdminToolSubmissionFormValues>({
    resolver: zodResolver(adminToolSubmissionSchema),
    defaultValues: {
      name: submission.name,
      company: submission.company ?? "",
      website: submission.website,
      documentation: submission.documentation ?? "",
      short_description: submission.short_description,
      description: submission.description ?? "",
      categories: submission.categories ?? [],
      tags: submission.tags ?? [],
      founder_email: submission.founder_email,
      logo: submission.logo ?? "",
      pricing_free: submission.pricing_free,
      pricing_paid: submission.pricing_paid,
      api_available: submission.api_available,
      open_source: submission.open_source,
      status: submission.status,
    },
  });

  function onSubmit(values: AdminToolSubmissionFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      if (!result.ok) {
        setFormError(result.message ?? "Unable to save submission.");
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
          if (messages?.[0]) {
            form.setError(field as keyof AdminToolSubmissionFormValues, {
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

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tool name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input {...field} placeholder="https://example.com/logo.svg" />
                  {field.value ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Preview:</p>
                      <PlatformLogo
                        platform={{
                          id: submission.id,
                          slug: "",
                          name: submission.name,
                          company: submission.company ?? "",
                          shortDescription: submission.short_description,
                          description: submission.description ?? "",
                          categories: [],
                          pricing: {
                            free: submission.pricing_free,
                            paid: submission.pricing_paid,
                          },
                          logo: field.value,
                        }}
                        className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-lg font-semibold shadow-sm"
                      />
                    </div>
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documentation</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="founder_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Founder email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-20" />
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
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <CategoryMultiSelect
                    categories={categories}
                    value={field.value ?? []}
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="pricing_free"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Free tier</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pricing_paid"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Paid plans</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="api_available"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">API available</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="open_source"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 rounded-md border border-border p-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Open source</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="max-w-72">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-2 rounded-md border border-border bg-muted/30 p-3 text-sm">
          <p>
            <span className="text-muted-foreground">Created:</span>{" "}
            {submission.created_at ? new Date(submission.created_at).toLocaleString() : "N/A"}
          </p>
          <p>
            <span className="text-muted-foreground">Last updated:</span>{" "}
            {submission.updated_at ? new Date(submission.updated_at).toLocaleString() : "N/A"}
          </p>
          <p className="break-all">
            <span className="text-muted-foreground">Submission ID:</span>{" "}
            {submission.id}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button asChild type="button" variant="outline">
            <Link href="/admin/submissions">Back</Link>
          </Button>
          <SubmitButton pending={pending}>Save changes</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
