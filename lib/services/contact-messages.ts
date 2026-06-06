import { createContactMessage } from "@/lib/repositories/contact-repository";
import type { ContactInput } from "@/lib/validators/contact";

export async function submitContactService(input: ContactInput): Promise<void> {
  await createContactMessage(input);

  // Future: send email notification via Resend or similar provider.
  // await sendContactNotification(input);
}
