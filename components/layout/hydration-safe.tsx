"use client";

import { useEffect, useState } from "react";

/**
 * Wrapper component that defers rendering of children until after hydration.
 * This prevents hydration mismatches when content depends on client-side state.
 */
export function HydrationSafe({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
