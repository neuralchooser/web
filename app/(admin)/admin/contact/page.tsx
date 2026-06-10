import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ContactTable } from "@/components/admin/contact/contact-table";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listContactMessages } from "@/lib/repositories/contact-repository";

export const metadata = {
  title: "Admin Contact Messages",
  robots: { index: false, follow: false },
};

export default async function AdminContactPage() {
  await requireAdmin();

  const messages = await listContactMessages();

  return (
    <>
      <AdminPageHeader
        title="Contact messages"
        description="View messages submitted through the contact form."
      />
      <ContactTable messages={messages} />
    </>
  );
}
