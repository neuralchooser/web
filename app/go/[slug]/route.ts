import { NextRequest } from "next/server";
import { getPlatformBySlug } from "@/lib/services/platforms";
import { trackWebsiteClick } from "@/lib/repositories/analytics-repository";
import { redirect } from "next/navigation";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const platform = await getPlatformBySlug(slug);

  if (!platform || !platform.website) {
    redirect("/");
  }

  // Attempt to track, ignoring failures
  try {
    await trackWebsiteClick(platform.id);
  } catch (err) {
    console.error(`Error tracking website click for slug ${slug}:`, err);
  }

  // Redirect to the external website
  redirect(platform.website);
}
