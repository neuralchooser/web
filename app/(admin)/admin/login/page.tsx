import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">NeuralChooser</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Admin login
          </h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
