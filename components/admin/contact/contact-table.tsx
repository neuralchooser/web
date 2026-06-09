"use client";

import { EmptyState } from "@/components/admin/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ContactMessageRow } from "@/types/admin";

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

export function ContactTable({
  messages,
}: {
  messages: ContactMessageRow[];
}) {
  if (!messages.length) {
    return (
      <EmptyState
        title="No messages yet"
        description="Contact messages submitted from the site will appear here."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Subject</TableHead>
            <TableHead className="hidden lg:table-cell">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id}>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {formatDate(msg.created_at)}
              </TableCell>
              <TableCell className="font-medium">{msg.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {msg.email}
              </TableCell>
              <TableCell className="hidden max-w-xs truncate md:table-cell">
                {msg.subject}
              </TableCell>
              <TableCell className="hidden max-w-sm truncate text-muted-foreground lg:table-cell">
                {msg.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
