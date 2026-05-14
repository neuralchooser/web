"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

import type { AIPlatform } from "@/types/platform";

interface PlatformLogoProps {
  platform: AIPlatform;
  className?: string;
}

export function PlatformLogo({
  platform,
  className = "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-semibold",
}: PlatformLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const { resolvedTheme } = useTheme();
  const logoFile = useMemo(() => {
    if (platform.logo) {
      return platform.logo.startsWith("/")
        ? platform.logo.slice(1)
        : platform.logo;
    }
    return null;
  }, [platform.logo]);

  const initials = platform.name.slice(0, 2).toUpperCase();
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
      "kimi",
      "ideogram",
      "recraft",
      "manus",
      "v0",
      "bolt",
      "googleaistudio",
    ].some(
      (key) =>
        platform.slug.toLowerCase().includes(key) ||
        platform.company.toLowerCase().includes(key),
    );

  return (
    <div className={className} style={{ color: platform.accentColor }}>
      {logoSrc && !imageFailed ? (
        <Image
          src={logoSrc}
          alt={`${platform.name} logo`}
          width={28}
          height={28}
          style={
            shouldInvertLogo
              ? { filter: "invert(1) brightness(1.3)" }
              : undefined
          }
          className="max-h-7 max-w-7 object-contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}
