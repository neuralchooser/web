import { NextRequest, NextResponse } from "next/server";
import { trackPlatformView } from "@/lib/repositories/analytics-repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platformId } = body;

    if (!platformId) {
      return NextResponse.json({ error: "platformId is required" }, { status: 400 });
    }

    // Call repository method to track the view
    await trackPlatformView(platformId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error in POST /api/analytics:", err);
    // Silent ignore - still return 200 so the client doesn't throw errors
    return NextResponse.json({ success: false, error: "Silent ignore" }, { status: 200 });
  }
}
