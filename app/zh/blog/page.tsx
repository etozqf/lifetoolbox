import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "博客",
  description: "实用生活指南——搭配免费在线工具一起使用。",
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh/blog`,
    languages: { en: `${siteConfig.siteUrl}/blog`, zh: `${siteConfig.siteUrl}/zh/blog` },
  },
};

export default function ZhBlogIndexPage() {
  const posts = getAllPosts("zh");
  return (
    <div className="mx-auto max-w-content px-4 py-12">
      <h1 className="text-3xl font-bold">博客</h1>
      <p className="mt-2 text-[var(--muted)]">实用生活指南——搭配免费在线工具一起使用。</p>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/zh/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-brand">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
              <time className="mt-1 block text-xs text-[var(--muted)]">{post.date}</time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
