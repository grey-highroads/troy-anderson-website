import "server-only";
import { contentQueries, type ContentType } from "./queries";

// Next.js static preview/local path. Vite substitutes the Workers implementation.
export async function readSanity<T>(type: ContentType): Promise<T | null> {
  const token = process.env.SANITY_API_READ_TOKEN?.trim();
  if (!token) return null;
  const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gknd24m7";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const version = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-11";
  const url = new URL(`https://${project}.api.sanity.io/v${version}/data/query/${dataset}`);
  url.searchParams.set("query", contentQueries[type]);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Sanity ${type} query failed: ${response.status}`);
  const payload = await response.json() as { result?: T | null };
  return payload.result ?? null;
}
