import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";

const origin = "https://troy-anderson-website.grey-4fe.workers.dev";
const routes = { homepage: "/", about: "/about/", book: "/book/", contact: "/contact/", mediaPage: "/media/", press: "/press/" };
const secret = process.env.SANITY_PUBLISH_SECRET;
const token = process.env.SANITY_API_READ_TOKEN;
assert(secret && token, "Load the private runtime settings.");
const results = { date: new Date().toISOString(), origin, routes: [], notifications: [], publishing: [] };
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function page(route) {
  const response = await fetch(`${origin}${route}`);
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get("cache-control"), /no-store/);
  const html = await response.text();
  assert(html.includes("<html"));
  return { route, revision: response.headers.get("x-sanity-cache-revision"), fetchedAt: Number(response.headers.get("x-sanity-fetched-at")), html };
}
async function notify(type, id, overrides = {}, authorization = `Bearer ${secret}`) {
  const response = await fetch(`${origin}/api/sanity/refresh`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: authorization }, body: JSON.stringify({ _type: type, _id: id, projectId: "gknd24m7", dataset: "production", ...overrides }) });
  const text = await response.text();
  return { status: response.status, body: response.ok ? JSON.parse(text) : text };
}
for (const [type, route] of Object.entries(routes)) {
  const result = await page(route);
  assert(result.revision, `${type} must use the runtime cache`);
  results.routes.push({ type, route, revision: result.revision, cache: "no-store" });
}
assert.equal((await notify("book", "book", {}, "")).status, 401);
assert.equal((await notify("book", "drafts.book")).body.ignored, true);
assert.equal((await notify("book", "book", { dataset: "wrong" })).status, 400);
assert.equal((await notify("unknown", "book")).status, 400);
for (const type of [...Object.keys(routes), "siteSettings"]) {
  const result = await notify(type, type);
  assert.equal(result.status, 200);
  if (type === "siteSettings") assert.equal(result.body.paths.length, Object.keys(routes).length);
  results.notifications.push(result.body);
}
const duplicate = await Promise.all([notify("book", "book"), notify("book", "book")]);
assert.equal(duplicate[0].body.revision, duplicate[1].body.revision);
results.duplicateNotification = "passed";

if (process.argv.includes("--publish-revisions")) {
  // Revision-only patches preserve every field value and never publish drafts.
  const admin = process.env.SANITY_AUTH_TOKEN || JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8")).authToken;
  const api = "https://gknd24m7.api.sanity.io/v2026-09-11";
  const headers = { Authorization: `Bearer ${admin}`, "Content-Type": "application/json" };
  const query = new URL(`${api}/data/query/production`);
  query.searchParams.set("query", '*[_type in ["homepage", "book", "about", "contact", "siteSettings", "mediaPage", "press"] && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]');
  query.searchParams.set("perspective", "published");
  const documents = (await (await fetch(query, { headers })).json()).result;
  assert.equal(documents.length, Object.keys(routes).length + 1);
  async function patch(doc) {
    const field = Object.keys(doc).find((key) => !key.startsWith("_") && typeof doc[key] === "string");
    assert(field, "A scalar field is required for the revision-only proof.");
    const response = await fetch(`${api}/data/mutate/production?returnDocuments=true`, { method: "POST", headers, body: JSON.stringify({ mutations: [{ patch: { id: doc._id, ifRevisionID: doc._rev, set: { [field]: doc[field] } } }] }) });
    assert.equal(response.status, 200);
    const data = await response.json();
    const updated = data.results[0].document;
    assert(updated && updated._rev !== doc._rev, "Mutation must create a new revision.");
    return updated;
  }
  async function waitRevision(type, revision, start) {
    for (let attempt = 0; attempt < 60; attempt++) {
      const result = await page(routes[type]);
      if (result.revision === revision) return Number(((performance.now() - start) / 1000).toFixed(2));
      await pause(500);
    }
    throw new Error(`${type} did not recover within 30 seconds.`);
  }
  let book = documents.find((doc) => doc._type === "book");
  for (let i = 0; i < 3; i++) {
    const start = performance.now();
    book = await patch(book);
    results.publishing.push({ type: "book", revision: book._rev, seconds: await waitRevision("book", book._rev, start), fieldsUnchanged: true });
  }
  const start = performance.now();
  const quick = await Promise.all(documents.filter((doc) => !["book", "siteSettings"].includes(doc._type)).map(patch));
  for (const doc of quick) results.publishing.push({ type: doc._type, revision: doc._rev, seconds: await waitRevision(doc._type, doc._rev, start), fieldsUnchanged: true });
  const shared = await patch(documents.find((doc) => doc._type === "siteSettings"));
  results.sharedRevision = shared._rev;
  const hooksUrl = `${api}/hooks/projects/gknd24m7`;
  const hooks = await (await fetch(hooksUrl, { headers })).json();
  const hook = hooks.find((entry) => entry.name === "Cloudflare published content refresh");
  assert(hook);
  // Temporarily suppress only the new notification path, restoring it in finally.
  const setDisabled = async (isDisabledByUser) => {
    const response = await fetch(`${hooksUrl}/${hook.id}`, { method: "PATCH", headers, body: JSON.stringify({ isDisabledByUser }) });
    assert.equal(response.status, 200);
  };
  await setDisabled(true);
  try {
    await notify("book", book._id); // warm immediately before the missed publish
    const start = performance.now();
    book = await patch(book);
    results.missedNotification = { revision: book._rev, seconds: await waitRevision("book", book._rev, start), fieldsUnchanged: true };
  } finally { await setDisabled(false); }
  // An old notification cannot replay old content: its body carries no values.
  const old = await notify("book", book._id, { revision: "old-event" });
  assert.equal(old.body.revision, book._rev);
  results.outOfOrderNotification = "passed";
}
fs.mkdirSync("outputs", { recursive: true });
fs.writeFileSync("outputs/cloudflare-publishing-verification.json", JSON.stringify(results, null, 2) + "\n");
console.log(JSON.stringify(results, null, 2));
