"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { AIPlatform } from "@/types/platform";
import { CanvasLogo } from "./canvas-logo";

interface PlatformLogoProps {
  platform: AIPlatform;
  className?: string;
}

const LOGO_SIZE = 32;

export function PlatformLogo({
  platform,
  className = "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted overflow-hidden",
}: PlatformLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImageFailed(false);
  }, [platform.logo]);

  const initials = platform.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const darkMode = isMounted && resolvedTheme === "dark";

  const shouldInvertLogo =
    darkMode && Boolean(platform.logo) && Boolean(platform.isMonochromeLogo);

  const logoUrl = platform.logo ?? "";

  const isBlobOrData =
    logoUrl.startsWith("blob:") || logoUrl.startsWith("data:");

  const hasLogo =
    typeof logoUrl === "string" &&
    (logoUrl.startsWith("https://") ||
      logoUrl.startsWith("http://") ||
      logoUrl.startsWith("blob:") ||
      logoUrl.startsWith("data:"));

  return (
    <div
      className={className}
      style={{ color: platform.accentColor }}
      aria-label={`${platform.name} logo`}
    >
      {hasLogo && !imageFailed ? (
        isBlobOrData ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={`${platform.name} logo`}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            loading="lazy"
            decoding="async"
            className="h-8 w-8 object-contain p-1"
            style={
              shouldInvertLogo
                ? { filter: "invert(1) brightness(1.3)" }
                : undefined
            }
            onError={() => setImageFailed(true)}
          />
        ) : (
          <CanvasLogo
            src={logoUrl}
            size={LOGO_SIZE}
            invert={shouldInvertLogo}
            brightness={shouldInvertLogo ? 1.3 : 1}
            className="rounded-md p-1"
          />
        )
      ) : (
        <span className="select-none">{initials}</span>
      )}
    </div>
  );
}
