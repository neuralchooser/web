"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { AIPlatform } from "@/types/platform";
import { CanvasLogo } from "./canvas-logo";

interface PlatformLogoProps {
  platform: AIPlatform;
  className?: string;
}

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

  const initials = platform.name.slice(0, 2).toUpperCase();

  const darkMode = isMounted
    ? resolvedTheme === "dark"
    : typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

  const shouldInvertLogo =
    darkMode && platform.logo && (platform.isMonochromeLogo as any);

  const isBlobOrData =
    typeof platform.logo === "string" &&
    (platform.logo.startsWith("blob:") || platform.logo.startsWith("data:"));

  return (
    <div className={className} style={{ color: platform.accentColor }}>
      {platform.logo && !imageFailed && platform.logo.startsWith("https://") ? (
        isBlobOrData ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={platform.logo}
            alt={`${platform.name} logo`}
            width={28}
            height={28}
            className="max-h-7 max-w-7 object-contain"
            style={
              shouldInvertLogo
                ? { filter: "invert(1) brightness(1.3)" }
                : undefined
            }
            onError={() => setImageFailed(true)}
          />
        ) : (
          <CanvasLogo
            src={platform.logo}
            size={28}
            invert={shouldInvertLogo}
            brightness={shouldInvertLogo ? 1.3 : 1}
            className="rounded-md"
          />
        )
      ) : (
        initials
      )}
    </div>
  );
}
