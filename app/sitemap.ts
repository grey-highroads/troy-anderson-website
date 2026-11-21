import type { MetadataRoute } from "next";

import { indexableRoutes, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({ url: `${siteUrl}${route}` }));
}
