"use client";

import * as React from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactSuccess } from "@/components/contact/contact-success";
import type { ContactActionState } from "@/lib/actions/contact-actions";
import type { ContactFormValues } from "@/lib/validators/contact";

interface ContactFormWrapperProps {
  action: (values: ContactFormValues) => Promise<ContactActionState>;
}

export function ContactFormWrapper({ action }: ContactFormWrapperProps) {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="animate-in fade-in zoom-in duration-300">
        <ContactSuccess onReset={() => setSubmitted(false)} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <ContactForm action={action} onSuccess={() => setSubmitted(true)} />
    </div>
  );
}
