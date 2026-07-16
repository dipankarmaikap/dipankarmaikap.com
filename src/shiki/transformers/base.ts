// transformers/base.ts
import type { ShikiTransformer } from "shiki";

export function transformerCodeBase(): ShikiTransformer {
  return {
    name: "code-base",

    pre(node) {
      const props = (node.properties ??= {});

      props.class = ["code-block", "shiki"];
      props["data-code"] = this.source;

      props["data-meta"] = this.options.meta?.__raw ?? "";
      props.style = ["border: 1px solid #E0E0E0"].join(";");
    },
  };
}
