import { codeToHast } from "shiki";
import type { Element, Root, RootContent } from "hast";

export interface SvgToken {
  text: string;
  color?: string;
}

export interface SvgLine {
  tokens: SvgToken[];
}

export async function highlightForOg(
  code: string,
  lang = "ts",
  theme = "github-light",
): Promise<SvgLine[]> {
  const tree = (await codeToHast(code, {
    lang,
    theme,
  })) as Root;
  return extractLines(tree);
}

function extractLines(tree: Root): SvgLine[] {
  const lines: SvgLine[] = [];

  visit(tree);

  return lines;

  function visit(node: Root | RootContent | Element): void {
    if (
      node.type === "element" &&
      node.tagName === "span" &&
      hasClass(node, "line")
    ) {
      lines.push({
        tokens: extractTokens(node),
      });

      return;
    }

    if ("children" in node) {
      for (const child of node.children) {
        visit(child as RootContent);
      }
    }
  }
}
function hasClass(node: Element, className: string): boolean {
  const value = node.properties?.class ?? node.properties?.className;

  if (typeof value === "string") {
    return value.split(/\s+/).includes(className);
  }

  if (Array.isArray(value)) {
    return value.includes(className);
  }

  return false;
}
function extractTokens(line: Element): SvgToken[] {
  const tokens: SvgToken[] = [];

  for (const child of line.children) {
    collect(child as RootContent, tokens);
  }

  return mergeTokens(tokens);
}

function collect(
  node: RootContent,
  tokens: SvgToken[],
  inheritedColor?: string,
): void {
  if (node.type === "text") {
    tokens.push({
      text: node.value,
      color: inheritedColor,
    });
    return;
  }

  if (node.type !== "element") return;

  const color = getColor(node) ?? inheritedColor;

  for (const child of node.children) {
    collect(child as RootContent, tokens, color);
  }
}

function getColor(node: Element): string | undefined {
  const style = node.properties?.style;

  if (typeof style !== "string") {
    return;
  }

  return style.match(/color:\s*([^;]+)/)?.[1].trim();
}

function mergeTokens(tokens: SvgToken[]): SvgToken[] {
  const merged: SvgToken[] = [];

  for (const token of tokens) {
    const last = merged.at(-1);

    if (last && last.color === token.color) {
      last.text += token.text;
    } else {
      merged.push({ ...token });
    }
  }

  return merged;
}
