import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

// Studio configuration. When embedded via @sanity/astro it is mounted at the
// integration's `studioBasePath` (/studio); `sanity dev` also reads this file.
export default defineConfig({
  name: "default",
  title: "alephbet.ai",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
