import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { SubpageShell } from "@/components/subpage-shell";
import { getAboutContent } from "@/lib/sanity/about";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Troy Anderson's story, work, and approach.",
};

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <SubpageShell
      eyebrow="About Troy"
      title={about?.title || "A Life In Motion"}
      intro={
        about?.intro ||
        "A place for Troy’s story, his work, and the experiences that shaped his approach to coaching and life."
      }
    >
      <section className="subpage-split subpage-split--paper">
        {about?.portraitImageUrl ? (
          <Image
            className="portrait-image"
            src={about.portraitImageUrl}
            width={about.portraitImageWidth || 1200}
            height={about.portraitImageHeight || 1500}
            alt={about.portraitImageAlt || "Portrait of Troy Anderson"}
            sizes="(max-width: 900px) 91vw, 43vw"
          />
        ) : (
          <div
            className="portrait-placeholder"
            aria-label="Portrait of Troy to come"
          >
            <span>Portrait</span>
            <small>Image to come</small>
          </div>
        )}
        <article className="content-block">
          <p className="section-label">Biography</p>
          <h2>{about?.biographyHeading || "Meet Troy"}</h2>
          {about?.biographyBody?.length ? (
            <div className="portable-copy">
              <PortableText value={about.biographyBody} />
            </div>
          ) : (
            <>
              <p>
                This opening biography will introduce Troy’s background, his
                point of view, and the work he does with people who are ready to
                move forward with greater intention.
              </p>
              <p>
                It is designed for a concise, human story rather than a formal
                list of credentials.
              </p>
            </>
          )}
        </article>
      </section>

      <section className="story-panel">
        <div className="content-block content-block--wide">
          <p className="section-label">Troy’s Story</p>
          <h2>
            {about?.storyHeading || "The road here was not a straight line."}
          </h2>
          <div className="copy-columns">
            {about?.storyBody?.length ? (
              <div className="portable-copy">
                <PortableText value={about.storyBody} />
              </div>
            ) : (
              <p>
                This area can hold the longer-form story: formative moments,
                hard-earned perspective, and the through-line connecting Troy’s
                personal experience to his work today.
              </p>
            )}
            <blockquote>
              {about?.pullQuote ||
                "A pull quote from the prologue or Troy’s own words can anchor the story here."}
            </blockquote>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}
