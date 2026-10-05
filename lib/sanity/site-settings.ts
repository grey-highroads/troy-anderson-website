const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "gknd24m7";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-11";

export type SiteSettingsContent = {
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
};

const siteSettingsQuery = `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
  instagramUrl,
  youtubeUrl,
  linkedinUrl
}`;

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
  const token = process.env.SANITY_API_READ_TOKEN?.trim();

  if (!token) return null;

  const endpoint = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  endpoint.searchParams.set("query", siteSettingsQuery);
  endpoint.searchParams.set("perspective", "published");

  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(
      `Sanity Site settings query failed with status ${response.status}.`,
    );
  }

  const payload = (await response.json()) as {
    result?: SiteSettingsContent | null;
  };
  return payload.result ? cleanSiteSettingsContent(payload.result) : null;
}
