import { PlatformCard } from "@/components/cards/platform-card";
import type { AIPlatform } from "@/types/platform";

export function PlatformRail({
  title,
  description,
  platforms,
}: {
  title: string;
  description?: string;
  platforms: AIPlatform[];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 text-muted-foreground">{description}</p> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platforms.map((platform) => (
          <PlatformCard key={platform.slug} platform={platform} compact />
        ))}
      </div>
    </section>
  );
}
