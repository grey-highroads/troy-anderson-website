import type { PortableTextBlock } from "@portabletext/react";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "gknd24m7";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-11";

type Retailer = {
  name: string;
  url: string;
};

type Endorsement = {
  quote: string;
  name: string;
  attribution?: string;
};

export type BookContent = {
  title?: string;
  intro?: string;
  coverImageUrl?: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  coverImageAlt?: string;
  overviewHeading?: string;
  overviewBody?: PortableTextBlock[];
  forewordExcerpt?: string;
  forewordByline?: string;
  inspirationHeading?: string;
  inspirationBody?: PortableTextBlock[];
  sampleUrl?: string;
  retailers?: Retailer[];
  endorsements?: Endorsement[];
};

const bookQuery = `*[_type == "book"] | order(_updatedAt desc)[0]{
  title,
  intro,
  "coverImageUrl": coverImage.asset->url,
  "coverImageWidth": coverImage.asset->metadata.dimensions.width,
  "coverImageHeight": coverImage.asset->metadata.dimensions.height,
  "coverImageAlt": coverImage.alt,
  overviewHeading,
  overviewBody,
  forewordExcerpt,
  forewordByline,
  inspirationHeading,
  inspirationBody,
  sampleUrl,
  retailers[]{name, url},
  endorsements[]{quote, name, attribution}
}`;

function isWebUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function cleanBookContent(content: BookContent): BookContent {
  return {
    ...content,
    coverImageUrl: isWebUrl(content.coverImageUrl)
      ? content.coverImageUrl
      : undefined,
    sampleUrl: isWebUrl(content.sampleUrl) ? content.sampleUrl : undefined,
    retailers: content.retailers?.filter(
      (retailer) => retailer?.name && isWebUrl(retailer.url),
    ),
  };
}

export async function getBookContent(): Promise<BookContent | null> {
  const token = process.env.SANITY_API_READ_TOKEN?.trim();

  if (!token) return null;

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  endpoint.searchParams.set("query", bookQuery);
  endpoint.searchParams.set("perspective", "published");

  const response = await fetch(endpoint, {
    headers: {Authorization: `Bearer ${token}`},
  });

  if (!response.ok) {
    throw new Error(`Sanity book query failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as {result?: BookContent | null};
  return payload.result ? cleanBookContent(payload.result) : null;
}
