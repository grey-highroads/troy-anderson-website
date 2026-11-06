"use client";

import dynamic from "next/dynamic";

// Select the random pool only in the browser, before mounting ANY media.
// The reserved viewport avoids a default grid flash and hydration mismatch.
const InteractiveGrid = dynamic(
  () => import("@/components/editorial-grid").then((module) => module.EditorialGrid),
  {ssr: false, loading: () => <div className="collage collage--viewport" aria-label="Loading featured videos" aria-busy="true" />},
);

export function HomepageHero({videoBasePath}: {videoBasePath?: string}) {
  return <InteractiveGrid videoBasePath={videoBasePath} />;
}
