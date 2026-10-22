import { readSanity } from "@/lib/sanity/client";
import type {PortableTextBlock} from '@portabletext/react'

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
  storyVideoUrl?: string
  storyVideoPosterUrl?: string
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

function cleanAboutContent(content: AboutContent): AboutContent {
  return {
    ...content,
    storyVideoUrl: isWebUrl(content.storyVideoUrl) ? content.storyVideoUrl : undefined,
    storyVideoPosterUrl: isWebUrl(content.storyVideoPosterUrl) ? content.storyVideoPosterUrl : undefined,
    portraitImageUrl: isWebUrl(content.portraitImageUrl)
      ? content.portraitImageUrl
      : undefined,
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const result = await readSanity<AboutContent>("about");
  return result ? cleanAboutContent(result) : null
}
