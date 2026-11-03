import type { Metadata } from "next";
import Image from "next/image";

import { HostedMediaVideo } from "@/components/hosted-media-video";
import { CopyShareText } from "@/components/copy-share-text";
import { SubpageShell } from "@/components/subpage-shell";
import { resolveMediaPoster } from "@/lib/media-poster";
import { getMediaPageContent } from "@/lib/sanity/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Watch videos from Troy Anderson and explore podcast appearances.",
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
      intro={media?.videoIntroduction || "Watch and share videos from Troy Anderson and explore his podcast appearances."}
    >
      <section
        className="media-section media-section--paper"
        aria-labelledby="videos-title"
      >
        <header className="media-section__heading">
          <h2 id="videos-title">{media?.youtubeHeading || "Troy’s Videos"}</h2>
        </header>
        {videos ? (
          <div className="media-video-list">
            {videos.map((video, index) => (
              <article className="media-video-card" key={video.key} id={`video-${video.key}`}>
                <p className="media-item-number">
                  {String(index + 1).padStart(2, "0")}
                </p>
                {video.hostedClip ? (
                  <HostedMediaVideo src={video.mediaUrl} poster={video.poster.imageUrl} title={video.title} />
                ) : (
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
                )}
                <h3>{video.title}</h3>
                {video.shareCopy !== video.title ? <p>{video.shareCopy}</p> : null}
                <div className="media-card-actions">
                  {!video.hostedClip ? (
                    <a
                      href={video.mediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${video.title} (opens in a new tab)`}
                    >
                      Open media <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  <CopyShareText copy={video.shareCopy} url={video.hostedClip
                    ? `${process.env.GITHUB_PAGES === "true" ? "/troy-anderson-website" : ""}/media/#video-${encodeURIComponent(video.key)}`
                    : video.mediaUrl} />
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
