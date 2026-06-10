"use server";

import { submitContactService } from "@/lib/services/contact-messages";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";

export interface ContactActionState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

function validationError(error: unknown): ContactActionState {
  if (error && typeof error === "object" && "flatten" in error) {
    const flattened = (error as { flatten: () => { fieldErrors: ContactActionState["fieldErrors"] } }).flatten();
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  return { ok: false, message: "Unable to validate contact message." };
}

export async function submitContactAction(
  input: ContactFormValues,
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    await submitContactService(parsed.data);
    return {
      ok: true,
      message:
        "Thanks for contacting NeuralChooser. Your message has been received and we'll get back to you as soon as possible.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to send your message.",
    };
  }
}
