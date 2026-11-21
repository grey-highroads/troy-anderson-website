// Public address search engines should treat as the real site. Review and
// provider hosts serve the same pages, so canonical tags, the sitemap and
// robots.txt all point here. Override with NEXT_PUBLIC_SITE_URL if the
// production address changes.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.lifecoachtroy.com"
).replace(/\/+$/, "");

// Indexable routes. Press is deliberately left out: it is noindex.
export const indexableRoutes = ["/", "/about/", "/book/", "/media/", "/contact/"] as const;
