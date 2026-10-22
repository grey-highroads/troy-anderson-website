import { readSanity } from "@/lib/sanity/client";
import type { PortableTextBlock } from "@portabletext/react";

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
  subheader?: string;
  intro?: string;
  coverImageUrl?: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  coverImageAlt?: string;
  overviewHeading?: string;
  overviewBody?: PortableTextBlock[];
  inspirationHeading?: string;
  inspirationBody?: PortableTextBlock[];
  sampleUrl?: string;
  retailersHeading?: string;
  endorsementsHeading?: string;
  sampleButtonLabel?: string;
  sampleUnavailableLabel?: string;

  retailers?: Retailer[];
  endorsements?: Endorsement[];
};

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
  const result = await readSanity<BookContent>("book");
  return result ? cleanBookContent(result) : null;
}
