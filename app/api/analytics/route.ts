import { NextRequest, NextResponse } from "next/server";
import { trackPlatformView } from "@/lib/repositories/analytics-repository";
import { shouldTrackRequest } from "@/lib/analytics/bot-detection";

export async function POST(request: NextRequest) {
  try {
    // Skip non-production environments and detected bots.
    if (
      !shouldTrackRequest(
        request.headers.get("host"),
        request.headers.get("user-agent"),
      )
    ) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const body = await request.json();
    const { platformId } = body;

    if (!platformId) {
      return NextResponse.json({ error: "platformId is required" }, { status: 400 });
    }

    await trackPlatformView(platformId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error in POST /api/analytics:", err);
    return NextResponse.json({ success: false, error: "Silent ignore" }, { status: 200 });
  }
}
