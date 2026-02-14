import { ApiFetchOptions, fetchJson } from "@/lib/api/shared";

/**
 * Browser-safe API helper that calls the Next.js proxy route (/api/proxy),
 * so you don't need CORS and you don't expose server env vars to the client.
 */
export function browserApiFetch<T>(path: string, options?: ApiFetchOptions) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `/api/proxy${cleanPath}`;
  return fetchJson<T>(url, options);
}

