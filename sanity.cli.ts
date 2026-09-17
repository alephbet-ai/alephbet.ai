import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./src/sanity/env";

// Used by the Sanity CLI (e.g. `npx sanity deploy`, `npx sanity typegen`).
export default defineCliConfig({
  api: { projectId, dataset },
  // Published Studio: https://alephbet-ai.sanity.studio
  studioHost: "alephbet-ai",
  deployment: { autoUpdates: true, appId: "cgjp555m1a3yj0qd9sovofeg" },
});
