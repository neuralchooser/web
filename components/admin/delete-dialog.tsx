"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AdminActionState } from "@/types/admin";

export function DeleteDialog({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: () => Promise<AdminActionState>;
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const router = useRouter();

  function onDelete() {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        setOpen(false);
        router.refresh();
      } else {
        setError(result.message ?? "Unable to delete item.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
          <Trash2 className="size-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{description}</p>
        {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" type="button" onClick={onDelete} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
