import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "隐私政策",
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh/privacy`,
    languages: { en: `${siteConfig.siteUrl}/privacy`, zh: `${siteConfig.siteUrl}/zh/privacy` },
  },
};

export default function ZhPrivacyPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">隐私政策</h1>
      <p className="mt-4 text-[var(--muted)]">
        LifeToolbox 的工具在您的浏览器本地运行。我们不会收集、存储或上传您输入的计算数据。
      </p>
      <p className="mt-4 text-[var(--muted)]">
        我们可能使用 Google Analytics（在您同意 Cookie 后）了解网站使用情况，并使用 Google AdSense 展示广告。详情请参阅英文版完整隐私政策。
      </p>
      <p className="mt-4">
        <a href="/privacy" className="text-brand hover:underline">
          查看英文完整版 →
        </a>
      </p>
    </div>
  );
}
