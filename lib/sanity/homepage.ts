import { readSanity } from "@/lib/sanity/client";
import type {PortableTextBlock} from '@portabletext/react'

export type HomepageContent = {
  bookPromotion?: {headline?: string; subhead?: string; supportingCopy?: string; imageUrl?: string; imageAlt?: string; imageWidth?: number; imageHeight?: number}
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
  excerpt?: string
  name: string
  credentials?: string
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
      testimonial.name.trim().length > 0,
  )

  return {
    ...content,
    bookPromotion: content.bookPromotion ? {
      imageUrl: isWebUrl(content.bookPromotion.imageUrl) ? content.bookPromotion.imageUrl : undefined,
      imageAlt: typeof content.bookPromotion.imageAlt === 'string' ? content.bookPromotion.imageAlt.trim() || undefined : undefined,
      imageWidth: typeof content.bookPromotion.imageWidth === 'number' && Number.isFinite(content.bookPromotion.imageWidth) && content.bookPromotion.imageWidth > 0 ? content.bookPromotion.imageWidth : undefined,
      imageHeight: typeof content.bookPromotion.imageHeight === 'number' && Number.isFinite(content.bookPromotion.imageHeight) && content.bookPromotion.imageHeight > 0 ? content.bookPromotion.imageHeight : undefined,
      headline: typeof content.bookPromotion.headline === 'string' ? content.bookPromotion.headline.trim() || undefined : undefined,
      subhead: typeof content.bookPromotion.subhead === 'string' ? content.bookPromotion.subhead.trim() || undefined : undefined,
      supportingCopy: typeof content.bookPromotion.supportingCopy === 'string' ? content.bookPromotion.supportingCopy.trim() || undefined : undefined,
    } : undefined,
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
