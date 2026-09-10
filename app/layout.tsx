import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Troy Anderson | Author, Speaker, Podcaster",
  description:
    "A motion study for the forthcoming Troy Anderson author and media website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
