const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || 'gknd24m7'
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2026-09-11'

export type HomepageContent = {
  meetTroyHeading?: string
  meetTroySummary?: string
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

const homepageQuery = `*[_type == "homepage"] | order(_updatedAt desc)[0]{
  meetTroyHeading,
  meetTroySummary,
  "meetTroyPortraitUrl": meetTroyPortrait.asset->url,
  "meetTroyPortraitWidth": meetTroyPortrait.asset->metadata.dimensions.width,
  "meetTroyPortraitHeight": meetTroyPortrait.asset->metadata.dimensions.height,
  "meetTroyPortraitAlt": meetTroyPortrait.alt,
  testimonialsHeading,
  testimonials[]{
    _key,
    quote,
    name,
    credentials
  }
}`

function isWebUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function cleanHomepageContent(content: HomepageContent): HomepageContent {
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
    meetTroyPortraitUrl: isWebUrl(content.meetTroyPortraitUrl)
      ? content.meetTroyPortraitUrl
      : undefined,
    testimonials: testimonials?.length ? testimonials : undefined,
  }
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  const token = process.env.SANITY_API_READ_TOKEN?.trim()

  if (!token) return null

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  )
  endpoint.searchParams.set('query', homepageQuery)
  endpoint.searchParams.set('perspective', 'published')

  const response = await fetch(endpoint, {
    headers: {Authorization: `Bearer ${token}`},
  })

  if (!response.ok) {
    throw new Error(`Sanity Homepage query failed with status ${response.status}.`)
  }

  const payload = (await response.json()) as {result?: HomepageContent | null}
  return payload.result ? cleanHomepageContent(payload.result) : null
}
