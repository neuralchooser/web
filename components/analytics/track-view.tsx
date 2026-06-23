"use client";

import { useEffect, useRef } from "react";

interface TrackViewProps {
  platformId: string;
}

export function TrackView({ platformId }: TrackViewProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // Track the view asynchronously
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ platformId }),
    }).catch((err) => {
      // Silently ignore tracking errors
      console.warn("Analytics view tracking failed:", err);
    });
  }, [platformId]);

  return null;
}
