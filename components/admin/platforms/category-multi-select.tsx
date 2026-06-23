"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { CategoryRow } from "@/types/admin";

export function CategoryMultiSelect({
  categories,
  value,
  onChange,
}: {
  categories: CategoryRow[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  function toggle(id: string, checked: boolean) {
    if (checked) {
      onChange(Array.from(new Set([...value, id])));
    } else {
      onChange(value.filter((item) => item !== id));
    }
  }

  return (
    <div className="grid max-h-64 gap-2 overflow-y-auto rounded-md border border-border p-3 sm:grid-cols-2">
      {categories.map((category) => (
        <label
          key={category.id}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
        >
          <Checkbox
            checked={value.includes(category.id)}
            onCheckedChange={(checked) => toggle(category.id, checked === true)}
          />
          <span>{category.name}</span>
        </label>
      ))}
    </div>
  );
}
