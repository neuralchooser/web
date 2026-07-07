import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SubmissionDetailsForm } from "@/components/admin/submissions/submission-details-form";
import { updateSubmissionAction } from "@/lib/actions/admin-submission-actions";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listCategories } from "@/lib/repositories/categories-repository";
import { getToolSubmissionById } from "@/lib/repositories/tool-submissions-repository";

export const metadata = {
  title: "Submission details",
  robots: { index: false, follow: false },
};

export default async function SubmissionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [submission, categories] = await Promise.all([
    getToolSubmissionById(id),
    listCategories(),
  ]);

  if (!submission) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Submission: ${submission.name}`}
        description="Review full submission details, update fields, and change approval status."
      />
      <SubmissionDetailsForm
        submission={submission}
        categories={categories}
        action={updateSubmissionAction.bind(null, submission.id)}
      />
    </>
  );
}
