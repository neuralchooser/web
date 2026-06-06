"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  contactSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";
import type { ContactActionState } from "@/lib/actions/contact-actions";

interface ContactFormProps {
  action: (values: ContactFormValues) => Promise<ContactActionState>;
  onSuccess: () => void;
}

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm({ action, onSuccess }: ContactFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  function onSubmit(values: ContactFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      if (result.ok) {
        form.reset();
        onSuccess();
      } else {
        setFormError(result.message ?? "Unable to send your message.");
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              form.setError(field as keyof ContactFormValues, {
                message: messages[0],
              });
            }
          });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-md"
      >
        {formError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium animate-in fade-in duration-200">
            {formError}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    autoComplete="name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    {...field}
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
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Subject *</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is this about?"
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help (minimum 20 characters)"
                  className="min-h-32 bg-background/50 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 font-semibold text-base transition-all hover:scale-[1.01]"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
