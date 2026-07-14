// src/shiki/transformers/filename.ts

export function transformerFilename() {
  return {
    name: "filename",

    pre(node) {
      const meta = this.options.meta?.__raw;

      if (!meta) return;

      // Ignore known attributes
      if (
        meta.includes("title=") ||
        meta.includes("showLineNumbers") ||
        meta.includes("{")
      ) {
        return;
      }

      node.children.unshift({
        type: "element",
        tagName: "div",
        properties: {
          class: "code-filename",
        },
        children: [
          {
            type: "text",
            value: meta,
          },
        ],
      });
    },
  };
}
