"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import type { AIModel } from "@/types/model";

interface ModelLogoProps {
  model: AIModel;
  className?: string;
}

export function ModelLogo({
  model,
  className = "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-semibold",
}: ModelLogoProps) {
  const { resolvedTheme } = useTheme();
  const [hasError, setHasError] = useState(false);

  const logoFile = useMemo(() => {
    if (model.logo) {
      return model.logo.startsWith("/") ? model.logo.slice(1) : model.logo;
    }

    // Fallback to initials if no logo specified
    return null;
  }, [model.logo]);

  const initials = model.name.slice(0, 2).toUpperCase();
  const logoSrc = logoFile ? `/logos/models/${logoFile}` : null;
  const darkMode = resolvedTheme === "dark";
  const shouldInvertLogo =
    darkMode &&
    logoFile &&
    [
      "open-ai",
      "openai",
      "cursor",
      "elevenlabs",
      "flux",
      "grok",
      "llama",
      "midjourney",
      "runway",
      "suno",
    ].some(
      (key) =>
        model.slug.toLowerCase().includes(key) ||
        model.company.toLowerCase().includes(key),
    );

  return (
    <div className={className} style={{ color: model.accentColor }}>
      {hasError || !logoSrc ? (
        initials
      ) : (
        <Image
          src={logoSrc}
          alt={`${model.name} logo`}
          width={36}
          height={36}
          onError={() => setHasError(true)}
          className="object-contain"
          style={
            shouldInvertLogo
              ? { filter: "invert(1) brightness(1.3)" }
              : undefined
          }
          unoptimized
        />
      )}
    </div>
  );
}
