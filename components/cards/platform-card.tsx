import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Lock,
} from "lucide-react";

import { PlatformLogo } from "@/components/cards/platform-logo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AIPlatform } from "@/types/platform";

export function PlatformCard({
  platform,
  compact = false,
}: {
  platform: AIPlatform;
  compact?: boolean;
}) {
  return (
    <Card className="group h-full overflow-hidden bg-card/80 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-start gap-4">
          <PlatformLogo platform={platform} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold tracking-tight">
                {platform.name}
              </h3>
              {platform.featured ? (
                <Badge variant="muted">Featured</Badge>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {platform.company}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {platform.shortDescription}
        </p>

        {!compact ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {platform.categories.slice(0, 2).map((category) => (
              <Badge key={category.slug} variant="secondary">
                {category.name}
              </Badge>
            ))}
            {platform.categories.slice(2).length > 0 ? (
              <Badge variant="outline">
                +{platform.categories.slice(2).length}
              </Badge>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            {platform.apiAvailable ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <Lock className="size-3.5" />
            )}
            {platform.apiAvailable ? "API" : "No API"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {platform.openSource ? (
              <Code2 className="size-3.5" />
            ) : (
              <Cpu className="size-3.5" />
            )}
            {platform.openSource ? "Open" : "Closed"}
          </span>
          <span>{platform.pricing.free ? "Free tier" : "Paid only"}</span>
          <span>{platform.pricing.paid ? "Paid plans" : "Free"}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <Link
            href={`/platforms/${platform.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
          >
            View platform
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {platform.website ? (
            <a
              href={platform.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`${platform.name} website`}
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
