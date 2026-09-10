import { EditorialGrid } from "@/components/editorial-grid";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="site-header__identity">
          <a className="wordmark" href="#top" aria-label="Troy Anderson, home">
            Troy Anderson
          </a>
          <p className="site-header__strapline">Life Coach, Author</p>
        </div>

        <div className="menu-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      <section id="top" className="hero" aria-label="Featured stories">
        <EditorialGrid />
      </section>
    </main>
  );
}
