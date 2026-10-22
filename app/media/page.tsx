import type { Metadata } from "next";
import Image from "next/image";

import { CopyShareText } from "@/components/copy-share-text";
import { SubpageShell } from "@/components/subpage-shell";
import { resolveMediaPoster } from "@/lib/media-poster";
import { getMediaPageContent } from "@/lib/sanity/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Watch Troy Anderson’s YouTube videos and explore podcast appearances.",
};

export default async function MediaPage() {
  const media = await getMediaPageContent();
  const videos = media?.videos?.length
    ? await Promise.all(media.videos.map(async (video) => ({
        ...video,
        poster: await resolveMediaPoster(video),
      })))
    : null;

  return (
    <SubpageShell
      title={media?.heading || "Media"}
      intro={media?.videoIntroduction || "Watch and share Troy’s YouTube videos and explore his podcast appearances."}
    >
      <section
        className="media-section media-section--paper"
        aria-labelledby="youtube-title"
      >
        <header className="media-section__heading">
          <h2 id="youtube-title">{media?.youtubeHeading || "Troy’s YouTube Channel"}</h2>
        </header>
        {videos ? (
          <div className="media-video-list">
            {videos.map((video, index) => (
              <article className="media-video-card" key={video.key}>
                <p className="media-item-number">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <a
                  className="media-video-card__poster"
                  href={video.mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${video.title} (opens in a new tab)`}
                >
                  <Image
                    src={video.poster.imageUrl}
                    width={video.poster.width}
                    height={video.poster.height}
                    alt={video.poster.alt}
                    sizes="(max-width: 640px) 100vw, 80vw"
                  />
                </a>
                <h3>{video.title}</h3>
                <p>{video.shareCopy}</p>
                <div className="media-card-actions">
                  <a
                    href={video.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${video.title} (opens in a new tab)`}
                  >
                    Open media <span aria-hidden="true">↗</span>
                  </a>
                  <CopyShareText copy={video.shareCopy} url={video.mediaUrl} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="media-empty-state">
            {media?.videoEmptyMessage || "Selected video links will be available here soon."}
          </p>
        )}
      </section>

      <section
        className="media-section media-section--ink"
        aria-labelledby="podcasts-title"
      >
        <header className="media-section__heading">
          <h2 id="podcasts-title">{media?.podcastHeading || "Podcast Appearances"}</h2>
        </header>
        <p className="media-empty-state">{media?.podcastIntroduction || "Coming soon."}</p>
      </section>
    </SubpageShell>
  );
}
