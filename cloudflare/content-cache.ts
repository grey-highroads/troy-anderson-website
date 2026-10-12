import { DurableObject } from "cloudflare:workers";
import { contentQueries, type ContentType } from "../lib/sanity/queries";

export const CONTENT_TTL_MS = 20_000;
const ALARM_MS = 60_000;
type Snapshot = { content: Record<string, unknown> | null; fetchedAt: number };

// One object per document type coordinates reads and notifications worldwide.
export class ContentCache extends DurableObject<Env> {
  private tail: Promise<unknown> = Promise.resolve();

  private serial<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.tail.then(operation, operation);
    this.tail = result.catch(() => {});
    return result;
  }

  async read(type: ContentType, force = false): Promise<string> {
    return JSON.stringify(await this.load(type, force));
  }

  private load(type: ContentType, force = false): Promise<Snapshot> {
    if (!Object.hasOwn(contentQueries, type)) throw new Error("Unsupported content type.");
    return this.serial(async () => {
      const identity = this.ctx.storage.kv.get<ContentType>("type");
      if (identity && identity !== type) throw new Error("Cache identity mismatch.");
      this.ctx.storage.kv.put("type", type);
      this.ctx.storage.kv.put("lastVisit", Date.now());
      const cached = this.ctx.storage.kv.get<Snapshot>("snapshot");
      if (!force && cached && Date.now() - cached.fetchedAt < CONTENT_TTL_MS) return cached;
      try {
        return await this.refresh(type);
      } catch (error) {
        console.error(JSON.stringify({ event: "sanity_refresh_failed", type, message: error instanceof Error ? error.message : "Unknown", servingLastGood: !!cached }));
        if (!cached || force) throw error;
        return cached;
      } finally {
        await this.ctx.storage.setAlarm(Date.now() + ALARM_MS);
      }
    });
  }

  private async refresh(type: ContentType): Promise<Snapshot> {
    if (!this.env.SANITY_API_READ_TOKEN) throw new Error("Missing SANITY_API_READ_TOKEN.");
    const url = new URL(`https://${this.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${this.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/query/${this.env.NEXT_PUBLIC_SANITY_DATASET}`);
    url.searchParams.set("query", contentQueries[type]);
    url.searchParams.set("perspective", "published");
    const response = await fetch(url, { headers: { Authorization: `Bearer ${this.env.SANITY_API_READ_TOKEN}` }, cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Sanity response ${response.status}`);
    const payload = await response.json() as { result?: Record<string, unknown> | null };
    if (!("result" in payload) || (payload.result !== null && (typeof payload.result !== "object" || Array.isArray(payload.result)))) throw new Error("Invalid Sanity response.");
    const snapshot = { content: payload.result ?? null, fetchedAt: Date.now() };
    this.ctx.storage.kv.put("snapshot", snapshot);
    console.log(JSON.stringify({ event: "sanity_refreshed", type, revision: snapshot.content?._rev, fetchedAt: snapshot.fetchedAt }));
    return snapshot;
  }

  async alarm(): Promise<void> {
    await this.serial(async () => {
      const type = this.ctx.storage.kv.get<ContentType>("type");
      const lastVisit = this.ctx.storage.kv.get<number>("lastVisit") || 0;
      if (!type || Date.now() - lastVisit > 300_000) return;
      try { await this.refresh(type); }
      catch (error) { console.error(JSON.stringify({ event: "sanity_alarm_failed", type, message: error instanceof Error ? error.message : "Unknown" })); }
      finally { await this.ctx.storage.setAlarm(Date.now() + ALARM_MS); }
    });
  }
}
