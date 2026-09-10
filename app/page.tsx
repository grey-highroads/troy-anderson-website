import { EditorialGrid } from "@/components/editorial-grid";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Troy Anderson, home">
          Troy<br />
          Anderson
        </a>

        <div className="site-header__meta">
          <span>Author</span>
          <span>Speaker</span>
          <span>Podcaster</span>
        </div>

        <p className="prototype-label">Interaction study 01</p>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero__intro">
          <p className="eyebrow">A life shaped by purpose</p>
          <h1 id="hero-title">Stories that move people forward.</h1>
          <p className="hero__note">
            Select a frame to expand it. Close it to let the composition settle
            somewhere new.
          </p>
        </div>

        <EditorialGrid />
      </section>

      <footer className="site-footer">
        <p>Troy Anderson</p>
        <p>Prototype content only</p>
      </footer>
    </main>
  );
}
