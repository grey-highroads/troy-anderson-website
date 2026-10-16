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
  desktopArea: string;
  mobileArea: string;
  previewDimensions?: [number, number];
  playbackDimensions?: [number, number];
};

const tiles: Tile[] = [
  { id: "clip-02", eyebrow: "", title: "Troy Anderson — clip 02", tone: "ink", clip: "TA_BB_02", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "1 / 1 / 2 / 3", mobileArea: "1 / 1 / 2 / 3" },
  { id: "clip-04", eyebrow: "", title: "Troy Anderson — clip 04", tone: "ink", clip: "TA_BB_04", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "1 / 3 / 3 / 5", mobileArea: "2 / 1 / 3 / 2" },
  { id: "clip-05", eyebrow: "", title: "Troy Anderson — clip 05", tone: "ink", clip: "TA_BB_05", previewDimensions: [350, 700], playbackDimensions: [960, 540], desktopArea: "2 / 1 / 4 / 2", mobileArea: "2 / 2 / 4 / 3" },
  { id: "clip-06", eyebrow: "", title: "Troy Anderson — clip 06", tone: "ink", clip: "TA_BB_06", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "3 / 2 / 4 / 4", mobileArea: "4 / 1 / 5 / 3" },
  { id: "clip-07", eyebrow: "", title: "Troy Anderson — clip 07", tone: "ink", clip: "TA_BB_07", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "2 / 2 / 3 / 3", mobileArea: "3 / 1 / 4 / 2" },
  { id: "clip-08", eyebrow: "", title: "Troy Anderson — clip 08", tone: "ink", clip: "TA_BB_08", previewDimensions: [350, 700], playbackDimensions: [960, 540], desktopArea: "3 / 4 / 5 / 5", mobileArea: "5 / 1 / 7 / 2" },
  { id: "clip-09", eyebrow: "", title: "Troy Anderson — clip 09", tone: "ink", clip: "TA_BB_09", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "4 / 1 / 5 / 2", mobileArea: "5 / 2 / 6 / 3" },
  { id: "clip-10", eyebrow: "", title: "Troy Anderson — clip 10", tone: "ink", clip: "TA_BB_10", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "4 / 2 / 5 / 4", mobileArea: "7 / 1 / 8 / 3" },
  { id: "clip-11", eyebrow: "", title: "Troy Anderson — clip 11", tone: "ink", clip: "TA_BB_11", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "5 / 1 / 6 / 2", mobileArea: "6 / 2 / 7 / 3" },
  { id: "clip-12", eyebrow: "", title: "Troy Anderson — clip 12", tone: "ink", clip: "TA_BB_12", previewDimensions: [350, 700], playbackDimensions: [960, 540], desktopArea: "5 / 2 / 7 / 3", mobileArea: "8 / 1 / 10 / 2" },
  { id: "clip-13", eyebrow: "", title: "Troy Anderson — clip 13", tone: "ink", clip: "TA_BB_13", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "5 / 3 / 6 / 5", mobileArea: "10 / 1 / 11 / 3" },
  { id: "clip-14", eyebrow: "", title: "Troy Anderson — clip 14", tone: "ink", clip: "TA_BB_14", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "7 / 1 / 8 / 3", mobileArea: "11 / 1 / 12 / 3" },
  { id: "clip-15", eyebrow: "", title: "Troy Anderson — clip 15", tone: "ink", clip: "TA_BB_15", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "6 / 3 / 8 / 5", mobileArea: "8 / 2 / 9 / 3" },
  { id: "clip-17", eyebrow: "", title: "Troy Anderson — clip 17", tone: "ink", clip: "TA_BB_17", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "6 / 1 / 7 / 2", mobileArea: "9 / 2 / 10 / 3" },
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
          const previewPath = videoBasePath && tile.clip ? `${videoBasePath}/${tile.clip}` : null;
          const canOpen = Boolean(clipPath || !videoBasePath);
  
          return (
            <div
              key={tile.id}
              data-flip-id={tile.id}
              style={tile.previewDimensions ? {
                "--tile-area-a": tile.desktopArea,
                "--tile-area-b": tile.desktopArea.split(" / ").map((value, index, area) =>
                  index === 1 ? 6 - Number(area[3]) : index === 3 ? 6 - Number(area[1]) : value,
                ).join(" / "),
                "--tile-area-mobile": tile.mobileArea,
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
                    src={`${previewPath}-poster.jpg`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    alt=""
                  />
                  {!previewsPaused && !reducedMotion && (
                    <video
                      className="media-tile__preview"
                      src={`${previewPath}-preview.mp4`}
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
                      poster={`${previewPath}-poster.jpg`}
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
