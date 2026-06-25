"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { HOMEPAGE_SECTION_OPTIONS } from "@/lib/constants/homepage-sections";

export function HomepageSectionsSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  function toggle(section: string, checked: boolean) {
    if (checked) {
      onChange(Array.from(new Set([...value, section])));
    } else {
      onChange(value.filter((item) => item !== section));
    }
  }

  return (
    <div className="grid gap-2 rounded-md border border-border p-3 sm:grid-cols-2">
      {HOMEPAGE_SECTION_OPTIONS.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
        >
          <Checkbox
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              toggle(option.value, checked === true)
            }
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
