"use client";

import { useState } from "react";

type CopyShareTextProps = {
  copy: string;
  url: string;
};

export function CopyShareText({copy, url}: CopyShareTextProps) {
  const [copied, setCopied] = useState(false);

  async function copyShareText() {
    await navigator.clipboard.writeText(`${copy}\n${url}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="media-copy-action" type="button" onClick={copyShareText}>
      <span aria-live="polite">{copied ? "Copied" : "Copy share text"}</span>
    </button>
  );
}
