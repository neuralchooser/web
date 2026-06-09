"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FolderTree, LayoutDashboard, LogOut, Menu, MessageSquare, Send } from "lucide-react";

import { logoutAdminAction } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/platforms", label: "Platforms", icon: BarChart3 },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/submissions", label: "Submissions", icon: Send },
  { href: "/admin/contact", label: "Contact", icon: MessageSquare },
];

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              active && "bg-accent text-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutForm() {
  return (
    <form action={logoutAdminAction}>
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start text-muted-foreground"
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </form>
  );
}

export function AdminSidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background lg:block">
        <div className="flex h-full flex-col px-4 py-5">
          <div className="px-3">
            <p className="text-lg font-semibold tracking-tight">NeuralChooser</p>
            <p className="mt-1 text-xs text-muted-foreground">Admin console</p>
          </div>
          <div className="mt-8 flex-1">
            <Navigation />
          </div>
          <LogoutForm />
        </div>
      </aside>

      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open admin menu">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Admin console</SheetTitle>
            </SheetHeader>
            <div className="mt-8 grid h-[calc(100vh-8rem)]">
              <Navigation />
              <div className="self-end">
                <LogoutForm />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
