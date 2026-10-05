import type { ReactNode } from "react";

type SubpageShellProps = {
  eyebrow: string;
  title: string;
  subheader?: string;
  intro: string;
  children: ReactNode;
};

export function SubpageShell({
  eyebrow,
  title,
  subheader,
  intro,
  children,
}: SubpageShellProps) {
  return (
    <main className="subpage">
      <header className="subpage-hero">
        <p className="subpage-hero__eyebrow">{eyebrow}</p>
        <div className="subpage-hero__title-group">
          <h1>{title}</h1>
          {subheader ? (
            <p className="subpage-hero__subheader">{subheader}</p>
          ) : null}
        </div>
        <p className="subpage-hero__intro">{intro}</p>
      </header>
      {children}
    </main>
  );
}
