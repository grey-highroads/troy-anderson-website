import type { Metadata } from "next";
import Image from "next/image";
import { SubpageShell } from "@/components/subpage-shell";
import { getPressContent } from "@/lib/sanity/press";

export const metadata: Metadata = {
  title: "Press",
  description: "Approved photography for editorial and publicity use.",
  robots: { index: false, follow: false },
};

export default async function PressPage() {
  const press = await getPressContent();
  return (
    <SubpageShell
      title={press?.heading ?? "Press"}
      intro={press?.intro ?? "Approved photography for editorial and publicity use."}
    >
      <section className="media-section media-section--ink" aria-labelledby="press-images-title">
        <header className="media-section__heading">
          <h2 id="press-images-title">{press?.photographyHeading ?? "Approved images"}</h2>
          <p>{press?.photographyIntroduction ?? "Download approved photography for editorial and publicity use."}</p>
        </header>
        {press?.photos.length ? (
          <div className="media-photo-grid">
            {press.photos.map((photo) => (
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
                <a href={photo.imageUrl} target="_blank" rel="noreferrer" download aria-label={`Download ${photo.title}`}>
                  {press.downloadLabel ?? "Download image"} <span aria-hidden="true">↓</span>
                </a>
              </article>
            ))}
          </div>
        ) : <p className="media-empty-state">{press?.emptyMessage ?? "Approved photography will be available here soon."}</p>}
      </section>
    </SubpageShell>
  );
}
