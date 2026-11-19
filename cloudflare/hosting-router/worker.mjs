// Separate ingress Worker. Configuration is a JSON variable, never user input.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let hosts;
    try {
      hosts = JSON.parse(env.HOST_ROUTES);
      if (!hosts || typeof hosts !== "object" || Array.isArray(hosts)) throw new Error();
    } catch {
      return new Response("Hosting configuration unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
    }
    const route = Object.hasOwn(hosts, url.hostname) ? hosts[url.hostname] : null;
    if (!route || route.site !== "troy") {
      return new Response("Website not configured", { status: 404, headers: { "Cache-Control": "no-store" } });
    }
    if (route.redirect) {
      if (!Object.hasOwn(hosts, route.redirect) || hosts[route.redirect]?.site !== route.site || !/^[a-z0-9.-]+$/.test(route.redirect)) {
        return new Response("Hosting configuration unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
      }
      url.protocol = "https:";
      url.hostname = route.redirect;
      url.port = "";
      return new Response(null, { status: 301, headers: { Location: url.href, "Cache-Control": "no-store" } });
    }
    if (!env.TROY || typeof env.TROY.fetch !== "function") {
      return new Response("Website temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
    }
    try {
      return await env.TROY.fetch(request);
    } catch {
      console.error(JSON.stringify({ event: "hosting_upstream_failed", site: route.site }));
      return new Response("Website temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
    }
  },
};
