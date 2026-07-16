import type { ShikiTransformer } from "shiki";

const EXCLUDED_STYLES = ["background-color", "--shiki-dark-bg"];
const ADDITIONAL_STYLES = ["border: 1px solid #E0E0E0"];
export function transformerCodeBase(): ShikiTransformer {
  return {
    name: "code-base",
    pre(node) {
      const props = (node.properties ??= {});

      props.class = ["code-block", "shiki"];
      props["data-code"] = this.source;
      props["data-meta"] = this.options.meta?.__raw ?? "";

      const styles = (props.style ?? "")
        .split(";")
        .map((style) => style.trim())
        .filter(Boolean)
        .filter(
          (style) =>
            !EXCLUDED_STYLES.some((excluded) => style.startsWith(excluded)),
        );

      styles.push(...ADDITIONAL_STYLES);

      props.style = styles.join(";");
    },
  };
}
