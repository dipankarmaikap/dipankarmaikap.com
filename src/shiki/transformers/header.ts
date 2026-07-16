// transformers/header.ts
import type { ShikiTransformer } from "shiki";
import { getMeta } from "./meta";

export function transformerCodeHeader(): ShikiTransformer {
  return {
    name: "code-header",

    pre(node) {
      const meta = getMeta(this.options.meta?.__raw ?? "");

      node.children.unshift({
        type: "element",
        tagName: "div",
        properties: {
          class: "code-header",
        },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: {
              class: "code-title",
            },
            children: [
              {
                type: "text",
                value: meta.displayTitle(),
              },
            ],
          },
          {
            type: "element",
            tagName: "div",
            properties: {
              class: "code-actions",
            },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  class: "code-language",
                },
                children: [
                  {
                    type: "text",
                    value: this.options.lang ?? "",
                  },
                ],
              },
              {
                type: "element",
                tagName: "button",
                properties: {
                  class: "code-copy",
                  type: "button",
                  "aria-label": "Copy code",
                },
                children: [
                  {
                    type: "text",
                    value: "Copy",
                  },
                ],
              },
            ],
          },
        ],
      });
    },
  };
}
