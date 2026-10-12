import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from "node:path";

// Only this toolchain enables runtime output; `next build` keeps static export.
process.env.CLOUDFLARE_RUNTIME = "true";
process.env.HOMEPAGE_VIDEO_POC = "true";
delete process.env.GITHUB_PAGES;

export default defineConfig({
  resolve: { alias: { "@/lib/sanity/client": path.resolve("cloudflare/client.ts") } },
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      experimental: { newConfig: true },
    }),
  ],
});
