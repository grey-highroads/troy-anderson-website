import type { Metadata } from "next";
import Image from "next/image";

import { CopyShareText } from "@/components/copy-share-text";
import { SubpageShell } from "@/components/subpage-shell";
import { resolveMediaPoster } from "@/lib/media-poster";
import { getMediaPageContent } from "@/lib/sanity/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Watch and share Troy Anderson videos, approved photography, and publicity materials.",
};

export default async function MediaPage() {
  const media = await getMediaPageContent();
  const videos = media?.videos?.length
    ? await Promise.all(media.videos.map(async (video) => ({
        ...video,
        poster: await resolveMediaPoster(video),
      })))
    : null;
  const photos = media?.photos?.length ? media.photos : null;
  const materials = media?.publicityMaterials?.length
    ? media.publicityMaterials
    : null;

  return (
    <SubpageShell
      eyebrow="Media"
      title={media?.heading || "Media"}
      intro={
        media?.videoIntroduction ||
        "Watch and share selected videos, then find approved photography and publicity materials below."
      }
    >
      <section className="media-section media-section--paper">
        <header className="media-section__heading">
          <p className="section-label">Video</p>
          <h2>Watch &amp; share.</h2>
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
            Selected video links will be available here soon.
          </p>
        )}
      </section>

      <section className="media-section media-section--ink">
        <header className="media-section__heading">
          <p className="section-label">Photography</p>
          <h2>Approved images</h2>
          <p>
            {media?.photographyIntroduction ||
              "Download approved photography for editorial and publicity use."}
          </p>
        </header>
        {photos ? (
          <div className="media-photo-grid">
            {photos.map((photo) => (
              <article className="media-photo-card" key={photo.key}>
                <div className="media-photo-card__image">
                  <Image
                    src={photo.imageUrl}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 17vw"
                  />
                </div>
                <a
                  href={photo.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  aria-label={`Download ${photo.title}`}
                >
                  Download image <span aria-hidden="true">↓</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="media-empty-state">
            Approved photography will be available here soon.
          </p>
        )}
      </section>

      <section className="media-section media-section--cyan">
        <header className="media-section__heading">
          <p className="section-label">Publicity</p>
          <h2>Ready to use.</h2>
          <p>
            {media?.publicityIntroduction ||
              "Download current one-sheets and other approved publicity materials."}
          </p>
        </header>
        {materials ? (
          <div className="media-download-list">
            {materials.map((material) => (
              <a
                href={material.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                key={material.key}
              >
                <span>{material.title}</span>
                <small>{material.originalFilename || "Download file"}</small>
                <strong aria-hidden="true">↓</strong>
              </a>
            ))}
          </div>
        ) : (
          <p className="media-empty-state">
            Publicity downloads will be available here soon.
          </p>
        )}
      </section>
    </SubpageShell>
  );
}
