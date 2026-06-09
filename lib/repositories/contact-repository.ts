import { supabaseServer } from "@/lib/supabase/server";
import type { ContactInput } from "@/lib/validators/contact";
import type { ContactMessageRow } from "@/types/admin";

function assertSupabaseConfig() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY environment variables",
    );
  }
}

export async function createContactMessage(input: ContactInput) {
  assertSupabaseConfig();

  const { error } = await supabaseServer.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    subject: input.subject,
    message: input.message,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function listContactMessages() {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as ContactMessageRow[];
}
