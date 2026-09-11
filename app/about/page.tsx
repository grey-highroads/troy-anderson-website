import type { Metadata } from "next";

import { SubpageShell } from "@/components/subpage-shell";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Troy Anderson's story, work, and approach.",
};

export default function AboutPage() {
  return (
    <SubpageShell
      eyebrow="About Troy"
      title="A Life In Motion"
      intro="A place for Troy’s story, his work, and the experiences that shaped his approach to coaching and life."
    >
      <section className="subpage-split subpage-split--paper">
        <div className="portrait-placeholder" aria-label="Portrait of Troy to come">
          <span>Portrait</span>
          <small>Image to come</small>
        </div>
        <article className="content-block">
          <p className="section-label">Biography</p>
          <h2>Meet Troy</h2>
          <p>
            This opening biography will introduce Troy’s background, his point
            of view, and the work he does with people who are ready to move
            forward with greater intention.
          </p>
          <p>
            It is designed for a concise, human story rather than a formal list
            of credentials.
          </p>
        </article>
      </section>

      <section className="story-panel">
        <div className="content-block content-block--wide">
          <p className="section-label">Troy’s Story</p>
          <h2>The road here was not a straight line.</h2>
          <div className="copy-columns">
            <p>
              This area can hold the longer-form story: formative moments,
              hard-earned perspective, and the through-line connecting Troy’s
              personal experience to his work today.
            </p>
            <blockquote>
              A pull quote from the prologue or Troy’s own words can anchor the
              story here.
            </blockquote>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}
