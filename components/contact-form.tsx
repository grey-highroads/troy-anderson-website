"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export function ContactForm({ runtime }: { runtime: boolean }) {
  const [formId, setFormId] = useState("");
  const available = Boolean(formId);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  const submitting = useRef(false);

  useEffect(() => {
    if (!runtime) return;
    const controller = new AbortController();
    fetch("/api/contact", { cache: "no-store", signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => setFormId(data?.available === true && /^[a-z0-9]{8,}$/.test(data.formId) ? data.formId : ""))
      .catch(() => {});
    return () => controller.abort();
  }, [runtime]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setNotice("Sending your message…");
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, subject: `Troy Anderson website: ${fields.inquiry}` }), signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(response.status === 429
        ? "Please wait a minute before sending another message."
        : (response.status === 400 || response.status === 422) ? "Please check your email and complete all fields, then try again."
        : "We couldn’t confirm your message was sent. Please wait a moment and try again.");
      setStatus("success");
      setNotice("Thank you. Your message has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError"
        ? error.message : "We couldn’t confirm your message was sent. Please wait a moment and try again.");
    } finally {
      submitting.current = false;
      statusRef.current?.focus();
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
      <label>Name<input type="text" name="name" autoComplete="name" required maxLength={100} /></label>
      <label>Email<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
      <label>Inquiry type<select name="inquiry" defaultValue="" required>
        <option value="" disabled>Choose one</option>
        <option>Coaching</option><option>Speaking</option><option>Media</option><option>Book</option><option>Other</option>
      </select></label>
      <label>Message<textarea name="message" rows={6} required maxLength={5000} /></label>
      <div hidden aria-hidden="true"><label>Leave empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" disabled={!available || status === "sending"}>{status === "sending" ? "Sending…" : "Send Message"}</button>
      <p className="form-note" ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
        {notice || (available ? "Test form: your name, email, inquiry type, and message are processed by Formspree and sent to the site administrator for testing. Formspree stores a submission record, and a copy remains in the test inbox. Please don’t include sensitive personal information." : "Form delivery will be connected before launch.")}
      </p>
    </form>
  );
}
