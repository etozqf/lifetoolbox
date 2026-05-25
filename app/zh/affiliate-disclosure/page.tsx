import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "联盟披露",
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh/affiliate-disclosure`,
    languages: {
      en: `${siteConfig.siteUrl}/affiliate-disclosure`,
      zh: `${siteConfig.siteUrl}/zh/affiliate-disclosure`,
    },
  },
};

export default function ZhAffiliatePage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">联盟营销披露</h1>
      <p className="mt-4 text-[var(--muted)]">
        LifeToolbox 的部分页面包含联盟营销链接。当您通过我们的链接购买产品时，我们可能会获得佣金，这不会增加您的购买成本。
      </p>
      <p className="mt-4 text-[var(--muted)]">
        完整披露说明请参阅英文版。
      </p>
      <p className="mt-4">
        <a href="/affiliate-disclosure" className="text-brand hover:underline">
          查看英文完整版 →
        </a>
      </p>
    </div>
  );
}
