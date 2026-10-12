// This endpoint exposes only the public Formspree form identifier.
// Formspree validates submissions server-side and receives them from the browser.
export function handleContact(request: Request, env: Pick<Env, "CONTACT_FORM_ID">): Response {
  const headers = { "Cache-Control": "no-store", "CDN-Cache-Control": "no-store" };
  if (request.method !== "GET") return new Response(null, { status: 405, headers: { ...headers, Allow: "GET" } });
  const available = /^[a-z0-9]{8,}$/.test(env.CONTACT_FORM_ID);
  return Response.json({ available, formId: available ? env.CONTACT_FORM_ID : null }, { headers });
}
