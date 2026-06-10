import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminCookieValue,
} from "@/lib/auth/admin-cookie";
import { supabaseServer } from "@/lib/supabase/server";

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = await verifyAdminCookieValue(
    cookieStore.get(ADMIN_COOKIE_NAME),
  );

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only image files are allowed (png, jpg, webp, svg, gif)" },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File exceeds 5 MB limit" },
      { status: 400 },
    );
  }

  // Sanitize filePath: must be under platform-logos/ and contain no traversal
  const sanitized = filePath.replace(/\.\./g, "").replace(/^\/+/, "");
  if (!sanitized.startsWith("platform-logos/")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  const buffer = new Uint8Array(await file.arrayBuffer());

  const { error: uploadError } = await supabaseServer.storage
    .from("neural-chooser")
    .upload(sanitized, buffer, { contentType: file.type, upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabaseServer.storage
    .from("neural-chooser")
    .getPublicUrl(sanitized);

  return NextResponse.json({ publicUrl: data.publicUrl });
}
