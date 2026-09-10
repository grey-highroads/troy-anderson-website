# Shared Layouts

## RootLayout

- Path: `app/layout.tsx`
- Description: Required Next.js root layout providing document metadata and the global stylesheet.

```tsx
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
```

The current site header and footer are rendered directly in `app/page.tsx`; they are not yet shared components.
