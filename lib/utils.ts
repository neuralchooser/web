import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const UTM_PARAMS = {
  utm_source: "neuralchooser",
  utm_medium: "directory",
} as const;

/**
 * Append NeuralChooser UTM attribution to an outbound URL. Preserves any
 * existing query string and fragment, and does not overwrite UTM params the
 * destination URL already sets. Returns the original string unchanged if it is
 * not a parseable absolute URL.
 */
export function withUtmParams(url: string): string {
  try {
    const parsed = new URL(url);
    for (const [key, value] of Object.entries(UTM_PARAMS)) {
      if (!parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, value);
      }
    }
    return parsed.toString();
  } catch {
    return url;
  }
}
