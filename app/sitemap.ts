import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { localizePath } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/seo";
import { CURRENT_PHASE, getToolsByPhase } from "@/lib/tool-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const staticPaths = ["", "/tools", "/blog", "/about", "/privacy", "/terms", "/affiliate-disclosure"];
  const tools = getToolsByPhase(CURRENT_PHASE);
  const posts = getAllPosts();

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    });
    entries.push({
      url: `${base}${localizePath(path, "zh")}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "" ? 0.9 : 0.7,
    });
  }

  for (const tool of tools) {
    entries.push({
      url: `${base}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
    entries.push({
      url: `${base}${localizePath(tool.path, "zh")}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const post of posts) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    entries.push({
      url: `${base}/zh/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return entries;
}
