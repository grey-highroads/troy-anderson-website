import type { Metadata } from "next";
import { Bebas_Neue, Source_Code_Pro } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
  title: {
    default: "Troy Anderson | Life Coach & Author",
    template: "%s | Troy Anderson",
  },
  description:
    "Troy Anderson is a life coach and author helping people find purpose in every chapter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sourceCodePro.variable} ${bebasNeue.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
