// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// astro.config runs before Astro's env loading, so PUBLIC_* isn't on
// import.meta.env here — read the same values with Vite's loadEnv.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false, // false for fresh data in static builds
      studioBasePath: "/studio", // embed the Studio at /studio
    }),
    // Sanity Studio is a React app; @astrojs/react renders it.
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
