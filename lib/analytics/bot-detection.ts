const BOT_PATTERNS = [
  /googlebot/i,
  /google-inspection/i,
  /google-web-light/i,
  /google-cloud-scheduler/i,
  /bingbot/i,
  /bingpreview/i,
  /msnbot/i,
  /slurp/i,
  /duckduckbot/i,
  /duckduckgo-favicons/i,
  /baiduspider/i,
  /yandexbot/i,
  /yandexmobile/i,
  /facebookexternalhit/i,
  /facebot/i,
  /twitterbot/i,
  /twitterimage/i,
  /whatsapp/i,
  /linkedinbot/i,
  /slackbot/i,
  /slack-image-cdn/i,
  /pinterestbot/i,
  /discordbot/i,
  /applebot/i,
  /applebot-extended/i,
  /telegrambot/i,
  /semrushbot/i,
  /ahrefsbot/i,
  /majestic-seo/i,
  /rogerbot/i,
  /dotbot/i,
  /seokicks/i,
  /exabot/i,
  /mj12bot/i,
  /screaming frog/i,
  /sitebulb/i,
  /adidxbot/i,
  /chatgpt-user/i,
  /gptbot/i,
  /claude-web/i,
  /anthropic-ai/i,
  /bytespider/i,
  /amazonbot/i,
  /petalbot/i,
  /meta-externalagent/i,
  /meta-externalfetcher/i,
  /lighthouse/i,
  /pagespeed/i,
  /pingdom/i,
  /uptimerobot/i,
  /newrelic/i,
  /datadog/i,
  /wget/i,
  /curl/i,
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /axios/i,
  /node-fetch/i,
  /ruby/i,
  /nethttp/i,
];

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Determines whether a request's analytics event should be recorded.
 * Skips non-production environments and detected bots.
 */
export function shouldTrackRequest(
  host: string | null,
  userAgent: string | null,
): boolean {
  const isProduction =
    process.env.NODE_ENV === "production" &&
    !!host &&
    !host.includes("localhost") &&
    !host.includes("127.0.0.1");

  if (!isProduction) return false;
  if (isBot(userAgent)) return false;
  return true;
}
