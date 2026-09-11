const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || 'gknd24m7'
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2026-09-11'

export type ContactContent = {
  title?: string
  intro?: string
  portraitImageUrl?: string
  portraitImageWidth?: number
  portraitImageHeight?: number
  portraitImageAlt?: string
  formHeading?: string
}

const contactQuery = `*[_type == "contact"] | order(_updatedAt desc)[0]{
  title,
  intro,
  "portraitImageUrl": portraitImage.asset->url,
  "portraitImageWidth": portraitImage.asset->metadata.dimensions.width,
  "portraitImageHeight": portraitImage.asset->metadata.dimensions.height,
  "portraitImageAlt": portraitImage.alt,
  formHeading
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

function cleanContactContent(content: ContactContent): ContactContent {
  return {
    ...content,
    portraitImageUrl: isWebUrl(content.portraitImageUrl)
      ? content.portraitImageUrl
      : undefined,
  }
}

export async function getContactContent(): Promise<ContactContent | null> {
  const token = process.env.SANITY_API_READ_TOKEN?.trim()

  if (!token) return null

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  )
  endpoint.searchParams.set('query', contactQuery)
  endpoint.searchParams.set('perspective', 'published')

  const response = await fetch(endpoint, {
    headers: {Authorization: `Bearer ${token}`},
  })

  if (!response.ok) {
    throw new Error(`Sanity Contact query failed with status ${response.status}.`)
  }

  const payload = (await response.json()) as {result?: ContactContent | null}
  return payload.result ? cleanContactContent(payload.result) : null
}
