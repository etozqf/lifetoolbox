import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n/config";

const BLOG_DIR_EN = path.join(process.cwd(), "content/blog");
const BLOG_DIR_ZH = path.join(process.cwd(), "content/blog/zh");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  relatedTool?: string;
  content: string;
  locale: Locale;
};

function blogDir(locale: Locale): string {
  return locale === "zh" ? BLOG_DIR_ZH : BLOG_DIR_EN;
}

function readPostFile(slug: string, locale: Locale): BlogPost | null {
  const filePath = path.join(blogDir(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    keywords: (data.keywords as string[]) ?? [],
    relatedTool: data.relatedTool as string | undefined,
    content,
    locale,
  };
}

export function getAllPosts(locale: Locale = "en"): BlogPost[] {
  const enDir = blogDir("en");
  if (!fs.existsSync(enDir)) return [];
  const slugs = fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  const posts = slugs.map((slug) => {
    if (locale === "zh") {
      const zhPost = readPostFile(slug, "zh");
      if (zhPost) return { ...zhPost, locale: "zh" as const };
      const enPost = readPostFile(slug, "en");
      if (enPost) return { ...enPost, locale: "zh" as const };
      return null;
    }
    return readPostFile(slug, "en")!;
  }).filter((p): p is BlogPost => p !== null);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, locale: Locale = "en"): BlogPost | null {
  if (locale === "zh") {
    const zhPost = readPostFile(slug, "zh");
    if (zhPost) return { ...zhPost, locale: "zh" };
    const enPost = readPostFile(slug, "en");
    if (enPost) return { ...enPost, locale: "zh" };
    return null;
  }
  return readPostFile(slug, "en");
}
