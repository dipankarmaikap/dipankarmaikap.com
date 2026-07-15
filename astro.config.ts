// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { unified, rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeExternalLinks from "rehype-external-links";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";
import { transformerMetaHighlight } from "@shikijs/transformers";
import { transformerCodeOptions } from "./src/shiki/transformers/options";
import { transformerCodeHeader } from "./src/shiki/transformers/header";
import { transformerCodeBase } from "./src/shiki/transformers/base";

const env = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");
const { SITE_URL } = env;

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  devToolbar: {
    enabled: false,
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
    },
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeHeadingIds,
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer"],
          },
        ],
      ],
      remarkPlugins: [remarkReadingTime],
    }),
    shikiConfig: {
      theme: "github-light",
      transformers: [
        transformerMetaHighlight(),
        transformerCodeBase(),
        transformerCodeOptions(),
        transformerCodeHeader(),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  integrations: [mdx()],
  adapter: vercel(),
});
