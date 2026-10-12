import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import {
  cleanBuildOutputDir,
  getWorkerBundleDir,
  readBuildOutput,
  writeAssets,
  writeRootConfig,
  writeWorkerConfig,
} from "@cloudflare/build-output-utils";
import config from "../cloudflare.config.ts";

// cf's beta Vite output does not yet support App Router child environments.
// Package the native, already-built vinext artifact using Cloudflare's utilities.
const root = process.cwd();
await cleanBuildOutputDir(root);
const bundle = getWorkerBundleDir(root);
await mkdir(bundle, { recursive: true });
await cp("dist/server", bundle, { recursive: true });
await writeAssets({ root, sourceDirectory: path.resolve("dist/client") });
const modules = {};
for (const file of await readdir(bundle, { recursive: true })) {
  const name = file.split(path.sep).join("/");
  if (name.endsWith(".js") || name.endsWith(".mjs")) modules[name] = { type: "esm" };
  if (name.endsWith(".css")) modules[name] = { type: "data" };
}
await writeWorkerConfig({
  root,
  config: config.worker,
  manifest: { type: "complete", mainModule: "index.js", modules },
});
await writeRootConfig(root, { accountId: config.accountId }, { mode: "test", isPreview: false });
await readBuildOutput(root);
console.log("Packaged native vinext Worker and assets for cf deployment.");
