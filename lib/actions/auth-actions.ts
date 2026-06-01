"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminCookieValue,
} from "@/lib/auth/admin-cookie";
import { validateAdminCredentials } from "@/lib/auth/admin-credentials";
import type { AdminActionState } from "@/types/admin";

export async function loginAdminAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      ok: false,
      message: "Email and password are required.",
    };
  }

  if (!validateAdminCredentials(email, password)) {
    return {
      ok: false,
      message: "Invalid admin credentials.",
    };
  }

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
