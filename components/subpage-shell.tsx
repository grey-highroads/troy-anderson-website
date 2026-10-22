import type { ReactNode } from "react";

type SubpageShellProps = {
  variant?: "about" | "book";
  title: string;
  subheader?: string;
  intro: string;
  children: ReactNode;
};

export function SubpageShell({
  variant,
  title,
  subheader,
  intro,
  children,
}: SubpageShellProps) {
  return (
    <main className={`subpage${variant ? ` subpage--${variant}` : ""}`}>
      <header className="subpage-hero">
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
