import { NextRequest, NextResponse } from "next/server";
import { trackPlatformView } from "@/lib/repositories/analytics-repository";
import { isBot } from "@/lib/analytics/bot-detection";

export async function POST(request: NextRequest) {
  try {
    // Only process analytics in production environment
    const host = request.headers.get("host");
    const isProduction = process.env.NODE_ENV === "production" &&
      host &&
      !host.includes("localhost") &&
      !host.includes("127.0.0.1");

    if (!isProduction) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const userAgent = request.headers.get("user-agent");
    if (isBot(userAgent)) {
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
