"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

import Image from "next/image";

gsap.registerPlugin(Flip);

type Tile = {
  id: string;
  eyebrow: string;
  title: string;
  tone: string;
  clip?: string;
  previewDimensions?: [number, number];
  playbackDimensions?: [number, number];
};

const tiles: Tile[] = [
  { id: "conversation", eyebrow: "Conversation", title: "Troy Anderson — clip 02", tone: "ink", clip: "TA_BB_02-v2", previewDimensions: [700, 350] },
  { id: "purpose", eyebrow: "Field note", title: "Purpose.", tone: "cream" },
  { id: "stage", eyebrow: "On stage", title: "Troy Anderson — clip 08", tone: "blue", clip: "TA_BB_08-v2", previewDimensions: [350, 700], playbackDimensions: [960, 540] },
  { id: "book", eyebrow: "The book", title: "Begin here", tone: "orange" },
  { id: "podcast", eyebrow: "Podcast", title: "A longer answer", tone: "sand" },
  { id: "portrait", eyebrow: "Portrait", title: "Troy Anderson — clip 09", tone: "green", clip: "TA_BB_09-v2", previewDimensions: [350, 350] },
];

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function EditorialGrid({ videoBasePath }: { videoBasePath?: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewsPaused, setPreviewsPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => true);
  const [failedId, setFailedId] = useState<string | null>(null);
  const [layoutIndex, setLayoutIndex] = useState(0);

  useEffect(() => () => {
    animationRef.current?.kill();
  }, []);

  const updateComposition = useCallback(
    (nextSelectedId: string | null) => {
      const grid = gridRef.current;
      if (!grid) return;

      playerRef.current?.pause();
      // Finish any previous transition before capturing the next arrangement.
      animationRef.current?.progress(1).kill();
      const tilesToAnimate = grid.querySelectorAll("[data-flip-id]");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const state = reducedMotion ? null : Flip.getState(tilesToAnimate);
      const previousId = selectedId;

      flushSync(() => {
        setSelectedId(nextSelectedId);
        setFailedId(null);
        if (previousId && !nextSelectedId) {
          setLayoutIndex((current) => (current + 1) % 2);
        }
      });

      if (nextSelectedId) {
        // This runs in the click/key event, so audible playback has a user gesture.
        void playerRef.current?.play().catch(() => {
          // Native controls remain available if the browser blocks playback.
        });
        closeRef.current?.focus({ preventScroll: true });
      } else if (previousId) {
        grid.querySelector<HTMLButtonElement>(`[data-open-id="${previousId}"]`)
          ?.focus({ preventScroll: true });
      }

      const revealSelection = () => {
        if (nextSelectedId) {
          grid.querySelector<HTMLElement>(`[data-flip-id="${nextSelectedId}"]`)
            ?.scrollIntoView({ block: "nearest", behavior: "instant" });
        }
      };

      if (state) {
        animationRef.current = Flip.from(state, {
          duration: 0.9,
          ease: "expo.inOut",
          absolute: true,
          scale: true,
          stagger: 0.025,
          onComplete: revealSelection,
        });
      } else {
        revealSelection();
      }
    },
    [selectedId],
  );

  return (
    <div className="collage">
      {videoBasePath && !reducedMotion && (
        <button
          type="button"
          className="collage__motion-toggle"
          aria-pressed={previewsPaused}
          onClick={() => setPreviewsPaused((paused) => !paused)}
        >
          {previewsPaused ? "Resume animation" : "Pause animation"}
        </button>
      )}
      <div
        ref={gridRef}
        className={`editorial-grid layout-${layoutIndex === 0 ? "a" : "b"} ${videoBasePath ? "has-video-previews" : ""} ${selectedId ? "is-expanded" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "Escape" && selectedId) {
            event.preventDefault();
            updateComposition(null);
          }
        }}
      >
        {tiles.map((tile, index) => {
          const isSelected = selectedId === tile.id;
          const isDimmed = Boolean(selectedId && !isSelected);
          const clipPath = videoBasePath && tile.clip ? `${videoBasePath}/${tile.clip}` : null;
          const canOpen = Boolean(clipPath || !videoBasePath);
  
          return (
            <div
              key={tile.id}
              data-flip-id={tile.id}
              style={clipPath && tile.previewDimensions ? {
                "--preview-ratio": `${tile.previewDimensions[0]} / ${tile.previewDimensions[1]}`,
                "--playback-ratio": tile.playbackDimensions
                  ? `${tile.playbackDimensions[0]} / ${tile.playbackDimensions[1]}`
                  : "16 / 9",
                "--playback-shape": tile.playbackDimensions
                  ? tile.playbackDimensions[0] / tile.playbackDimensions[1]
                  : 16 / 9,
              } as CSSProperties : undefined}
              className={`media-tile media-tile--${index + 1} tone-${tile.tone} ${clipPath ? "has-preview" : ""} ${isSelected ? "is-selected" : ""} ${isDimmed ? "is-dimmed" : ""}`}
            >
              <span className="media-tile__texture" aria-hidden="true" />
              {clipPath && !isSelected && (
                <>
                  <Image
                    className="media-tile__poster"
                    src={`${clipPath}-poster.jpg`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    alt=""
                  />
                  {!previewsPaused && !reducedMotion && (
                    <video
                      className="media-tile__preview"
                      src={`${clipPath}-preview.mp4`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                      onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
                    />
                  )}
                </>
              )}
              {isSelected ? (
                <>
                  {clipPath && (
                    <video
                      ref={playerRef}
                      className="media-tile__player"
                      src={`${clipPath}.mp4`}
                      poster={`${clipPath}-poster.jpg`}
                      controls
                      playsInline
                      preload="none"
                      aria-label={tile.title}
                      onError={() => setFailedId(tile.id)}
                    >
                      Your browser cannot play this video. <a href={`${clipPath}.mp4`}>Open the video file</a>.
                    </video>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    className="media-tile__close"
                    aria-label={`Close ${tile.title}`}
                    onClick={() => updateComposition(null)}
                  >
                    Close <span aria-hidden="true">×</span>
                  </button>
                  {failedId === tile.id && (
                    <p className="media-tile__error" role="status">
                      This video could not load. <a href={`${clipPath}.mp4`}>Open the video file</a>.
                    </p>
                  )}
                </>
              ) : canOpen ? (
                <button
                  type="button"
                  data-open-id={tile.id}
                  className="media-tile__open"
                  aria-expanded={false}
                  aria-label={`Play ${tile.title}`}
                  onClick={() => updateComposition(tile.id)}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
