"use client";

import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/layout/theme-toggle";

const titles: Array<[string, string]> = [
  ["/admin/platforms/new", "New platform"],
  ["/admin/platforms", "Platforms"],
  ["/admin/categories/new", "New category"],
  ["/admin/categories", "Categories"],
  ["/admin", "Dashboard"],
];

export function AdminHeader() {
  const pathname = usePathname();
  const title =
    titles.find(([path]) =>
      path === "/admin" ? pathname === path : pathname.startsWith(path),
    )?.[1] ?? "Admin";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 pl-20 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-muted-foreground">Admin</p>
          <h1 className="text-base font-semibold">{title}</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
