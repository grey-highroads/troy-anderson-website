"use client";

import type { SyntheticEvent } from "react";

type HostedMediaVideoProps = {
  src: string;
  poster: string;
  title: string;
};

export function HostedMediaVideo({ src, poster, title }: HostedMediaVideoProps) {
  function pauseOtherClips(event: SyntheticEvent<HTMLVideoElement>) {
    const current = event.currentTarget;
    current.closest(".media-video-list")?.querySelectorAll("video").forEach((video) => {
      if (video !== current && !video.paused) video.pause();
    });
  }

  return (
    <video
      className="media-video-card__player"
      src={src}
      poster={poster}
      width={960}
      height={540}
      controls
      playsInline
      preload="none"
      aria-label={`Watch ${title}`}
      onPlay={pauseOtherClips}
    >
      Your browser cannot play this video. <a href={src}>Open the video</a>.
    </video>
  );
}
