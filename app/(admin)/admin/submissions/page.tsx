import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SubmissionsTable } from "@/components/admin/submissions/submissions-table";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listToolSubmissions } from "@/lib/repositories/tool-submissions-repository";

export const metadata = {
  title: "Admin Tool Submissions",
  robots: { index: false, follow: false },
};

export default async function AdminSubmissionsPage() {
  await requireAdmin();

  const submissions = await listToolSubmissions();

  return (
    <>
      <AdminPageHeader
        title="Tool submissions"
        description="Review and manage tools submitted through the public form."
      />
      <SubmissionsTable submissions={submissions} />
    </>
  );
}
