import type { ReactNode } from "react";

type SubpageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function SubpageShell({
  eyebrow,
  title,
  intro,
  children,
}: SubpageShellProps) {
  return (
    <main className="subpage">
      <header className="subpage-hero">
        <p className="subpage-hero__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subpage-hero__intro">{intro}</p>
      </header>
      {children}
    </main>
  );
}
