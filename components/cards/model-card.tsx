import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Lock,
  Server,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCategoryName } from "@/lib/models";
import type { AIModel } from "@/types/model";

function LogoMark({ model }: { model: AIModel }) {
  return (
    <div
      className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-semibold"
      style={{ color: model.accentColor }}
    >
      {model.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function ModelCard({
  model,
  compact = false,
}: {
  model: AIModel;
  compact?: boolean;
}) {
  return (
    <Card className="group h-full overflow-hidden bg-card/80 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-start gap-4">
          <LogoMark model={model} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold tracking-tight">
                {model.name}
              </h3>
              {model.featured ? <Badge variant="muted">Featured</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {model.company}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {model.shortDescription}
        </p>

        {!compact ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {model.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary">
                {formatCategoryName(category)}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            {model.apiAvailable ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <Lock className="size-3.5" />
            )}
            {model.apiAvailable ? "API" : "No API"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {model.openSource ? (
              <Code2 className="size-3.5" />
            ) : (
              <Cpu className="size-3.5" />
            )}
            {model.openSource ? "Open" : "Closed"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Server className="size-3.5" />
            {model.localRunnable ? "Local" : "Cloud"}
          </span>
          <span>{model.pricing.type}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <Link
            href={`/models/${model.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
          >
            View model
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {model.website ? (
            <a
              href={model.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`${model.name} website`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
