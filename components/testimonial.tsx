"use client";

import { useId, useState } from "react";
import type { HomepageTestimonial } from "@/lib/sanity/homepage";

export function Testimonial({ testimonial }: { testimonial: HomepageTestimonial }) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();
  const quote = testimonial.quote.trim();
  const excerpt = testimonial.excerpt?.trim();
  const hasExcerpt = Boolean(excerpt && excerpt !== quote);

  return (
    <article className="testimonial">
      <blockquote>
        {hasExcerpt && !expanded ? (
          <p className="testimonial__quote">“{excerpt}”</p>
        ) : null}
        <div id={quoteId} hidden={hasExcerpt && !expanded}>
          <p className="testimonial__quote">“{quote}”</p>
        </div>
        <footer>
          <cite>{testimonial.name}</cite>
          {testimonial.credentials?.trim() ? <span>{testimonial.credentials}</span> : null}
        </footer>
      </blockquote>
      {hasExcerpt ? (
        <button
          className="testimonial__toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={quoteId}
          aria-label={`${expanded ? "Show less" : "Read full testimonial"} — ${testimonial.name}`}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Read full testimonial"}
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      ) : null}
    </article>
  );
}
