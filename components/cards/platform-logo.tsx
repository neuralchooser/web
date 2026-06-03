"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initials = platform.name.slice(0, 2).toUpperCase();
  // Only apply dark mode logic after hydration
  const darkMode = isMounted && resolvedTheme === "dark";

  const shouldInvertLogo =
    darkMode && platform.logo && platform.isMonochromeLogo;
  // Reset failure state when a new logo URL is provided so re-tries can show
  // the image (for example when a blob preview or new public URL appears).
  useEffect(() => {
    setImageFailed(false);
  }, [platform.logo]);

  // Some preview URLs (blob: or data:) are not supported by next/image —
  // render a normal <img> for those so local previews display immediately.
  const isBlobOrData =
    typeof platform.logo === "string" &&
    (platform.logo.startsWith("blob:") || platform.logo.startsWith("data:"));

  return (
    <div className={className} style={{ color: platform.accentColor }}>
      {platform.logo && !imageFailed ? (
        isBlobOrData ? (
          // use native img for blob/data URLs
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={platform.logo!}
            alt={`${platform.name} logo`}
            width={28}
            height={28}
            style={
              shouldInvertLogo
                ? { filter: "invert(1) brightness(1.3)", color: "transparent" }
                : { color: "transparent" }
            }
            className="max-h-7 max-w-7 object-contain"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Image
            src={platform.logo!}
            alt={`${platform.name} logo`}
            width={28}
            height={28}
            style={
              shouldInvertLogo
                ? { filter: "invert(1) brightness(1.3)", color: "transparent" }
                : { color: "transparent" }
            }
            className="max-h-7 max-w-7 object-contain"
            onError={() => setImageFailed(true)}
          />
        )
      ) : (
        initials
      )}
    </div>
  );
}
