import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/auth/admin-session";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAdminSession();

  if (!session) {
    return children;
  }

  return <AdminShell>{children}</AdminShell>;
}
