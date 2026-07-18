import type { BundledLanguage } from "shiki";

export const codeExamples: {
  filename: string;
  language: BundledLanguage;
  code: string;
}[] = [
  {
    filename: "main.ts",
    language: "ts",
    code: `button.addEventListener("click", handleClick);

function handleClick() {
  // Toggle the state
}`,
  },

  {
    filename: "utils.ts",
    language: "ts",
    code: `export function formatDate(date: Date) {
    // Format the date as "MM/DD/YYYY"
  return date.toLocaleDateString();
}`,
  },

  {
    filename: "styles.css",
    language: "css",
    code: `.card {
  padding: 1rem;
  border-radius: .5rem;
}`,
  },

  {
    filename: "app.astro",
    language: "astro",
    code: `---
const title = "Hello";
---

<h1>{title}</h1>`,
  },
];
