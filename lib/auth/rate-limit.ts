import { supabaseServer } from "@/lib/supabase/server";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMinutes?: number;
}

export async function checkLoginRateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();

    const { count, error } = await supabaseServer
      .from("login_attempts")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("attempted_at", windowStart);

    if (error) {
      console.error("[rate-limit] check error:", error.message);
      return { allowed: true };
    }

    if ((count ?? 0) >= MAX_ATTEMPTS) {
      return { allowed: false, retryAfterMinutes: 15 };
    }

    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

export async function recordFailedLogin(ip: string): Promise<void> {
  try {
    await supabaseServer.from("login_attempts").insert({ ip });
  } catch {
    // non-blocking
  }
}

export async function clearLoginAttempts(ip: string): Promise<void> {
  try {
    await supabaseServer.from("login_attempts").delete().eq("ip", ip);
  } catch {
    // non-blocking
  }
}
