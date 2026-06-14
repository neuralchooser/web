"use client";

import Link from "next/link";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePlatformAction } from "@/lib/actions/platform-actions";
import type { AIPlatform } from "@/types/platform";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const PAGE_SIZE = 10;

export function PlatformsTable({ platforms }: { platforms: AIPlatform[] }) {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setPage(1);
  }, [platforms]);

  const totalPages = Math.max(1, Math.ceil(platforms.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedPlatforms = platforms.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  if (!platforms.length) {
    return (
      <EmptyState
        title="No platforms found"
        description="Create a platform or adjust your search and filters."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead className="hidden lg:table-cell">Categories</TableHead>
             <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Web Clicks</TableHead>
            <TableHead className="text-right">Doc Clicks</TableHead>
            <TableHead className="w-14" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPlatforms.map((platform) => (
            <TableRow key={platform.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {platform.company} / {platform.slug}
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden max-w-sm lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {platform.categories.slice(0, 3).map((category) => (
                    <Badge key={category.slug} variant="muted">
                      {category.name}
                    </Badge>
                  ))}
                  {platform.categories.length > 3 ? (
                    <Badge variant="outline">
                      +{platform.categories.length - 3}
                    </Badge>
                  ) : null}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {platform.featured ? <Badge>Featured</Badge> : null}
                  {platform.trending ? (
                    <Badge variant="secondary">Trending</Badge>
                  ) : null}
                  {platform.apiAvailable ? (
                    <Badge variant="outline">API</Badge>
                  ) : null}
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {platform.analytics?.views ?? 0}
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {platform.analytics?.websiteClicks ?? 0}
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {platform.analytics?.documentationClicks ?? 0}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Open row actions"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/platforms/${platform.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/platforms/${platform.slug}`}>
                        View public page
                      </Link>
                    </DropdownMenuItem>
                    <div className="px-1 py-1">
                      <DeleteDialog
                        title={`Delete ${platform.name}?`}
                        description="This removes the platform from Supabase and the public directory."
                        action={() => deletePlatformAction(platform.id)}
                      />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex flex-col gap-2 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, platforms.length)} of {platforms.length} platforms
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
