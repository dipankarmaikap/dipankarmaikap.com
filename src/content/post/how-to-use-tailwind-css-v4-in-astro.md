---
title: "How to Use Tailwind CSS v4 in Astro"
pubDate: "February 9, 2025"
updatedDate: "Feb 12 2025"
description: "Learn how to set up Tailwind CSS v4 in an Astro project using the @tailwindcss/vite plugin. Follow this step-by-step guide to integrate Tailwind."
tags: ["Web Development", "Tailwind CSS", "Astro", "Tailwind Vite", "Vite"]
category: web-development
ogFilename: index.html
ogLanguage: html
ogCode: |-
  <div class="rounded-xl border p-6 shadow">
    <h2 class="text-xl font-bold">Hello</h2>
    <p class="font-bold">Tailwind CSS V4</p>
  </div>
---

[Tailwind CSS](https://tailwindcss.com/) is a popular utility-first CSS framework that helps you build modern and responsive web designs efficiently. In this tutorial, we’ll walk through how to set up Tailwind CSS v4 in an [Astro](https://astro.build/) project using the `@tailwindcss/vite` plugin.

## Install Tailwind CSS

To get started, install Tailwind CSS and the `@tailwindcss/vite` plugin via npm:

```bash
npm install tailwindcss @tailwindcss/vite
```

## Configure the Vite Plugin

Next, add the `@tailwindcss/vite` plugin to your Astro configuration file (`astro.config.mjs`):

```js astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## Import Tailwind CSS

Create a CSS file (e.g., `tailwind.css`) in your `src` directory and import Tailwind CSS by adding the following line:

```css src/tailwind.css
@import "tailwindcss";
```

## Include Tailwind in Your Astro Project

Make sure to reference the `tailwind.css` file you created in the previous step within your layout file (`layout.astro`). This ensures that Tailwind styles are correctly applied to your project. You can include it using the following method:

### Import in `layout.astro`

A complete `layout.astro` file may look like this:

```astro src/layouts/BaseLayout.astro
---
import "../tailwind.css";
---

<!DOCTYPE html>
<html lang="en" class="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content="{Astro.generator}" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Start Using Tailwind CSS

Once everything is set up, you can start using Tailwind’s utility classes in your Astro components. For example:

```html
<div class="bg-blue-500 text-white p-4 rounded-lg">
  Welcome to Tailwind CSS in Astro!
</div>
```

## Tailwind CSS v4 Breaking Changes

Tailwind CSS v4 introduces some breaking changes. If you’re upgrading from v3, you might notice differences in styling or some features behaving differently. I recommend checking out the official upgrade guide from Tailwind to ensure a smooth transition: [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

That’s it! You’ve successfully set up Tailwind CSS v4 in your Astro project. Happy coding! 🚀
