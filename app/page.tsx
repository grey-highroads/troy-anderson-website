import { HomepageHero } from "@/components/homepage-hero";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { getHomepageContent } from "@/lib/sanity/homepage";
import { defaultTestimonials } from "@/lib/testimonials";

import bookCover from "../public/images/troy-anderson-book-flat.jpg";

// Toggle to true to restore the approved announcement experiment (copy + layout).
const showBookAnnouncement = false;

export default async function Home() {
  const homepage = await getHomepageContent();
  const promotion = homepage?.bookPromotion;
  const headline = promotion?.headline || (showBookAnnouncement ? "Troy’s\nNew Book" : "Never Waste A\nKick In The Nuts");
  const subhead = promotion?.subhead || (showBookAnnouncement ? "Now Available" : "Available On Amazon");
  const supportingCopy = promotion?.supportingCopy || (showBookAnnouncement ? "Life is going to hit you. That much is certain. The only real question is whether you’ll waste the pain." : undefined);
  const testimonials = homepage?.testimonials || defaultTestimonials;

  return (
    <main>
      <section id="top" className="hero" aria-label="Featured stories">
        <HomepageHero
          videoBasePath={process.env.HOMEPAGE_VIDEO_POC === "true" || process.env.GITHUB_PAGES === "true"
            ? `${process.env.GITHUB_PAGES === "true" ? "/troy-anderson-website" : ""}/videos/hero-20261016`
            : undefined}
        />
      </section>

      <section
        id="meet-troy"
        className="meet-troy"
        aria-labelledby="meet-troy-title"
      >
        <div className="meet-troy__copy">

          <h2 id="meet-troy-title">
            {homepage?.meetTroyHeading || "Meet Troy"}
          </h2>
          <div className="meet-troy__summary portable-copy">
            {homepage?.meetTroySummary?.length ? (
              <PortableText value={homepage.meetTroySummary} />
            ) : (
              <p>Troy Anderson is a life coach and author who helps people turn difficult moments into useful perspective and purposeful action.</p>
            )}
          </div>
          <Link className="meet-troy__link" href="/about#my-backstory">
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

      <section
        id="testimonials"
        className="testimonials"
        aria-labelledby="testimonials-title"
      >
        <div className="testimonials__heading">
          <h2 id="testimonials-title">
            {homepage?.testimonialsHeading || "What they’re saying about Troy"}
          </h2>
        </div>

        <TestimonialCarousel testimonials={testimonials} />
      </section>

      <section
        id="book-promo"
        className={`book-promo${showBookAnnouncement ? " book-promo--announcement" : ""}`}
        aria-labelledby="book-promo-title"
      >
        <Image
          className="book-promo__cover"
          src={promotion?.imageUrl || bookCover}
          width={promotion?.imageUrl ? promotion.imageWidth || bookCover.width : undefined}
          height={promotion?.imageUrl ? promotion.imageHeight || bookCover.height : undefined}
          alt={promotion?.imageAlt || "Never Waste a Kick in the Nuts by Troy Anderson"}
          sizes={showBookAnnouncement ? "(max-width: 640px) 34vw, 23vw" : "(max-width: 640px) 28vw, 17vw"}
        />

        <div className="book-promo__message">
          <div className="book-promo__heading-group">
          <h2 id="book-promo-title" className="book-promo__title">
            {headline.split(/\r?\n/).map((line, index) => <span key={index}>{line}</span>)}
          </h2>

          <div className="book-promo__availability">
            <span className="book-promo__arrow" aria-hidden="true" />
            <p>{subhead}</p>
          </div>
          </div>
          {supportingCopy && <p className="book-promo__summary">{supportingCopy}</p>}
        </div>
      </section>
    </main>
  );
}
