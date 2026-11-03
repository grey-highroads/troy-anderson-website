const clips = {
  "clip-06": { title: "Video 6", file: "TA_BB_06" },
  "clip-09": { title: "Video 9", file: "TA_BB_09" },
} as const;

export type WebsiteClipId = keyof typeof clips;

export const websiteClipOptions = Object.entries(clips).map(([value, clip]) => ({
  title: `${clip.title} — full clip`,
  value,
}));

export function getWebsiteClip(value: unknown) {
  if (typeof value !== "string" || !Object.prototype.hasOwnProperty.call(clips, value)) {
    return undefined;
  }

  const id = value as WebsiteClipId;
  const basePath = process.env.GITHUB_PAGES === "true" ? "/troy-anderson-website" : "";
  return {
    id,
    src: `${basePath}/videos/hero-20261016/${clips[id].file}.mp4`,
    poster: `${basePath}/images/media/${clips[id].file}-poster.jpg`,
    width: 960,
    height: 540,
  };
}
