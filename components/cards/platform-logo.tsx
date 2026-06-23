"use client";

import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import type { AIPlatform } from "@/types/platform";
import { CanvasLogo } from "./canvas-logo";

const emptySubscribe = () => () => {};

interface PlatformLogoProps {
  platform: AIPlatform;
  className?: string;
}

export function PlatformLogo({
  platform,
  className = "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted overflow-hidden",
}: PlatformLogoProps) {
  const { resolvedTheme } = useTheme();

  // False on the server / initial render, true once hydrated.
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Reset the failed-image flag when the logo source changes, adjusting state
  // during render rather than in an effect.
  const [imageFailed, setImageFailed] = useState(false);
  const [lastLogo, setLastLogo] = useState(platform.logo);
  if (platform.logo !== lastLogo) {
    setLastLogo(platform.logo);
    setImageFailed(false);
  }

  const initials = platform.name.slice(0, 2).toUpperCase();

  const darkMode = isMounted
    ? resolvedTheme === "dark"
    : typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

  const shouldInvertLogo = Boolean(
    darkMode &&
      platform.logo &&
      (platform as { isMonochromeLogo?: boolean }).isMonochromeLogo,
  );

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
