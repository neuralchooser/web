"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Wrapper component that defers rendering of children until after hydration.
 * This prevents hydration mismatches when content depends on client-side state.
 */
export function HydrationSafe({ children }: { children: React.ReactNode }) {
  // Returns false on the server and during the initial client render, then true
  // once hydrated — without setting state inside an effect.
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}
