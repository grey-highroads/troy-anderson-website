// This endpoint exposes only public form configuration; no CAPTCHA secret.
// Formspree validates submissions server-side and receives them from the browser.
export function handleContact(request: Request, env: Pick<Env, "CONTACT_FORM_ID"> & { CONTACT_TURNSTILE_SITE_KEY?: string }): Response {
  const headers = { "Cache-Control": "no-store", "CDN-Cache-Control": "no-store" };
  if (request.method !== "GET") return new Response(null, { status: 405, headers: { ...headers, Allow: "GET" } });
  const turnstileSiteKey = env.CONTACT_TURNSTILE_SITE_KEY || "";
  const available = /^[a-z0-9]{8,}$/.test(env.CONTACT_FORM_ID) && /^[A-Za-z0-9_-]{20,100}$/.test(turnstileSiteKey);
  return Response.json({ available, formId: available ? env.CONTACT_FORM_ID : null, turnstileSiteKey: available ? turnstileSiteKey : null }, { headers });
}
