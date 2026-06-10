"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminCookieValue,
} from "@/lib/auth/admin-cookie";
import { validateAdminCredentials } from "@/lib/auth/admin-credentials";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  recordFailedLogin,
} from "@/lib/auth/rate-limit";
import type { AdminActionState } from "@/types/admin";

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown"
  );
}

export async function loginAdminAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const ip = await getClientIp();

  const { allowed, retryAfterMinutes } = await checkLoginRateLimit(ip);
  if (!allowed) {
    return {
      ok: false,
      message: `Too many failed attempts. Try again in ${retryAfterMinutes} minutes.`,
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      ok: false,
      message: "Email and password are required.",
    };
  }

  if (!validateAdminCredentials(email, password)) {
    await recordFailedLogin(ip);
    return {
      ok: false,
      message: "Invalid admin credentials.",
    };
  }

  await clearLoginAttempts(ip);

  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_COOKIE_NAME,
    await createAdminCookieValue(email),
    adminCookieOptions,
  );

  redirect("/admin");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
