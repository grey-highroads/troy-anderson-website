"use client";

import Script from "next/script";
import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string; action: string; theme: "auto"; size: "compact" | "flexible";
    "response-field": false; callback: (token: string) => void;
    "expired-callback": () => void; "error-callback": () => void; "timeout-callback": () => void;
  }) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }
export type ContactTurnstileHandle = {reset: () => void};

export const ContactTurnstile = forwardRef<ContactTurnstileHandle, {
  siteKey: string; onTokenChange: (token: string) => void;
}>(function ContactTurnstile({siteKey, onTokenChange}, ref) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => { onTokenChange(""); setFailed(true); }, [onTokenChange]);
  const reset = useCallback(() => {
    onTokenChange("");
    if (widget.current !== null && window.turnstile) {
      setFailed(false);
      try { window.turnstile.reset(widget.current); } catch { fail(); }
    }
  }, [onTokenChange, fail]);
  useImperativeHandle(ref, () => ({reset}), [reset]);
  const renderWidget = useCallback(() => {
    if (!container.current || !window.turnstile || widget.current !== null) return;
    try {
      widget.current = window.turnstile.render(container.current, {
        sitekey: siteKey, action: "contact", theme: "auto",
        size: container.current.clientWidth < 300 ? "compact" : "flexible",
        "response-field": false,
        callback: (token) => { setFailed(false); onTokenChange(token); },
        "expired-callback": () => onTokenChange(""),
        "timeout-callback": fail, "error-callback": fail,
      });
    } catch { fail(); }
  }, [siteKey, onTokenChange, fail]);
  useEffect(() => {
    renderWidget();
    return () => {
      if (widget.current !== null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [renderWidget]);

  return <div className="contact-verification">
    <Script id="contact-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      strategy="afterInteractive" onReady={renderWidget} onError={fail} />
    <div ref={container} aria-label="Bot verification" />
    {failed && <p className="form-note" role="alert">Verification could not finish. Please refresh the page and try again.</p>}
  </div>;
});
