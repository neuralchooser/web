import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const ADMIN_COOKIE_NAME = "neuralchooser_admin";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;

export interface AdminCookiePayload {
  email: string;
  issuedAt: number;
}

export const adminCookieOptions = {
  httpOnly: true,
  maxAge: COOKIE_MAX_AGE_SECONDS,
  path: "/admin",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

function getCookieSecret() {
  const secret = process.env.ADMIN_COOKIE_SECRET;

  if (!secret) {
    throw new Error("Missing ADMIN_COOKIE_SECRET environment variable");
  }

  return secret;
}

function encodeBase64Url(value: string) {
  const base64 =
    typeof btoa === "function"
      ? btoa(value)
      : Buffer.from(value, "utf8").toString("base64");

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  return typeof atob === "function"
    ? atob(padded)
    : Buffer.from(padded, "base64").toString("utf8");
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getCookieSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

export async function createAdminCookieValue(email: string) {
  const payload: AdminCookiePayload = { email, issuedAt: Date.now() };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminCookieValue(
  value: string | RequestCookie | undefined,
) {
  const cookieValue = typeof value === "string" ? value : value?.value;
  if (!cookieValue) return null;

  const [encodedPayload, signature] = cookieValue.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = await sign(encodedPayload);
  if (!constantTimeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AdminCookiePayload;
    const expired =
      Date.now() - payload.issuedAt > adminCookieOptions.maxAge * 1000;

    if (expired || !payload.email) return null;

    return payload;
  } catch {
    return null;
  }
}
