import "server-only";

import type { MediaVideo } from "@/lib/sanity/media";

type MediaPoster = NonNullable<MediaVideo["thumbnail"]>;

function youtubeVideoId(mediaUrl: string): string | null {
  try {
    const url = new URL(mediaUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const segments = url.pathname.split("/").filter(Boolean);
    let id: string | null = null;

    if (url.hostname === "youtu.be") {
      id = segments.length === 1 ? segments[0] : null;
    } else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else if (["shorts", "embed", "live"].includes(segments[0])) id = segments[1];
    }

    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export async function resolveMediaPoster(video: MediaVideo): Promise<MediaPoster> {
  if (video.thumbnail) return video.thumbnail;

  const id = youtubeVideoId(video.mediaUrl);
  if (id) {
    // Not every upload has a high-resolution poster. Probe only YouTube's
    // fixed image host at build time; unavailable posters use the local artwork.
    for (const [filename, width, height] of [
      ["maxresdefault", 1280, 720],
      ["hqdefault", 480, 360],
    ] as const) {
      const imageUrl = `https://i.ytimg.com/vi/${id}/${filename}.jpg`;
      try {
        const response = await fetch(imageUrl, {
          method: "HEAD",
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok && response.headers.get("content-type")?.startsWith("image/")) {
          return {imageUrl, width, height, alt: `Video poster for ${video.title}`};
        }
      } catch {
        // A provider failure must not prevent the static site from building.
      }
    }
  }

  const basePath = process.env.GITHUB_PAGES === "true" ? "/troy-anderson-website" : "";
  return {
    imageUrl: `${basePath}/images/media-video-fallback.svg`,
    width: 1280,
    height: 720,
    alt: `Troy Anderson video: ${video.title}`,
  };
}
