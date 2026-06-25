import { supabaseServer } from "@/lib/supabase/server";
import type { ToolSubmissionInput } from "@/lib/validators/tool-submission-schema";
import type { ToolSubmissionRow } from "@/types/admin";

function assertSupabaseConfig() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables",
    );
  }
}

export async function createToolSubmission(input: ToolSubmissionInput) {
  assertSupabaseConfig();

  const { error } = await supabaseServer.from("tool_submissions").insert({
    ...input,
    status: "pending",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function listToolSubmissions() {
  assertSupabaseConfig();

  const { data, error } = await supabaseServer
    .from("tool_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as ToolSubmissionRow[];
}
