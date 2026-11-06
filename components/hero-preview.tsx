"use client";

import {useEffect, useRef} from "react";

export function HeroPreview({src, playbackRate}: {src: string; playbackRate: number}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let disposed = false;
    let pending = false;
    // Set both the native state and attributes before requesting playback.
    // React's muted prop alone does not consistently serialize the attribute.
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;

    const start = () => {
      if (disposed || pending || document.hidden || !video.isConnected || !video.paused) return;
      pending = true;
      // Autoplay is a request. Readiness/visibility events provide bounded
      // retries if the browser rejects the initial dynamic-mount attempt.
      void video.play().catch(() => {
        // Keep the poster visible if device policy still prevents autoplay.
      }).finally(() => { pending = false; });
    };
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    document.addEventListener("visibilitychange", start);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
    });
    observer.observe(video);
    start();
    return () => {
      disposed = true;
      observer.disconnect();
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      document.removeEventListener("visibilitychange", start);
      video.pause();
    };
  }, [src, playbackRate]);

  return <video ref={ref} className="media-tile__preview" src={src}
    autoPlay muted loop playsInline preload="auto" aria-hidden="true"
    onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />;
}
