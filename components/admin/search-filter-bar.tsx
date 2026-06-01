import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchFilterBar({
  search,
  children,
}: {
  search?: string;
  children?: React.ReactNode;
}) {
  return (
    <form className="mb-6 grid gap-3 rounded-lg border border-border bg-background p-4 lg:grid-cols-[1fr_auto]">
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="search"
          name="search"
          defaultValue={search}
          placeholder="Search by name, slug, company, category, or tag"
          className="pl-10"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {children}
        <Button type="submit" variant="outline">
          Apply
        </Button>
      </div>
    </form>
  );
}

export function BooleanFilter({
  name,
  value,
  label,
}: {
  name: string;
  value?: string;
  label: string;
}) {
  return (
    <div className="min-w-36">
      <Label className="sr-only">{label}</Label>
      <Select name={name} defaultValue={value ?? "all"}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{label}</SelectItem>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
