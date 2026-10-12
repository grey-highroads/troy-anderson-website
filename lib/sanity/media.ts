import { readSanity } from "@/lib/sanity/client";

export type MediaVideo = {
  key: string;
  title: string;
  mediaUrl: string;
  shareCopy: string;
  thumbnail?: {
    imageUrl: string;
    width: number;
    height: number;
    alt: string;
  };
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
    thumbnail?: {
      imageUrl?: string;
      width?: number;
      height?: number;
      alt?: string;
    } | null;
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
        thumbnail: isWebUrl(video.thumbnail?.imageUrl)
          ? {
              imageUrl: video.thumbnail.imageUrl,
              width: video.thumbnail.width && video.thumbnail.width > 0
                ? video.thumbnail.width : 1280,
              height: video.thumbnail.height && video.thumbnail.height > 0
                ? video.thumbnail.height : 720,
              alt: video.thumbnail.alt?.trim() || `Video poster for ${video.title}`,
            }
          : undefined,
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
  const result = await readSanity<MediaPageResult>("mediaPage");
  return result ? cleanMediaPage(result) : null;
}
