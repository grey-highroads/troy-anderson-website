import type { Metadata } from "next";
import { Bebas_Neue, Source_Code_Pro } from "next/font/google";

import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
});

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
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${bebasNeue.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
