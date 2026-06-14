import { NextRequest } from "next/server";
import { getPlatformBySlug } from "@/lib/services/platforms";
import { trackDocumentationClick } from "@/lib/repositories/analytics-repository";
import { redirect } from "next/navigation";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const platform = await getPlatformBySlug(slug);

  if (!platform || !platform.documentation) {
    redirect("/");
  }

  // Attempt to track, ignoring failures
  try {
    await trackDocumentationClick(platform.id);
  } catch (err) {
    console.error(`Error tracking documentation click for slug ${slug}:`, err);
  }

  // Redirect to the external documentation URL
  redirect(platform.documentation);
}
