import "server-only";
import { env } from "cloudflare:workers";
import { connection } from "next/server";
import type { ContentType } from "../lib/sanity/queries";
import type { ContentCache } from "./content-cache";

export async function readSanity<T>(type: ContentType): Promise<T | null> {
  await connection();
  if (!env.SANITY_API_READ_TOKEN) throw new Error("Missing SANITY_API_READ_TOKEN runtime secret.");
  const stub = env.CONTENT_CACHE.getByName(type) as DurableObjectStub<ContentCache>;
  const snapshot = JSON.parse(await stub.read(type)) as { content: T | null };
  return snapshot.content as T | null;
}
