import type { Metadata } from "next";
import Image from "next/image";

import { SubpageShell } from "@/components/subpage-shell";
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

export default function BookPage() {
  return (
    <SubpageShell
      eyebrow="The Book"
      title="Never Waste A Kick In The Nuts"
      intro="A book about making the most of moments—even the ones you never would have chosen."
    >
      <section className="book-detail">
        <Image
          className="book-detail__cover"
          src={bookCover}
          alt="Never Waste a Kick in the Nuts by Troy Anderson"
          sizes="(max-width: 700px) 58vw, 29vw"
        />
        <article className="content-block book-detail__copy">
          <p className="section-label">Overview</p>
          <h2>Making the most out of moments.</h2>
          <p>
            This lead description will introduce the promise of the book, its
            tone, and the reader it was written for. Final publisher copy can
            replace this concise placeholder when it is approved.
          </p>
        </article>
      </section>

      <section className="book-notes-grid">
        <article className="book-note book-note--ink">
          <p className="section-label">From the Foreword</p>
          <blockquote>
            A selected passage from William Paul Young’s foreword will live in
            this focused reading panel.
          </blockquote>
        </article>
        <article className="book-note book-note--cyan">
          <p className="section-label">Behind the Book</p>
          <h2>What inspired Troy to write it?</h2>
          <p>
            A short origin story and future “Read a Sample” action belong here.
          </p>
          <span className="stub-action">Read a Sample — Coming Soon</span>
        </article>
      </section>

      <section className="retailers-panel">
        <p className="section-label">Find the Book</p>
        <h2>Choose your bookseller.</h2>
        <div className="retailer-list" aria-label="Retailer links to come">
          {retailers.map((retailer) => (
            <span key={retailer}>{retailer}</span>
          ))}
        </div>
      </section>

      <section className="endorsements-panel">
        <p className="section-label">Advance Praise</p>
        <h2>What people are saying.</h2>
        <div className="endorsement-grid">
          {["Endorsement One", "Endorsement Two", "Endorsement Three"].map(
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
