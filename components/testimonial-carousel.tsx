"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Testimonial } from "@/components/testimonial";
import type { HomepageTestimonial } from "@/lib/sanity/homepage";

const READING_MS = 8000;
const DISSOLVE_MS = 1000;
function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TestimonialCarousel({ testimonials }: { testimonials: HomepageTestimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribe, prefersReducedMotion, () => true);
  const canRotate = !paused && !hovered && !focused && visible && !reducedMotion && testimonials.length > 1;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold: 0.25});
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % testimonials.length), READING_MS + DISSOLVE_MS);
    return () => window.clearTimeout(timer);
  }, [canRotate, active, testimonials.length]);

  function advance(direction: number) {
    setPaused(true);
    setActive((index) => (index + direction + testimonials.length) % testimonials.length);
  }
  if (!testimonials.length) return null;

  return (
    <div ref={ref} className="testimonial-carousel" role="region" aria-roledescription="carousel" aria-label="Testimonials"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
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
