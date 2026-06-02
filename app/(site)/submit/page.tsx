import type { Metadata } from "next";
import { Sparkles, Megaphone, Target, CheckCircle } from "lucide-react";

import { createMetadata } from "@/lib/seo";
import { getAllCategories } from "@/lib/services/categories";
import { submitToolAction } from "@/lib/actions/tool-submission-actions";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitFormWrapper } from "./submit-form-wrapper";

export const metadata: Metadata = createMetadata({
  title: "Submit Your AI Tool",
  description:
    "Submit your AI tool to NeuralChooser and reach users searching for AI platforms, APIs, and software tools.",
  path: "/submit",
});

export default async function SubmitPage() {
  const categories = await getAllCategories();

  const benefits = [
    {
      icon: Sparkles,
      title: "Free Submission",
      description: "List your AI tool completely free. No hidden charges or recurring fees.",
    },
    {
      icon: Megaphone,
      title: "SEO-friendly Listing",
      description: "Get high-quality backlinks and traffic from target audiences actively searching for AI solutions.",
    },
    {
      icon: Target,
      title: "Category Placement",
      description: "Get categorized alongside top industry players so relevant users can find you.",
    },
    {
      icon: CheckCircle,
      title: "Reviewed for Quality",
      description: "All tools are vetted manually to maintain a premium standard of listings.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary animate-in fade-in duration-300">
          <Sparkles className="size-3.5" />
          Founder Platform
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
          Submit Your AI Tool
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Get your AI product discovered by thousands of users searching for tools, APIs, and AI platforms.
        </p>
      </div>

      {/* Grid Layout for Benefits and Form */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Benefits Panel */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why List on NeuralChooser?
            </h2>
            <p className="text-muted-foreground">
              Join a fast-growing directory of next-generation AI platforms. Showcase your performance, pricing, and API capabilities.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground leading-none">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Form Panel */}
        <div className="lg:col-span-7">
          <SubmitFormWrapper categories={categories} action={submitToolAction} />
        </div>
      </div>
    </div>
  );
}
