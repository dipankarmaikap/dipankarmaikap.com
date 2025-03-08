// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://dipankarmaikap.com",
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  integrations: [mdx()],
  adapter: vercel(),
});
