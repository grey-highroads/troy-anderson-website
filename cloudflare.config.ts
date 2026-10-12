import { bindings, defineConfig, exports } from "cf/config";

// Test-only destination. Domain attachment remains a separate approved release.
export default defineConfig({
  accountId: "4fe56b3b11951a260d67361df9b864a0",
  worker: {
    name: "troy-anderson-website",
    entrypoint: "./cloudflare/worker.ts",
    compatibilityDate: "2026-10-12",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    previewUrls: true,
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      CLOUDFLARE_RUNTIME: bindings.text("true"),
      HOMEPAGE_VIDEO_POC: bindings.text("true"),
      NEXT_PUBLIC_SANITY_PROJECT_ID: bindings.text("gknd24m7"),
      NEXT_PUBLIC_SANITY_DATASET: bindings.text("production"),
      NEXT_PUBLIC_SANITY_API_VERSION: bindings.text("2026-09-11"),
      SANITY_API_READ_TOKEN: bindings.secret(),
      SANITY_PUBLISH_SECRET: bindings.secret(),
      CONTENT_CACHE: bindings.durableObject({ worker: "troy-anderson-website", exportName: "ContentCache" }),
    },
    exports: { ContentCache: exports.durableObject({ storage: "sqlite" }) },
    observability: {
      enabled: true,
      logs: { enabled: true },
      traces: { enabled: true, headSamplingRate: 0.01 },
    },
  },
});
