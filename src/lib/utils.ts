import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_API_URL = "https://api.mainichihalalshop.com";
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

export function getImageUrl(
  path?: string | null,
  fallback = "/placeholder.png",
): string {
  if (!path || typeof path !== "string") return fallback;
  let trimmed = path.trim();
  if (!trimmed) return fallback;

  // Heal corrupted undefined or null prefixes from previous session state
  if (trimmed.startsWith("undefined")) {
    trimmed = trimmed.replace(/^undefined\/?/, "/");
  } else if (trimmed.startsWith("null")) {
    trimmed = trimmed.replace(/^null\/?/, "/");
  }

  // Heal obsolete localhost:5000 prefixes if backend is remote
  if (trimmed.startsWith("http://localhost:5000")) {
    trimmed = trimmed.replace(/^http:\/\/localhost:5000\/?/, "/");
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  const baseUrl = (
    import.meta.env.VITE_API_URL || DEFAULT_API_URL
  ).replace(/\/+$/, "");
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${baseUrl}${cleanPath}`;
}
