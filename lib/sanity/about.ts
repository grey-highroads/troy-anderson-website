import type {PortableTextBlock} from '@portabletext/react'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || 'gknd24m7'
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2026-09-11'

export type AboutContent = {
  title?: string
  intro?: string
  portraitImageUrl?: string
  portraitImageWidth?: number
  portraitImageHeight?: number
  portraitImageAlt?: string
  biographyHeading?: string
  biographyBody?: PortableTextBlock[]
  storyHeading?: string
  storyBody?: PortableTextBlock[]
  pullQuote?: string
}

const aboutQuery = `*[_type == "about"] | order(_updatedAt desc)[0]{
  title,
  intro,
  "portraitImageUrl": portraitImage.asset->url,
  "portraitImageWidth": portraitImage.asset->metadata.dimensions.width,
  "portraitImageHeight": portraitImage.asset->metadata.dimensions.height,
  "portraitImageAlt": portraitImage.alt,
  biographyHeading,
  biographyBody,
  storyHeading,
  storyBody,
  pullQuote
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

function cleanAboutContent(content: AboutContent): AboutContent {
  return {
    ...content,
    portraitImageUrl: isWebUrl(content.portraitImageUrl)
      ? content.portraitImageUrl
      : undefined,
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const token = process.env.SANITY_API_READ_TOKEN?.trim()

  if (!token) return null

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  )
  endpoint.searchParams.set('query', aboutQuery)
  endpoint.searchParams.set('perspective', 'published')

  const response = await fetch(endpoint, {
    headers: {Authorization: `Bearer ${token}`},
  })

  if (!response.ok) {
    throw new Error(`Sanity About query failed with status ${response.status}.`)
  }

  const payload = (await response.json()) as {result?: AboutContent | null}
  return payload.result ? cleanAboutContent(payload.result) : null
}
