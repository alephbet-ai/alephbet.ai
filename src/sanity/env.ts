// Single source of truth for Sanity connection details.
// projectId and dataset are NOT secrets — they identify the public content API
// and always ship in the browser bundle. Reads from PUBLIC_* env when available
// (Vite/Astro context) and falls back to literals so the Sanity CLI (Node) works
// too.
export const projectId =
  import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? "z3owbx4h";

export const dataset =
  import.meta.env?.PUBLIC_SANITY_DATASET ?? "production";

// Pin the API date; bump deliberately when adopting new API features.
export const apiVersion =
  import.meta.env?.PUBLIC_SANITY_API_VERSION ?? "2026-02-01";
