import test from "node:test";
import assert from "node:assert/strict";
import worker from "./worker.mjs";

const routes = {
  "sites.hr-host.com": { site: "troy" },
  "troy-test.hr-host.com": { site: "troy" },
  "troy-root-test.hr-host.com": { site: "troy", redirect: "troy-test.hr-host.com" },
};
function env(fetch) { return { HOST_ROUTES: JSON.stringify(routes), TROY: { fetch } }; }

test("rejects unknown, suffix and spoofed-host requests without calling the website", async () => {
  for (const hostname of ["hr-host.com", "unapproved.hr-host.com", "sites.hr-host.com.evil.test", "troy-test.hr-host.com."]) {
    const response = await worker.fetch(new Request(`https://${hostname}/`, { headers: { "X-Forwarded-Host": "sites.hr-host.com" } }), env(() => assert.fail("Unexpected backend call")));
    assert.equal(response.status, 404);
  }
});

test("forwards original method, URL, request body and streams backend response", async () => {
  const request = new Request("https://troy-test.hr-host.com/check?x=1", { method: "POST", body: "preserved" });
  const response = await worker.fetch(request, env(async forwarded => {
    assert.equal(forwarded, request);
    assert.equal(await forwarded.text(), "preserved");
    return new Response("result", { status: 202, headers: { "X-Test": "passed" } });
  }));
  assert.equal(response.status, 202);
  assert.equal(response.headers.get("X-Test"), "passed");
  assert.equal(await response.text(), "result");
});

test("canonical redirect preserves encoded path/query and fixes host/protocol/port", async () => {
  const response = await worker.fetch(new Request("http://troy-root-test.hr-host.com:8080//other.test/book%20excerpt/?x=1&x=2"), env(() => assert.fail("Unexpected backend call")));
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("Location"), "https://troy-test.hr-host.com//other.test/book%20excerpt/?x=1&x=2");
});

test("missing configuration, missing binding and invalid redirects fail closed", async () => {
  const request = new Request("https://sites.hr-host.com/");
  for (const config of [{}, { HOST_ROUTES: "null" }, { HOST_ROUTES: "[]" }, { HOST_ROUTES: JSON.stringify(routes) }, { HOST_ROUTES: JSON.stringify({ "sites.hr-host.com": { site: "troy", redirect: "outside.test" } }) }]) {
    assert.equal((await worker.fetch(request, config)).status, 503);
  }
});
