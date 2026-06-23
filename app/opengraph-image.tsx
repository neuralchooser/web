import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — AI platform directory`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 32,
            fontWeight: 600,
            color: "#a1a1aa",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#fafafa",
            }}
          />
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
            Find the right AI platform.
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a1a1aa",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#71717a" }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
