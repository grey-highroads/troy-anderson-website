const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "gknd24m7";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-11";

export type MediaVideo = {
  key: string;
  title: string;
  mediaUrl: string;
  shareCopy: string;
};

export type MediaPhoto = {
  key: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
};

export type PublicityMaterial = {
  key: string;
  title: string;
  fileUrl: string;
  originalFilename?: string;
};

export type MediaPageContent = {
  heading?: string;
  videoIntroduction?: string;
  videos?: MediaVideo[];
  photographyIntroduction?: string;
  photos?: MediaPhoto[];
  publicityIntroduction?: string;
  publicityMaterials?: PublicityMaterial[];
};

type MediaPageResult = Omit<
  MediaPageContent,
  "videos" | "photos" | "publicityMaterials"
> & {
  videos?: Array<{
    _key?: string;
    title?: string;
    mediaUrl?: string;
    shareCopy?: string;
  }>;
  photos?: Array<{
    _key?: string;
    title?: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  publicityMaterials?: Array<{
    _key?: string;
    title?: string;
    fileUrl?: string;
    originalFilename?: string;
  }>;
};

const mediaPageQuery = `*[_type == "mediaPage"] | order(_updatedAt desc)[0]{
  heading,
  videoIntroduction,
  videos[]{_key, title, mediaUrl, shareCopy},
  photographyIntroduction,
  photos[]{
    _key,
    title,
    "imageUrl": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "alt": image.alt
  },
  publicityIntroduction,
  publicityMaterials[]{
    _key,
    title,
    "fileUrl": file.asset->url,
    "originalFilename": file.asset->originalFilename
  }
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

function cleanMediaPage(content: MediaPageResult): MediaPageContent {
  const videos = content.videos?.flatMap((video) => {
    if (
      !video._key ||
      !video.title ||
      !isWebUrl(video.mediaUrl) ||
      !video.shareCopy
    ) {
      return [];
    }

    return [
      {
        key: video._key,
        title: video.title,
        mediaUrl: video.mediaUrl,
        shareCopy: video.shareCopy,
      },
    ];
  });

  const photos = content.photos?.flatMap((photo) => {
    if (
      !photo._key ||
      !photo.title ||
      !isWebUrl(photo.imageUrl) ||
      !photo.width ||
      !photo.height ||
      !photo.alt
    ) {
      return [];
    }

    return [
      {
        key: photo._key,
        title: photo.title,
        imageUrl: photo.imageUrl,
        width: photo.width,
        height: photo.height,
        alt: photo.alt,
      },
    ];
  });

  const publicityMaterials = content.publicityMaterials?.flatMap((material) => {
    if (!material._key || !material.title || !isWebUrl(material.fileUrl)) {
      return [];
    }

    return [
      {
        key: material._key,
        title: material.title,
        fileUrl: material.fileUrl,
        originalFilename: material.originalFilename,
      },
    ];
  });

  return {...content, videos, photos, publicityMaterials};
}

export async function getMediaPageContent(): Promise<MediaPageContent | null> {
  const token = process.env.SANITY_API_READ_TOKEN?.trim();

  if (!token) return null;

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  endpoint.searchParams.set("query", mediaPageQuery);
  endpoint.searchParams.set("perspective", "published");

  const response = await fetch(endpoint, {
    headers: {Authorization: `Bearer ${token}`},
  });

  if (!response.ok) {
    throw new Error(
      `Sanity Media page query failed with status ${response.status}.`,
    );
  }

  const payload = (await response.json()) as {result?: MediaPageResult | null};
  return payload.result ? cleanMediaPage(payload.result) : null;
}
