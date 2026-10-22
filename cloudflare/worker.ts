import app from "vinext/server/app-router-entry";
import { env } from "cloudflare:workers";
import { createHash, timingSafeEqual } from "node:crypto";
import { contentQueries, type ContentType } from "../lib/sanity/queries";
import type { ContentCache } from "./content-cache";
import { handleContact } from "./contact";
export { ContentCache } from "./content-cache";

const routes: Record<ContentType, string[]> = {
  homepage: ["/"], about: ["/about/"], book: ["/book/"],
  contact: ["/contact/"], mediaPage: ["/media/"], press: ["/press/"],
  siteSettings: ["/", "/about/", "/book/", "/contact/", "/media/", "/press/"],
};

async function refresh(request: Request): Promise<Response> {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
  const secret = env.SANITY_PUBLISH_SECRET;
  if (!secret) return new Response("Refresh secret is not configured", { status: 503 });
  const hash = (value: string) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(hash(request.headers.get("Authorization") || ""), hash(`Bearer ${secret}`))) return new Response("Unauthorized", { status: 401 });
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) return new Response("JSON required", { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return new Response("Body required", { status: 400 });
  let body = "";
  let size = 0;
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); return new Response("Payload too large", { status: 413 }); }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  let event: Record<string, unknown>;
  try { event = JSON.parse(body); }
  catch { return new Response("Invalid JSON", { status: 400 }); }
  if (!event || typeof event !== "object" || Array.isArray(event) || typeof event._id !== "string" || typeof event._type !== "string" || !Object.hasOwn(contentQueries, event._type) || event.projectId !== env.NEXT_PUBLIC_SANITY_PROJECT_ID || event.dataset !== env.NEXT_PUBLIC_SANITY_DATASET) return new Response("Invalid event", { status: 400 });
  if (event._id.startsWith("drafts.") || event._id.startsWith("versions.")) return Response.json({ ignored: true });
  const type = event._type as ContentType;
  try {
    const stub = env.CONTENT_CACHE.getByName(type) as DurableObjectStub<ContentCache>;
    // Notifications carry identity only. Always read the current published value.
    const snapshot = JSON.parse(await stub.read(type, true)) as { content: { _rev?: string } | null; fetchedAt: number };
    return Response.json({ refreshed: type, paths: routes[type], revision: snapshot.content?._rev, fetchedAt: snapshot.fetchedAt });
  } catch {
    return new Response("CMS refresh failed; last successful content retained", { status: 503 });
  }
}

const worker = {
  async fetch(request: Request, workerEnv: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.replace(/\/$/, "") === "/api/contact") return handleContact(request, workerEnv);
    const response = url.pathname.replace(/\/$/, "") === "/api/sanity/refresh"
      ? await refresh(request)
      : await app.fetch(request, workerEnv, ctx);
    if (response.headers.get("Content-Type")?.includes("text/html") || response.headers.get("Content-Type")?.includes("text/x-component") || url.pathname.startsWith("/api/sanity/")) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "private, no-store, max-age=0");
      headers.set("CDN-Cache-Control", "no-store");
      headers.set("Cloudflare-CDN-Cache-Control", "no-store");
      const type = (Object.keys(routes) as ContentType[]).find((key) => key !== "siteSettings" && routes[key].includes(url.pathname));
      if (type && response.ok) {
        const stub = env.CONTENT_CACHE.getByName(type) as DurableObjectStub<ContentCache>;
        const snapshot = JSON.parse(await stub.read(type)) as { content: { _rev?: string } | null; fetchedAt: number };
        if (snapshot.content?._rev) headers.set("X-Sanity-Cache-Revision", snapshot.content._rev);
        headers.set("X-Sanity-Fetched-At", String(snapshot.fetchedAt));
      }
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
};
export default worker;
