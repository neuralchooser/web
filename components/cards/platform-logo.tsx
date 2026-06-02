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

  return (
    <div className={className} style={{ color: platform.accentColor }}>
      {platform.logo && !imageFailed ? (
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
      ) : (
        initials
      )}
    </div>
  );
}
