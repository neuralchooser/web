import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ComparisonPair } from "@/lib/compare";
import { ModelLogo } from "./model-logo";

export function ComparisonCard({ pair }: { pair: ComparisonPair }) {
  const [left, right] = pair.models;

  return (
    <Link href={`/compare/${pair.slug}`} className="group block h-full">
      <Card className="h-full bg-card/80 transition-all hover:-translate-y-0.5 hover:border-foreground/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-muted font-semibold">
              <ModelLogo model={left} />
            </div>
            <ArrowRightLeft className="size-4 text-muted-foreground" />
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-muted font-semibold">
              <ModelLogo model={right} />
            </div>
          </div>
          <h3 className="mt-5 font-semibold tracking-tight">
            {left.name} vs {right.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Compare pricing, context, strengths, weaknesses, and best-fit
            workflows.
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
