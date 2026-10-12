import { readSanity } from "@/lib/sanity/client";

export type SiteSettingsContent = {
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
};

function isWebUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function cleanSiteSettingsContent(
  content: SiteSettingsContent,
): SiteSettingsContent {
  return {
    instagramUrl: isWebUrl(content.instagramUrl)
      ? content.instagramUrl
      : undefined,
    youtubeUrl: isWebUrl(content.youtubeUrl) ? content.youtubeUrl : undefined,
    linkedinUrl: isWebUrl(content.linkedinUrl)
      ? content.linkedinUrl
      : undefined,
  };
}

export async function getSiteSettingsContent(): Promise<SiteSettingsContent | null> {
  const result = await readSanity<SiteSettingsContent>("siteSettings");
  return result ? cleanSiteSettingsContent(result) : null;
}
