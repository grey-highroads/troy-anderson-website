import { EditorialGrid } from "@/components/editorial-grid";
import Image from "next/image";
import Link from "next/link";

import { getHomepageContent } from "@/lib/sanity/homepage";

import bookCover from "../public/images/troy-anderson-book-cover.png";

export default async function Home() {
  const homepage = await getHomepageContent();

  return (
    <main>
      <section id="top" className="hero" aria-label="Featured stories">
        <EditorialGrid />
      </section>

      <section
        id="book-promo"
        className="book-promo"
        aria-labelledby="book-promo-title"
      >
        <Image
          className="book-promo__cover"
          src={bookCover}
          alt="Never Waste a Kick in the Nuts by Troy Anderson"
          sizes="(max-width: 640px) 28vw, 17vw"
        />

        <div className="book-promo__message">
          <h2 id="book-promo-title" className="book-promo__title">
            <span>Never Waste A</span>
            <span>Kick In The Nuts</span>
          </h2>

          <div className="book-promo__availability">
            <span className="book-promo__arrow" aria-hidden="true" />
            <p>Available On Amazon</p>
          </div>
        </div>
      </section>

      <section
        id="meet-troy"
        className="meet-troy"
        aria-labelledby="meet-troy-title"
      >
        <div className="meet-troy__copy">
          <p className="meet-troy__eyebrow">About Troy</p>
          <h2 id="meet-troy-title">
            {homepage?.meetTroyHeading || "Meet Troy"}
          </h2>
          <p className="meet-troy__summary">
            {homepage?.meetTroySummary ||
              "Troy Anderson is a life coach and author who helps people turn difficult moments into useful perspective and purposeful action."}
          </p>
          <Link className="meet-troy__link" href="/about">
            Read Troy&apos;s story
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {homepage?.meetTroyPortraitUrl ? (
          <Image
            className="meet-troy__portrait"
            src={homepage.meetTroyPortraitUrl}
            width={homepage.meetTroyPortraitWidth || 1200}
            height={homepage.meetTroyPortraitHeight || 1500}
            alt={homepage.meetTroyPortraitAlt || "Portrait of Troy Anderson"}
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        ) : (
          <div
            className="meet-troy__portrait-placeholder"
            aria-label="Portrait of Troy to come"
          >
            <span>Portrait</span>
            <small>Image to come</small>
          </div>
        )}
      </section>
    </main>
  );
}
