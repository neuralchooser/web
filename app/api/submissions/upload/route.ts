import { NextResponse, type NextRequest } from "next/server";

import { supabaseServer } from "@/lib/supabase/server";

const ALLOWED_MIME_TYPES = new Set(["image/svg+xml"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const filePath = formData.get("filePath") as string | null;

  if (!file || !filePath) {
    return NextResponse.json(
      { error: "Missing file or filePath" },
      { status: 400 },
    );
  }

  if (!file.name.toLowerCase().endsWith(".svg")) {
    return NextResponse.json(
      { error: "Only SVG files are allowed" },
      { status: 400 },
    );
  }

  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only SVG files are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File exceeds 5 MB limit" },
      { status: 400 },
    );
  }

  const sanitized = filePath.replace(/\.\./g, "").replace(/^\/+/, "");
  if (!sanitized.startsWith("submission-logos/")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  if (!sanitized.toLowerCase().endsWith(".svg")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  const buffer = new Uint8Array(await file.arrayBuffer());

  const { error: uploadError } = await supabaseServer.storage
    .from("neural-chooser")
    .upload(sanitized, buffer, {
      contentType: "image/svg+xml",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabaseServer.storage
    .from("neural-chooser")
    .getPublicUrl(sanitized);

  return NextResponse.json({ publicUrl: data.publicUrl });
}
