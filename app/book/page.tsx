import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { SubpageShell } from "@/components/subpage-shell";
import { getBookContent } from "@/lib/sanity/book";
import amazonLogo from "../../public/images/booksellers/amazon.png";
import barnesNobleLogo from "../../public/images/booksellers/barnes-noble.svg";
import bookshopLogo from "../../public/images/booksellers/bookshop.png";
import bookCover from "../../public/images/troy-anderson-book-cover.png";

export const metadata: Metadata = {
  title: "The Book",
  description: "Explore Never Waste a Kick in the Nuts by Troy Anderson.",
};

const retailers = [
  "Amazon",
  "Barnes & Noble",
  "Bookshop.org",
  "Books-A-Million",
  "Simon & Schuster",
  "Walmart",
  "Target",
];

function defaultRetailerLogo(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  if (host === "amazon.com" || host === "amzn.to") return amazonLogo;
  if (host === "barnesandnoble.com") return barnesNobleLogo;
  if (host === "bookshop.org") return bookshopLogo;
  return undefined;
}

export default async function BookPage() {
  const book = await getBookContent();
  const retailerLinks = book?.retailers?.length ? book.retailers : null;
  const endorsements = book?.endorsements?.length ? book.endorsements : null;

  return (
    <SubpageShell
      variant="book"

      title={book?.title || "Never Waste A Kick In The Nuts"}
      subheader={book?.subheader || "Making Mentors Out of Tormentors"}
      intro={
        book?.intro ||
        "A book about making the most of moments—even the ones you never would have chosen."
      }
    >
      <section className="book-detail">
        {book?.coverImageUrl ? (
          <Image
            className="book-detail__cover"
            src={book.coverImageUrl}
            width={book.coverImageWidth || 800}
            height={book.coverImageHeight || 1200}
            alt={book.coverImageAlt || `${book.title || "Book"} cover`}
            sizes="(max-width: 700px) 58vw, 29vw"
          />
        ) : (
          <Image
            className="book-detail__cover"
            src={bookCover}
            alt="Never Waste a Kick in the Nuts by Troy Anderson"
            sizes="(max-width: 700px) 58vw, 29vw"
          />
        )}
        <article className="content-block book-detail__copy">

          <h2>{book?.overviewHeading || "Making the most out of moments."}</h2>
          {book?.overviewBody?.length ? (
            <div className="portable-copy">
              <PortableText value={book.overviewBody} />
            </div>
          ) : (
            <p>
              This lead description will introduce the promise of the book, its
              tone, and the reader it was written for. Final publisher copy can
              replace this concise placeholder when it is approved.
            </p>
          )}
        </article>
      </section>

      <section className="book-notes-grid">
        <article className="book-note book-note--cyan">

          <h2>
            {book?.inspirationHeading || "What inspired Troy to write it?"}
          </h2>
          {book?.inspirationBody?.length ? (
            <div className="portable-copy">
              <PortableText value={book.inspirationBody} />
            </div>
          ) : (
            <p>
              A short origin story and future “Read a Sample” action belong
              here.
            </p>
          )}
          {book?.sampleUrl ? (
            <a className="sample-action" href={book.sampleUrl}>
              {book?.sampleButtonLabel ?? "Read a Sample"}
            </a>
          ) : (
            <span className="sample-action sample-action--unavailable" aria-disabled="true">{book?.sampleUnavailableLabel ?? "Read a Sample — Coming Soon"}</span>
          )}
        </article>
      </section>

      <section className="retailers-panel">

        <h2>{book?.retailersHeading ?? "Choose your bookseller."}</h2>
        <div className="retailer-list" aria-label="Book retailers">
          {retailerLinks
            ? retailerLinks.map((retailer) => {
                const logo = retailer.logoUrl || defaultRetailerLogo(retailer.url);
                return (
                  <a key={retailer.name} href={retailer.url} aria-label={`Buy from ${retailer.name}`}>
                    {logo ? (
                      <Image className="retailer-logo" src={logo}
                        width={retailer.logoWidth || 400} height={retailer.logoHeight || 180}
                        alt={retailer.name} sizes="(max-width: 640px) 80vw, 28vw" />
                    ) : retailer.name}
                  </a>
                );
              })
            : retailers.map((retailer) => (
                <span key={retailer}>{retailer}</span>
              ))}
        </div>
      </section>

      <section className="endorsements-panel">

        <h2>{book?.endorsementsHeading ?? "What people are saying."}</h2>
        <div className="endorsement-grid">
          {endorsements
            ? endorsements.map((endorsement) => (
                <blockquote key={`${endorsement.name}-${endorsement.quote}`}>
                  <p>{endorsement.quote}</p>
                  <cite>
                    {endorsement.name}
                    {endorsement.attribution ? (
                      <small>{endorsement.attribution}</small>
                    ) : null}
                  </cite>
                </blockquote>
              ))
            : ["Endorsement One", "Endorsement Two", "Endorsement Three"].map(
                (label) => (
                  <blockquote key={label}>
                    <p>Selected endorsement copy will live here.</p>
                    <cite>{label}</cite>
                  </blockquote>
                ),
              )}
        </div>
      </section>
    </SubpageShell>
  );
}
