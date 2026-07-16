// transformers/options.ts
import type { ShikiTransformer } from "shiki";
import { getMeta } from "./meta";

export function transformerCodeOptions(): ShikiTransformer {
  return {
    name: "code-options",
    pre(node) {
      const props = (node.properties ??= {});
      const meta = getMeta(this.options.meta?.__raw ?? "");
      const classes = [...((props.class as string[]) ?? [])];
      if (!meta.hideLineNumbers()) {
        classes.push("has-line-numbers");
      }
      if (meta.hasHighlight()) {
        classes.push("has-highlight");
      }
      props.class = classes;
    },
  };
}
