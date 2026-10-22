"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { defaultContactFormCopy, type ContactFormCopy } from "@/lib/contact-form-copy";

export function ContactForm({ runtime, copy }: { runtime: boolean; copy?: ContactFormCopy }) {
  const text = Object.fromEntries(
    Object.entries(defaultContactFormCopy).map(([key, fallback]) => {
      const value = copy?.[key as keyof ContactFormCopy];
      return [key, typeof fallback === "string" && typeof value === "string" ? value : fallback];
    }),
  ) as typeof defaultContactFormCopy;
  const inquiryOptions = copy?.inquiryOptions?.filter(
    (option): option is string => typeof option === "string" && option.trim().length > 0,
  );
  text.inquiryOptions = inquiryOptions?.length ? [...new Set(inquiryOptions)] : defaultContactFormCopy.inquiryOptions;
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
    setNotice(text.sendingMessage);
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, subject: `Troy Anderson website: ${fields.inquiry}` }), signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(response.status === 429
        ? text.rateLimitMessage
        : (response.status === 400 || response.status === 422) ? text.validationMessage
        : text.errorMessage);
      setStatus("success");
      setNotice(text.successMessage);
      form.reset();
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError"
        ? error.message : text.errorMessage);
    } finally {
      submitting.current = false;
      statusRef.current?.focus();
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
      <label>{text.nameLabel}<input type="text" name="name" autoComplete="name" required maxLength={100} /></label>
      <label>{text.emailLabel}<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
      <label>{text.inquiryLabel}<select name="inquiry" defaultValue="" required>
        <option value="" disabled>{text.inquiryPlaceholder}</option>
        {text.inquiryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
      </select></label>
      <label>{text.messageLabel}<textarea name="message" rows={6} required maxLength={5000} /></label>
      <div hidden aria-hidden="true"><label>Leave empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" disabled={!available || status === "sending"}>{status === "sending" ? text.sendingLabel : text.submitLabel}</button>
      <p className="form-note" ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
        {notice || (available ? text.deliveryNotice : text.unavailableMessage)}
      </p>
    </form>
  );
}
