import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "关于我们",
  description: `关于 ${siteConfig.siteName} — 免费日常生活在线工具。`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh/about`,
    languages: { en: `${siteConfig.siteUrl}/about`, zh: `${siteConfig.siteUrl}/zh/about` },
  },
};

export default function ZhAboutPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">关于 LifeToolbox</h1>
      <p className="mt-4 text-[var(--muted)]">
        LifeToolbox 是一组免费日常生活在线工具——小费计算器、BMI、单位换算、日期工具等。所有计算均在您的浏览器本地完成，我们不会上传您的数据。
      </p>
      <p className="mt-4 text-[var(--muted)]">
        我们提供简洁、移动端友好的计算器，配合实用指南，让您在餐厅、购物或日常规划时快速获得答案。
      </p>
      <p className="mt-4 text-[var(--muted)]">
        需要开发者工具？请访问姐妹站{" "}
        <a
          href={siteConfig.sisterSite.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
        >
          {siteConfig.sisterSite.name}
        </a>
        。
      </p>
      <p className="mt-8">
        <Link href="/zh/tools" className="text-brand hover:underline">
          浏览全部工具 →
        </Link>
      </p>
    </div>
  );
}
