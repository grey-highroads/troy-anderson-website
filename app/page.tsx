import { EditorialGrid } from "@/components/editorial-grid";
import Image from "next/image";

import bookCover from "../public/images/troy-anderson-book-cover.png";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="site-header__identity">
          <a className="wordmark" href="#top" aria-label="Troy Anderson, home">
            Troy Anderson
          </a>
          <p className="site-header__strapline">Life Coach, Author</p>
        </div>

        <div className="menu-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

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

      <footer className="site-footer">
        <div className="site-footer__identity">
          <p className="site-footer__name">Troy Anderson</p>
          <p className="site-footer__role">Life Coach, Author</p>
        </div>

        <div
          className="site-footer__directory"
          aria-label="Contact and social links coming soon"
        >
          <p className="site-footer__label">Contact / Social</p>
          <div className="site-footer__links">
            <span>Email</span>
            <span>Instagram</span>
            <span>YouTube</span>
            <span>LinkedIn</span>
          </div>
        </div>

        <p className="site-footer__legal">© 2026 Troy Anderson</p>
      </footer>
    </main>
  );
}
