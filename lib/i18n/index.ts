import type { ToolEntry, ToolCluster } from "@/lib/tool-registry";
import { clusterLabels, getToolBySlug } from "@/lib/tool-registry";
import type { Locale } from "./config";
import type { Messages } from "./messages/en";
import { en } from "./messages/en";
import { zh } from "./messages/zh";
import { clusterLabelsZh, toolTranslationsZh } from "./tool-translations";
import { localizePath } from "./paths";

const dictionaries: Record<Locale, Messages> = { en: en as Messages, zh };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export function getClusterLabel(cluster: ToolCluster, locale: Locale): string {
  if (locale === "zh") return clusterLabelsZh[cluster];
  return clusterLabels[cluster];
}

export function getToolDisplay(tool: ToolEntry, locale: Locale) {
  if (locale === "zh") {
    const zhTool = toolTranslationsZh[tool.slug];
    if (zhTool) {
      return {
        name: zhTool.name,
        description: zhTool.description,
        path: localizePath(tool.path, locale),
      };
    }
  }
  return {
    name: tool.name,
    description: tool.description,
    path: localizePath(tool.path, locale),
  };
}

export function getLocalizedTool(slug: string, locale: Locale) {
  const tool = getToolBySlug(slug);
  if (!tool) return undefined;
  return { ...tool, ...getToolDisplay(tool, locale) };
}

export function getLocalizedRelatedTools(slugs: string[], locale: Locale) {
  return slugs
    .map((slug) => getLocalizedTool(slug, locale))
    .filter((t): t is ToolEntry & { path: string } => Boolean(t));
}

export type { Messages } from "./messages/en";
export { localizePath, switchLocalePath, localeFromPathname, stripLocalePrefix } from "./paths";
