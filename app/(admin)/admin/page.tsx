import { BarChart3, FolderTree, Sparkles, TrendingUp } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/admin-session";
import { listCategories } from "@/lib/repositories/categories-repository";
import { listPlatforms } from "@/lib/repositories/platforms-repository";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const statCards = [
  { label: "Platforms", icon: BarChart3 },
  { label: "Categories", icon: FolderTree },
  { label: "Featured", icon: Sparkles },
  { label: "Trending", icon: TrendingUp },
];

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [platforms, categories] = await Promise.all([
    listPlatforms(),
    listCategories(),
  ]);
  const stats = [
    platforms.length,
    categories.length,
    platforms.filter((platform) => platform.featured).length,
    platforms.filter((platform) => platform.trending).length,
  ];
  const recentlyUpdated = [...platforms]
    .sort((left, right) =>
      (right.last_updated ?? "1900-01-01").localeCompare(
        left.last_updated ?? "1900-01-01",
      ),
    )
    .slice(0, 6);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Manage the public AI platform directory content."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={card.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats[index]}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-background">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold">Recently updated</h2>
        </div>
        <div className="divide-y divide-border">
          {recentlyUpdated.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p className="font-medium">{platform.name}</p>
                <p className="text-sm text-muted-foreground">{platform.company}</p>
              </div>
              <Badge variant="muted">{platform.last_updated ?? "No date"}</Badge>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
