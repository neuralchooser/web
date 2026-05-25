"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

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
import { deleteCategoryAction } from "@/lib/actions/category-actions";
import type { CategoryRow } from "@/types/admin";

export function CategoriesTable({ categories }: { categories: CategoryRow[] }) {
  if (!categories.length) {
    return (
      <EmptyState
        title="No categories found"
        description="Create a category or adjust your search and filters."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="w-14" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">{category.slug}</p>
              </TableCell>
              <TableCell className="hidden max-w-md text-muted-foreground md:table-cell">
                {category.description ?? "No description"}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {category.featured ? <Badge>Featured</Badge> : <Badge variant="muted">Standard</Badge>}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open row actions">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/categories/${category.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/categories/${category.slug}`}>View public page</Link>
                    </DropdownMenuItem>
                    <div className="px-1 py-1">
                      <DeleteDialog
                        title={`Delete ${category.name}?`}
                        description="This removes the category from Supabase. Existing platform category arrays are not automatically changed."
                        action={() => deleteCategoryAction(category.id)}
                      />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
