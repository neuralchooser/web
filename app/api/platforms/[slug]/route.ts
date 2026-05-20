import { NextResponse } from "next/server";
import { getPlatformBySlug } from "@/lib/services/platforms";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const platform = await getPlatformBySlug(slug);

    if (!platform) {
      return NextResponse.json(
        { error: "Platform not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(platform);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load platform",
      },
      { status: 500 },
    );
  }
}
