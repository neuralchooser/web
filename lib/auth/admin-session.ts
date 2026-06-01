import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_COOKIE_NAME, verifyAdminCookieValue } from "@/lib/auth/admin-cookie";

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get(ADMIN_COOKIE_NAME));
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
