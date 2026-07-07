"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/admin/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ToolSubmissionRow } from "@/types/admin";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const statusVariant: Record<
  ToolSubmissionRow["status"],
  "default" | "secondary" | "destructive" | "muted"
> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
};

export function SubmissionsTable({
  submissions,
}: {
  submissions: ToolSubmissionRow[];
}) {
  if (!submissions.length) {
    return (
      <EmptyState
        title="No submissions yet"
        description="Tool submissions from the public form will appear here."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Tool</TableHead>
            <TableHead className="hidden md:table-cell">Company</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {formatDate(sub.created_at)}
              </TableCell>
              <TableCell>
                <p className="font-medium">{sub.name}</p>
                <p className="truncate text-xs text-muted-foreground max-w-60">
                  {sub.short_description}
                </p>
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {sub.company ?? "—"}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {sub.founder_email}
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[sub.status]}>
                  {sub.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/submissions/${sub.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
