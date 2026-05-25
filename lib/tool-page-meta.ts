import type { Locale } from "@/lib/i18n/config";
import { getLocalizedTool } from "@/lib/i18n";
import { buildToolMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/tool-registry";

export function toolMetadata(slug: string, titleOverride?: string, locale: Locale = "en") {
  const tool = getToolBySlug(slug)!;
  const display = getLocalizedTool(slug, locale)!;
  return buildToolMetadata({
    title: titleOverride ?? display.name,
    description: display.description,
    path: display.path,
    keywords: tool.keywords,
    cluster: tool.cluster,
    locale,
  });
}

export function toolProps(slug: string, locale: Locale = "en") {
  const tool = getToolBySlug(slug)!;
  const display = getLocalizedTool(slug, locale)!;
  return {
    title: display.name,
    description: display.description,
    path: display.path,
    related: tool.related,
    disclaimer: tool.disclaimer,
    cluster: tool.cluster,
  };
}
