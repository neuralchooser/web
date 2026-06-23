import Link from "next/link";
import Image from "next/image";

interface SiteLogoProps {
  href?: string;
  className?: string;
}

export function SiteLogo({
  href = "/",
  className = "flex items-center gap-2 font-semibold tracking-tight",
}: SiteLogoProps) {
  return (
    <Link href={href} className={className}>
      <span className="border border-border overflow-hidden rounded-md">
        {/* Swap logos by theme with CSS so there is no hydration mismatch or
            post-mount flash (next-themes toggles the `dark` class on <html>). */}
        <Image
          src="/logos/brand/logo-light.png"
          alt="NeuralChooser Logo"
          width={32}
          height={32}
          className="dark:hidden"
        />
        <Image
          src="/logos/brand/logo-dark.png"
          alt="NeuralChooser Logo"
          width={32}
          height={32}
          className="hidden dark:block"
        />
      </span>
      <span>NeuralChooser</span>
    </Link>
  );
}
