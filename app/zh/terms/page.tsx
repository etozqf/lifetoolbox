import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "使用条款",
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh/terms`,
    languages: { en: `${siteConfig.siteUrl}/terms`, zh: `${siteConfig.siteUrl}/zh/terms` },
  },
};

export default function ZhTermsPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">使用条款</h1>
      <p className="mt-4 text-[var(--muted)]">
        使用 LifeToolbox 即表示您同意将本网站工具用于个人、非商业用途。工具结果仅供参考，不构成专业建议。
      </p>
      <p className="mt-4 text-[var(--muted)]">
        完整法律条款请参阅英文版使用条款。
      </p>
      <p className="mt-4">
        <a href="/terms" className="text-brand hover:underline">
          查看英文完整版 →
        </a>
      </p>
    </div>
  );
}
