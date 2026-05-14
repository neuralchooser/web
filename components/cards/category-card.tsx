import Link from "next/link";
import {
  AudioWaveform,
  Boxes,
  Clapperboard,
  Code2,
  Image,
  MessageSquareText,
  Music2,
  SearchCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/model";

const icons = {
  MessageSquareText,
  Image,
  Clapperboard,
  Code2,
  AudioWaveform,
  Music2,
  SearchCheck,
  Boxes,
};

export function CategoryCard({
  category,
  count,
}: {
  category: Category;
  count?: number;
}) {
  const Icon = icons[category.icon as keyof typeof icons] ?? Boxes;

  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden bg-card/80 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
        <CardContent className="p-5">
          <div
            className={`flex size-11 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} text-white shadow-sm`}
          >
            <Icon className="size-5" />
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <h3 className="font-semibold tracking-tight">{category.name}</h3>
            {typeof count === "number" ? (
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                {count}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
