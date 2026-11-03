import Link from "next/link";

import { getSiteSettingsContent } from "@/lib/sanity/site-settings";

const fallbackSocialLinks = {
  instagramUrl: "https://www.instagram.com/lifecoachtroy/",
  youtubeUrl: "https://www.youtube.com/@troyhinotelc",
  threadsUrl: "https://www.threads.com/lifecoachtroy",
};

export async function SiteFooter() {
  const siteSettings = await getSiteSettingsContent();
  const socialLinks = {
    instagramUrl:
      siteSettings?.instagramUrl || fallbackSocialLinks.instagramUrl,
    youtubeUrl: siteSettings?.youtubeUrl || fallbackSocialLinks.youtubeUrl,
    threadsUrl: siteSettings?.threadsUrl || fallbackSocialLinks.threadsUrl,
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__identity">
        <p className="site-footer__name">Troy Anderson</p>
        <p className="site-footer__role">Life Coach, Author</p>
      </div>

      <div
        className="site-footer__directory"
        aria-label="Contact and social links"
      >
        <p className="site-footer__label">Contact / Social</p>
        <div className="site-footer__links">
          <Link href="/contact">Contact</Link>
          <a href={socialLinks.instagramUrl}>Instagram</a>
          <a href={socialLinks.youtubeUrl}>YouTube</a>
          <a href={socialLinks.threadsUrl}>Threads</a>
        </div>
      </div>

      <p className="site-footer__legal">© 2026 Troy Anderson</p>
    </footer>
  );
}
