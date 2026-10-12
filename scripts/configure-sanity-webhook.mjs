import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const token = process.env.SANITY_AUTH_TOKEN || JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8")).authToken;
const secret = process.env.SANITY_PUBLISH_SECRET;
if (!secret) throw new Error("Load the private SANITY_PUBLISH_SECRET before configuring the webhook.");
const url = "https://gknd24m7.api.sanity.io/v2026-09-11/hooks/projects/gknd24m7";
const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
const listing = await fetch(url, { headers });
if (!listing.ok) throw new Error(`Cannot inspect webhooks: ${listing.status}`);
const existing = (await listing.json()).find((hook) => hook.name === "Cloudflare published content refresh");
const body = {
  type: "document", name: "Cloudflare published content refresh",
  url: "https://troy-anderson-website.grey-4fe.workers.dev/api/sanity/refresh",
  dataset: "production", apiVersion: "v2025-02-19", httpMethod: "POST",
  includeDrafts: false, includeAllVersions: false, isDisabledByUser: false,
  headers: { Authorization: `Bearer ${secret}` },
  rule: {
    on: ["create", "update", "delete"],
    filter: '_type in ["homepage", "book", "about", "contact", "siteSettings", "mediaPage"] && !(_id in path("drafts.**")) && !(_id in path("versions.**"))',
    projection: '{"_id": coalesce(after()._id, before()._id), "_type": coalesce(after()._type, before()._type), "projectId": "gknd24m7", "dataset": "production"}',
  },
};
if (existing) delete body.type; // Webhook type is immutable on PATCH.
const response = await fetch(existing ? `${url}/${existing.id}` : url, {
  method: existing ? "PATCH" : "POST", headers, body: JSON.stringify(body),
});
const result = await response.json();
if (!response.ok) throw new Error(`Webhook configuration failed: ${response.status} ${result.message || ""}`);
console.log(JSON.stringify({ id: result.id, name: result.name, url: result.url, drafts: result.includeDrafts }));
