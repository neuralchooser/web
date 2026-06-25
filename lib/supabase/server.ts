import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getServerClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables",
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    global: { headers: { "x-ssr": "1" } },
  });

  return client;
}

// Lazily instantiate the client on first use rather than at module evaluation.
// Creating it eagerly at import time can throw "supabaseKey is required" if the
// module is evaluated before the environment is fully loaded (e.g. on-demand
// dev compilation). The Proxy preserves the `supabaseServer.from(...)` API.
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getServerClient(), prop, receiver);
    return typeof value === "function" ? value.bind(getServerClient()) : value;
  },
});
