import { getAllCategories } from "@/lib/services/categories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let categories = await getAllCategories();

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load categories",
      },
      { status: 500 },
    );
  }
}
