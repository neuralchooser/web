"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [draft, setDraft] = React.useState("");

  function addTags(raw: string) {
    const tags = raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!tags.length) return;

    onChange(Array.from(new Set([...value, ...tags])));
    setDraft("");
  }

  return (
    <div className="space-y-3">
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => addTags(draft)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTags(draft);
          }
        }}
        placeholder="Type a tag and press Enter"
      />
      {value.length ? (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-5"
                onClick={() => onChange(value.filter((item) => item !== tag))}
              >
                <X className="size-3" />
                <span className="sr-only">Remove {tag}</span>
              </Button>
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
