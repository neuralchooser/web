"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SiteLogoProps {
  href?: string;
  className?: string;
}

export function SiteLogo({
  href = "/",
  className = "flex items-center gap-2 font-semibold tracking-tight",
}: SiteLogoProps) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use light logo on server and during hydration, switch to resolved theme after mount
  const logoSrc = `/logos/brand/logo-${isMounted && resolvedTheme === "dark" ? "dark" : "light"}.png`;

  return (
    <Link href={href} className={className}>
      <span className="border border-border overflow-hidden rounded-md">
        <Image src={logoSrc} alt="NeuralChooser Logo" width={32} height={32} />
      </span>
      <span>NeuralChooser</span>
    </Link>
  );
}
