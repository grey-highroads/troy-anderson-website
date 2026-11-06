"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Testimonial } from "@/components/testimonial";
import type { HomepageTestimonial } from "@/lib/sanity/homepage";

// Start a new one-second dissolve every six seconds.
const ADVANCE_MS = 6000;
function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TestimonialCarousel({ testimonials }: { testimonials: HomepageTestimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribe, prefersReducedMotion, () => true);
  const canRotate = !paused && !reducedMotion && testimonials.length > 1;

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % testimonials.length), ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [canRotate, active, testimonials.length]);

  function advance(direction: number) {
    setPaused(true);
    setActive((index) => (index + direction + testimonials.length) % testimonials.length);
  }
  if (!testimonials.length) return null;

  return (
    <div className="testimonial-carousel" role="region" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="testimonial-carousel__slides" aria-live={canRotate ? "off" : "polite"}>
        {testimonials.map((testimonial, index) => (
          <div key={testimonial._key || index} className={`testimonial-carousel__slide${index === active ? " is-active" : ""}`}
            role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`}
            aria-hidden={index !== active} inert={index !== active}>
            <Testimonial key={active} testimonial={testimonial} onExpand={() => setPaused(true)} />
          </div>
        ))}
      </div>
      {testimonials.length > 1 && <div className="testimonial-carousel__controls">
        <button type="button" aria-label="Previous testimonial" onClick={() => advance(-1)}>←</button>
        <span aria-live={canRotate ? "off" : "polite"} aria-atomic="true">{active + 1} of {testimonials.length}</span>
        <button type="button" aria-label="Next testimonial" onClick={() => advance(1)}>→</button>
        {!reducedMotion && <button type="button" className="testimonial-carousel__rotation" onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play testimonials" : "Pause testimonials"}>{paused ? "Play" : "Pause"}</button>}
      </div>}
    </div>
  );
}
