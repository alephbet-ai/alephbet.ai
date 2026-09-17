// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Tailwind CSS v4 plugs into Astro through its Vite plugin.
// See https://tailwindcss.com/docs/installation/framework-guides/astro
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
