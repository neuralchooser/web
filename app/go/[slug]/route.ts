import { NextRequest } from "next/server";
import { getPlatformBySlug } from "@/lib/services/platforms";
import { trackWebsiteClick } from "@/lib/repositories/analytics-repository";
import { shouldTrackRequest } from "@/lib/analytics/bot-detection";
import { withUtmParams } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const platform = await getPlatformBySlug(slug);

  if (!platform || !platform.website) {
    redirect("/");
  }

  // Attempt to track, ignoring failures. Skip bots and non-production traffic.
  if (
    shouldTrackRequest(
      request.headers.get("host"),
      request.headers.get("user-agent"),
    )
  ) {
    try {
      await trackWebsiteClick(platform.id);
    } catch (err) {
      console.error(`Error tracking website click for slug ${slug}:`, err);
    }
  }

  // Redirect to the external website with attribution
  redirect(withUtmParams(platform.website));
}
