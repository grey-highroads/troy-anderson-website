import Link from "next/link";

export function SiteFooter() {
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
          <span>Instagram</span>
          <span>YouTube</span>
          <span>LinkedIn</span>
        </div>
      </div>

      <p className="site-footer__legal">© 2026 Troy Anderson</p>
    </footer>
  );
}
