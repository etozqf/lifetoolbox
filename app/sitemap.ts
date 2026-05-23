import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/seo";
import { CURRENT_PHASE, getToolsByPhase } from "@/lib/tool-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const staticPages = ["", "/tools", "/blog", "/about", "/privacy", "/terms", "/affiliate-disclosure"];
  const tools = getToolsByPhase(CURRENT_PHASE);
  const posts = getAllPosts();

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...tools.map((t) => ({
      url: `${base}${t.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
