"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

type Tile = {
  id: string;
  eyebrow: string;
  title: string;
  tone: string;
};

const tiles: Tile[] = [
  { id: "conversation", eyebrow: "Conversation", title: "Listen closely", tone: "ink" },
  { id: "purpose", eyebrow: "Field note", title: "Purpose.", tone: "cream" },
  { id: "stage", eyebrow: "On stage", title: "A room in motion", tone: "blue" },
  { id: "book", eyebrow: "The book", title: "Begin here", tone: "orange" },
  { id: "podcast", eyebrow: "Podcast", title: "A longer answer", tone: "sand" },
  { id: "portrait", eyebrow: "Portrait", title: "Meet Troy", tone: "green" },
];

export function EditorialGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layoutIndex, setLayoutIndex] = useState(0);

  const updateComposition = useCallback(
    (nextSelectedId: string | null) => {
      const grid = gridRef.current;
      if (!grid) return;

      const tilesToAnimate = grid.querySelectorAll("[data-flip-id]");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        setSelectedId(nextSelectedId);
        if (selectedId && !nextSelectedId) {
          setLayoutIndex((current) => (current + 1) % 2);
        }
        return;
      }

      const state = Flip.getState(tilesToAnimate);

      flushSync(() => {
        setSelectedId(nextSelectedId);
        if (selectedId && !nextSelectedId) {
          setLayoutIndex((current) => (current + 1) % 2);
        }
      });

      Flip.from(state, {
        duration: 0.9,
        ease: "expo.inOut",
        absolute: true,
        scale: true,
        stagger: 0.025,
        onEnter: (elements) =>
          gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.3 }),
      });
    },
    [selectedId],
  );

  return (
    <div
      ref={gridRef}
      className={`editorial-grid layout-${layoutIndex === 0 ? "a" : "b"} ${
        selectedId ? "is-expanded" : ""
      }`}
    >
      {tiles.map((tile, index) => {
        const isSelected = selectedId === tile.id;
        const isDimmed = Boolean(selectedId && !isSelected);

        return (
          <button
            key={tile.id}
            type="button"
            data-flip-id={tile.id}
            className={`media-tile media-tile--${index + 1} tone-${tile.tone} ${
              isSelected ? "is-selected" : ""
            } ${isDimmed ? "is-dimmed" : ""}`}
            aria-expanded={isSelected}
            aria-label={`${isSelected ? "Close" : "Open"} ${tile.title}`}
            onClick={() => updateComposition(isSelected ? null : tile.id)}
          >
            <span className="media-tile__texture" aria-hidden="true" />
            <span className="media-tile__copy">
              <span className="media-tile__eyebrow">{tile.eyebrow}</span>
              <span className="media-tile__title">{tile.title}</span>
            </span>
            <span className="media-tile__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="media-tile__action" aria-hidden="true">
              {isSelected ? "Close" : "Play"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
