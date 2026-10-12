import { readSanity } from "@/lib/sanity/client";
import type {PortableTextBlock} from '@portabletext/react'

export type HomepageContent = {
  meetTroyHeading?: string
  meetTroySummary?: PortableTextBlock[]
  meetTroyPortraitUrl?: string
  meetTroyPortraitWidth?: number
  meetTroyPortraitHeight?: number
  meetTroyPortraitAlt?: string
  testimonialsHeading?: string
  testimonials?: HomepageTestimonial[]
}

export type HomepageTestimonial = {
  _key?: string
  quote: string
  name: string
  credentials: string
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

// Keep older documents readable while their plain-text field is migrated.
export function introductionToBlocks(text: string): PortableTextBlock[] {
  return text.replace(/\r\n?/g, '\n').split(/\n(?:[\t ]*\n)+/).map((paragraph, index) => ({
    _type: 'block',
    _key: `introduction-${index}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `text-${index}`, text: paragraph, marks: []}],
  }))
}

type HomepageQueryContent = Omit<HomepageContent, 'meetTroySummary'> & {
  meetTroySummary?: PortableTextBlock[] | string
}

function cleanHomepageContent(content: HomepageQueryContent): HomepageContent {
  const testimonials = content.testimonials?.filter(
    (testimonial) =>
      typeof testimonial.quote === 'string' &&
      testimonial.quote.trim().length > 0 &&
      typeof testimonial.name === 'string' &&
      testimonial.name.trim().length > 0 &&
      typeof testimonial.credentials === 'string' &&
      testimonial.credentials.trim().length > 0,
  )

  return {
    ...content,
    meetTroySummary: typeof content.meetTroySummary === 'string'
      ? introductionToBlocks(content.meetTroySummary)
      : content.meetTroySummary,
    meetTroyPortraitUrl: isWebUrl(content.meetTroyPortraitUrl)
      ? content.meetTroyPortraitUrl
      : undefined,
    testimonials: testimonials?.length ? testimonials : undefined,
  }
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  const result = await readSanity<HomepageQueryContent>("homepage");
  return result ? cleanHomepageContent(result) : null
}
