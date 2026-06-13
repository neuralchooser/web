import { ExternalLink, Layers3 } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PlatformCard } from "@/components/cards/platform-card";
import { PlatformLogo } from "@/components/cards/platform-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllPlatforms,
  getPlatformBySlug,
  getRelatedPlatforms,
} from "@/lib/platforms";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const platforms = await getAllPlatforms();
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata(
  props: PageProps<"/platforms/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const platform = await getPlatformBySlug(slug);

  if (!platform)
    return createMetadata({
      title: "Platform not found",
      path: `/platforms/${slug}`,
    });

  return createMetadata({
    title: `${platform.name} AI Platform`,
    description: platform.shortDescription,
    path: `/platforms/${platform.slug}`,
  });
}

export default async function PlatformPage(
  props: PageProps<"/platforms/[slug]">,
) {
  const { slug } = await props.params;
  const platform = await getPlatformBySlug(slug);

  if (!platform) notFound();

  const relatedPlatforms = await getRelatedPlatforms(platform);

  return (
    <article>
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <div className="flex flex-wrap gap-2">
              {platform.categories.map((category) => (
                <Badge key={category.slug} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <PlatformLogo
                platform={platform}
                className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-lg font-semibold shadow-sm"
              />
              <div>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                  {platform.name}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  {platform.company}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {platform.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {platform.website ? (
                <Button asChild>
                  <a href={platform.website} target="_blank" rel="noreferrer">
                    Official website
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ) : null}
              {platform.documentation ? (
                <Button asChild variant="outline">
                  <a
                    href={platform.documentation}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Documentation
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <Card className="bg-card/90">
            <CardContent className="grid gap-4 p-6">
              {[
                [
                  "Pricing",
                  platform.pricing.free && platform.pricing.paid
                    ? "Free + paid"
                    : platform.pricing.free
                      ? "Free"
                      : "Paid",
                ],
                ["API", platform.apiAvailable ? "Available" : "Unavailable"],
                ["Open source", platform.openSource ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-right font-medium">{value}</span>
                </div>
              ))}
              {platform.pricing.notes ? (
                <p className="border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                  {platform.pricing.notes}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-8">
          {platform.models?.length ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <Layers3 className="size-5" />
                  Available models and products
                </h2>
                <div className="mt-5 grid gap-3">
                  {platform.models.map((model) => (
                    <div
                      key={model.name}
                      className="rounded-lg border border-border bg-muted/20 p-4"
                    >
                      <p className="font-medium">{model.name}</p>
                      {model.description ? (
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {model.description}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {relatedPlatforms.length ? (
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Related platforms
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPlatforms.map((related) => (
                  <PlatformCard key={related.slug} platform={related} compact />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold tracking-tight">Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(platform.tags ?? []).map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </article>
  );
}
