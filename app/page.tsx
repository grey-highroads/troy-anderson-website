import { EditorialGrid } from "@/components/editorial-grid";
import Image from "next/image";

import bookCover from "../public/images/troy-anderson-book-cover.png";

export default function Home() {
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

    </main>
  );
}
