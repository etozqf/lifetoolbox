import { buildToolMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/tool-registry";

export function toolMetadata(slug: string, titleOverride?: string) {
  const tool = getToolBySlug(slug)!;
  return buildToolMetadata({
    title: titleOverride ?? tool.name,
    description: tool.description,
    path: tool.path,
    keywords: tool.keywords,
    cluster: tool.cluster,
  });
}

export function toolProps(slug: string) {
  const tool = getToolBySlug(slug)!;
  return {
    title: tool.name,
    description: tool.description,
    path: tool.path,
    related: tool.related,
    disclaimer: tool.disclaimer,
    cluster: tool.cluster,
  };
}
