import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./src/sanity/env";

// Used by the Sanity CLI (e.g. `npx sanity deploy`, `npx sanity typegen`).
export default defineCliConfig({
  api: { projectId, dataset },
});
