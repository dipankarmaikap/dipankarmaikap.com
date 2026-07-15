// transformers/meta.ts

export function getMeta(raw = "") {
  const title =
    raw
      .match(/title=(?:"([^"]+)"|'([^']+)'|([^\s]+))/)
      ?.slice(1)
      .find(Boolean) ?? null;

  return {
    raw,

    title,

    has(option: string) {
      return raw.includes(option);
    },

    hasLineNumbers() {
      return raw.includes("showLineNumbers");
    },
    hideLineNumbers() {
      return raw.includes("hideLineNumbers");
    },

    hasHighlight() {
      return raw.includes("{");
    },

    isFilename() {
      return (
        !title &&
        !raw.includes("showLineNumbers") &&
        !raw.includes("{") &&
        raw.trim() !== ""
      );
    },

    displayTitle() {
      return title ?? (this.isFilename() ? raw : "");
    },
  };
}
