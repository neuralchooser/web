import type { Metadata } from "next";
import { Mail, MessageSquare, Handshake, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { submitContactAction } from "@/lib/actions/contact-actions";
import { createMetadata } from "@/lib/seo";
import { ContactFormWrapper } from "./contact-form-wrapper";

export const metadata: Metadata = createMetadata({
  title: "Contact NeuralChooser",
  description:
    "Contact NeuralChooser for questions, partnerships, tool updates, and feedback.",
  path: "/contact",
});

const contactReasons = [
  {
    icon: MessageSquare,
    title: "Questions",
    description: "Ask about listings, categories, or how NeuralChooser works.",
  },
  {
    icon: Sparkles,
    title: "Tool corrections",
    description: "Report outdated details or suggest improvements to a listing.",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description: "Explore collaborations, integrations, or directory partnerships.",
  },
  {
    icon: Mail,
    title: "General feedback",
    description: "Share ideas that help us improve discovery and curation.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary animate-in fade-in duration-300">
          <Mail className="size-3.5" />
          Get in touch
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Reach out to NeuralChooser for questions, tool corrections, partnerships,
          or general feedback. We read every message.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How can we help?
            </h2>
            <p className="text-muted-foreground">
              Whether you need support, want to correct a listing, or have a
              partnership idea, send us a note and we&apos;ll respond as soon as we can.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contactReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <Card
                  key={reason.title}
                  className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
                >
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground leading-none">
                        {reason.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
                        {reason.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactFormWrapper action={submitContactAction} />
        </div>
      </div>
    </div>
  );
}
