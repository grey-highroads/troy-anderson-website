import { readSanity } from "@/lib/sanity/client";

import type { ContactFormCopy } from "@/lib/contact-form-copy";

export type ContactContent = {
  title?: string
  intro?: string
  portraitImageUrl?: string
  portraitImageWidth?: number
  portraitImageHeight?: number
  portraitImageAlt?: string
  formHeading?: string
  formCopy?: ContactFormCopy
}

function isWebUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function cleanContactContent(content: ContactContent): ContactContent {
  return {
    ...content,
    portraitImageUrl: isWebUrl(content.portraitImageUrl)
      ? content.portraitImageUrl
      : undefined,
  }
}

export async function getContactContent(): Promise<ContactContent | null> {
  const result = await readSanity<ContactContent>("contact");
  return result ? cleanContactContent(result) : null
}
