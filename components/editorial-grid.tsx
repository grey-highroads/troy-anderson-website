"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

import Image from "next/image";
import { HeroPreview } from "@/components/hero-preview";
import { NINE_CLIP_HERO, initialHeroPool, rotateHeroPool } from "@/lib/hero-pool";
import { heroLayout } from "@/lib/hero-layout";

gsap.registerPlugin(Flip);

type Tile = {
  id: string;
  eyebrow: string;
  title: string;
  tone: string;
  clip?: string;
  desktopArea: string;
  tabletArea: string;
  mobileArea: string;
  previewDimensions?: [number, number];
  playbackDimensions?: [number, number];
};

// November 6 full-speed previews play at native speed. Reassess on EVERY
// asset replacement; keep 1 for native-speed files. Only muted hero previews.
const HERO_PREVIEW_PLAYBACK_RATE = 1;

const tiles: Tile[] = [
  { id: "clip-02", eyebrow: "", title: "Troy Anderson — clip 02", tone: "ink", clip: "TA_BB_02", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "1 / 1 / 2 / 3", tabletArea: "1 / 1 / 2 / 3", mobileArea: "1 / 1 / 2 / 3" },
  { id: "clip-04", eyebrow: "", title: "Troy Anderson — clip 04", tone: "ink", clip: "TA_BB_04", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "1 / 3 / 2 / 4", tabletArea: "1 / 3 / 3 / 5", mobileArea: "1 / 3 / 3 / 5" },
  { id: "clip-05", eyebrow: "", title: "Troy Anderson — clip 05", tone: "ink", clip: "TA_BB_05", previewDimensions: [350, 700], playbackDimensions: [960, 540], desktopArea: "1 / 4 / 4 / 5", tabletArea: "1 / 5 / 3 / 6", mobileArea: "2 / 1 / 4 / 2" },
  { id: "clip-06", eyebrow: "", title: "Troy Anderson — clip 06", tone: "ink", clip: "TA_BB_06", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "1 / 5 / 2 / 7", tabletArea: "2 / 1 / 3 / 3", mobileArea: "3 / 2 / 4 / 4" },
  { id: "clip-07", eyebrow: "", title: "Troy Anderson — clip 07", tone: "ink", clip: "TA_BB_07", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "2 / 1 / 3 / 2", tabletArea: "3 / 1 / 4 / 2", mobileArea: "2 / 2 / 3 / 3" },
  { id: "clip-08", eyebrow: "", title: "Troy Anderson — clip 08", tone: "ink", clip: "TA_BB_08", previewDimensions: [350, 700], playbackDimensions: [960, 540], desktopArea: "2 / 2 / 5 / 3", tabletArea: "3 / 2 / 5 / 3", mobileArea: "3 / 4 / 5 / 5" },
  { id: "clip-09", eyebrow: "", title: "Troy Anderson — clip 09", tone: "ink", clip: "TA_BB_09", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "2 / 3 / 3 / 4", tabletArea: "3 / 3 / 4 / 4", mobileArea: "4 / 1 / 5 / 2" },
  { id: "clip-10", eyebrow: "", title: "Troy Anderson — clip 10", tone: "ink", clip: "TA_BB_10", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "2 / 5 / 3 / 7", tabletArea: "3 / 4 / 4 / 6", mobileArea: "4 / 2 / 5 / 4" },
  { id: "clip-11", eyebrow: "", title: "Troy Anderson — clip 11", tone: "ink", clip: "TA_BB_11", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "3 / 1 / 4 / 2", tabletArea: "4 / 1 / 5 / 2", mobileArea: "5 / 1 / 6 / 2" },
  { id: "clip-12", eyebrow: "", title: "Troy Anderson — clip 12", tone: "ink", clip: "TA_BB_12", previewDimensions: [350, 700], playbackDimensions: [960, 540], desktopArea: "3 / 3 / 5 / 4", tabletArea: "4 / 3 / 6 / 4", mobileArea: "5 / 2 / 7 / 3" },
  { id: "clip-13", eyebrow: "", title: "Troy Anderson — clip 13", tone: "ink", clip: "TA_BB_13", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "3 / 5 / 4 / 7", tabletArea: "4 / 4 / 5 / 6", mobileArea: "5 / 3 / 6 / 5" },
  { id: "clip-14", eyebrow: "", title: "Troy Anderson — clip 14", tone: "ink", clip: "TA_BB_14", previewDimensions: [700, 350], playbackDimensions: [960, 540], desktopArea: "4 / 4 / 5 / 6", tabletArea: "5 / 1 / 6 / 3", mobileArea: "7 / 1 / 8 / 3" },
  { id: "clip-15", eyebrow: "", title: "Troy Anderson — clip 15", tone: "ink", clip: "TA_BB_15", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "4 / 1 / 5 / 2", tabletArea: "5 / 4 / 6 / 5", mobileArea: "6 / 3 / 8 / 5" },
  { id: "clip-17", eyebrow: "", title: "Troy Anderson — clip 17", tone: "ink", clip: "TA_BB_17", previewDimensions: [350, 350], playbackDimensions: [960, 540], desktopArea: "4 / 6 / 5 / 7", tabletArea: "5 / 5 / 6 / 6", mobileArea: "6 / 1 / 7 / 2" },
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
  const collageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewsPaused, setPreviewsPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => true);
  const [failedId, setFailedId] = useState<string | null>(null);
  const [layoutIndex, setLayoutIndex] = useState(() => NINE_CLIP_HERO && Math.random() < 0.5 ? 1 : 0);
  const [pool, setPool] = useState(() => initialHeroPool(tiles.length));
  const [gridAspect, setGridAspect] = useState(8 / 3);
  const visibleTiles = NINE_CLIP_HERO ? pool.visible.map((index) => tiles[index]) : tiles;
  const layout = NINE_CLIP_HERO ? heroLayout(visibleTiles.map((tile) => tile.previewDimensions ? tile.previewDimensions[0] / tile.previewDimensions[1] : 1), gridAspect) : [];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !NINE_CLIP_HERO) return;
    const observer = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect;
      if (height > 0) setGridAspect(width / height);
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const collage = collageRef.current;
    if (!header || !collage) return;

    const measureHeader = () => {
      collage.style.setProperty("--site-header-height", `${header.getBoundingClientRect().height}px`);
    };
    measureHeader();
    const observer = new ResizeObserver(measureHeader);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

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
      const previousId = selectedId;
      const nextPool = NINE_CLIP_HERO && previousId && !nextSelectedId
        ? rotateHeroPool(pool, tiles.findIndex((tile) => tile.id === previousId)) : pool;
      const retainedIds = new Set(nextPool.visible.map((index) => tiles[index].id));
      const tilesToAnimate = Array.from(grid.querySelectorAll<HTMLElement>("[data-flip-id]"))
        .filter((node) => !NINE_CLIP_HERO || retainedIds.has(node.dataset.flipId || ""));
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const state = reducedMotion || NINE_CLIP_HERO ? null : Flip.getState(tilesToAnimate);

      flushSync(() => {
        setSelectedId(nextSelectedId);
        setFailedId(null);
        if (previousId && !nextSelectedId) {
          setLayoutIndex((current) => (current + 1) % 2);
          if (NINE_CLIP_HERO) setPool(nextPool);
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

      if (NINE_CLIP_HERO && !reducedMotion) {
        // Geometry changes immediately; fade only. Never scale video pixels.
        animationRef.current = gsap.timeline().fromTo(grid.querySelectorAll("[data-flip-id]"),
          {opacity: 0.7}, {opacity: 1, duration: 0.35, clearProps: "opacity"});
      }
      if (state) {
        animationRef.current = Flip.from(state, {
          duration: 0.9,
          ease: "expo.inOut",
          absolute: true,
          scale: true,
          stagger: 0.025,
        });
      }
    },
    [selectedId, pool],
  );

  return (
    <div ref={collageRef} className="collage collage--viewport">
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
        className={`editorial-grid ${NINE_CLIP_HERO ? "is-nine" : ""} layout-${layoutIndex === 0 ? "a" : "b"} ${videoBasePath ? "has-video-previews" : ""} ${selectedId ? "is-expanded" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "Escape" && selectedId) {
            event.preventDefault();
            updateComposition(null);
          }
        }}
      >
        {visibleTiles.map((tile, index) => {
          const rect = layout[index] || {left: 0, top: 0, width: 1, height: 1};
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
                "--tile-area-desktop": tile.desktopArea,
                "--tile-area-tablet": tile.tabletArea,
                "--tile-area-mobile": tile.mobileArea,
                "--hero-left": `${(layoutIndex ? 1 - rect.left - rect.width : rect.left) * 100}%`,
                "--hero-top": `${rect.top * 100}%`,
                "--hero-width": `${rect.width * 100}%`,
                "--hero-height": `${rect.height * 100}%`,
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
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    src={`${previewPath}-poster.jpg?v=20261106`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    alt=""
                  />
                  {!previewsPaused && !reducedMotion && (
                    <HeroPreview
                      src={`${previewPath}-preview.mp4?v=20261106`}
                      playbackRate={HERO_PREVIEW_PLAYBACK_RATE}
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
                      poster={`${previewPath}-poster.jpg?v=20261106`}
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
