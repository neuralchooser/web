"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { CategoryMultiSelect } from "@/components/admin/platforms/category-multi-select";
import { TagsInput } from "@/components/admin/platforms/tags-input";
import { PlatformLogo } from "@/components/cards/platform-logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  toolSubmissionSchema,
  type ToolSubmissionFormValues,
} from "@/lib/validators/tool-submission-schema";
import type { SubmissionActionState } from "@/lib/actions/tool-submission-actions";
import type { PlatformCategory, AIPlatform } from "@/types/platform";

interface SubmitToolFormProps {
  categories: PlatformCategory[];
  action: (values: ToolSubmissionFormValues) => Promise<SubmissionActionState>;
  onSuccess: () => void;
}

const defaultValues: ToolSubmissionFormValues = {
  name: "",
  website: "",
  company: "",
  short_description: "",
  description: "",
  categories: [],
  tags: [],
  founder_email: "",
  logo: "",
  documentation: "",
  pricing_free: false,
  pricing_paid: false,
  api_available: false,
  open_source: false,
};

function sanitizeFileName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isSvgFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return (
    extension === "svg" &&
    (file.type === "image/svg+xml" || file.type === "")
  );
}

function LogoUploadField({
  form,
}: {
  form: ReturnType<typeof useForm<ToolSubmissionFormValues>>;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const toolName = form.watch("name");

  async function handleFileUpload(file: File) {
    setUploadError(null);

    if (!isSvgFile(file)) {
      setUploadError("Only SVG files are allowed.");
      return;
    }

    setUploading(true);

    const name = toolName ? sanitizeFileName(toolName) : `${Date.now()}`;
    const filePath = `submission-logos/${name}-${Date.now()}.svg`;

    const body = new FormData();
    body.append("file", file);
    body.append("filePath", filePath);

    const response = await fetch("/api/submissions/upload", {
      method: "POST",
      body,
    });

    const json = (await response.json()) as {
      publicUrl?: string;
      error?: string;
    };

    if (!response.ok || !json.publicUrl) {
      setUploadError(json.error ?? "Upload failed.");
      setUploading(false);
      return;
    }

    form.setValue("logo", json.publicUrl);
    setUploading(false);
  }

  const previewPlatform = {
    id: "",
    slug: "",
    name: toolName || "Tool",
    company: "",
    shortDescription: "",
    description: "",
    categories: [],
    pricing: { free: false, paid: false },
  } satisfies AIPlatform;

  return (
    <FormField
      control={form.control}
      name="logo"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium">Tool Logo *</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Input
                type="file"
                accept=".svg,image/svg+xml"
                className="bg-background/50"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  await handleFileUpload(file);
                  event.target.value = "";
                }}
                disabled={uploading}
              />
              {field.value ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Preview:</p>
                  <PlatformLogo
                    platform={{ ...previewPlatform, logo: field.value }}
                    className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-lg font-semibold shadow-sm"
                  />
                </div>
              ) : null}
            </div>
          </FormControl>
          <FormDescription className="text-xs text-muted-foreground">
            Upload an SVG logo. This is required and will appear on the site.
          </FormDescription>
          <FormMessage />
          {uploadError ? (
            <p className="text-sm text-destructive">{uploadError}</p>
          ) : null}
          {uploading ? (
            <p className="text-sm text-muted-foreground">Uploading logo…</p>
          ) : null}
        </FormItem>
      )}
    />
  );
}

export function SubmitToolForm({
  categories,
  action,
  onSuccess,
}: SubmitToolFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  const form = useForm<ToolSubmissionFormValues>({
    resolver: zodResolver(toolSubmissionSchema),
    defaultValues,
  });

  function onSubmit(values: ToolSubmissionFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      if (result.ok) {
        form.reset();
        onSuccess();
      } else {
        setFormError(result.message ?? "Unable to submit your tool.");
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              form.setError(field as keyof ToolSubmissionFormValues, {
                message: messages[0],
              });
            }
          });
        }
      }
    });
  }

  // Map PlatformCategory to what CategoryMultiSelect expects (CategoryRow)
  const mappedCategories = categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    featured: cat.featured ?? false,
    is_active: true,
    description: cat.description ?? null,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-md"
      >
        {formError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium animate-in fade-in duration-200">
            {formError}
          </div>
        )}

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/50 pb-2">
            General Information
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Tool Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. ChatPDF"
                      {...field}
                      className="bg-background/50"
                    />
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
                  <FormLabel className="font-medium">
                    Company Name (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. AI Labs Inc."
                      {...field}
                      value={field.value ?? ""}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LogoUploadField form={form} />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Website URL *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      type="url"
                      {...field}
                      className="bg-background/50"
                    />
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
                  <FormLabel className="font-medium">
                    Documentation URL (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://docs.example.com"
                      type="url"
                      {...field}
                      value={field.value ?? ""}
                      className="bg-background/50"
                    />
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
                <FormLabel className="font-medium">Founder Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                    className="bg-background/50"
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  For notification purposes only. We won&apos;t display this
                  publicly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/50 pb-2">
            Product Details
          </h3>

          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  Short Description *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief 1-sentence summary of your tool (min 10 chars)"
                    className="min-h-16 bg-background/50 resize-y"
                    {...field}
                  />
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
                <FormLabel className="font-medium">
                  Full Description (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what your tool does, features, target audience, and key benefits..."
                    className="min-h-32 bg-background/50 resize-y"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-medium mb-1">
                    Categories *
                  </FormLabel>
                  <FormControl>
                    <CategoryMultiSelect
                      categories={mappedCategories}
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
                <FormItem className="flex flex-col">
                  <FormLabel className="font-medium mb-1">
                    Tags (Optional)
                  </FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value ?? []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground mt-1">
                    Press Enter or comma to add tags.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/50 pb-2">
            Pricing &amp; Features
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="pricing_free"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 rounded-xl border border-border/50 p-4 bg-background/30 hover:bg-background/60 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="font-medium cursor-pointer">
                      Pricing Free
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Has a permanently free plan or tier.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricing_paid"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 rounded-xl border border-border/50 p-4 bg-background/30 hover:bg-background/60 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="font-medium cursor-pointer">
                      Pricing Paid
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Has paid subscription, usage, or commercial plans.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="api_available"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 rounded-xl border border-border/50 p-4 bg-background/30 hover:bg-background/60 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="font-medium cursor-pointer">
                      API Available
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Exposes an API for programmatic integration.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="open_source"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 rounded-xl border border-border/50 p-4 bg-background/30 hover:bg-background/60 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="font-medium cursor-pointer">
                      Open Source
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Source code is publicly available under open-source
                      license.
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="cursor-pointer w-full h-11 font-semibold text-base transition-all hover:scale-[1.01]"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Submitting Tool...
            </>
          ) : (
            "Submit AI Tool"
          )}
        </Button>
      </form>
    </Form>
  );
}
