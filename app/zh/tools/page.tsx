import { ToolsIndexPage } from "@/components/pages/tools-index-page";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "全部工具",
  description: "LifeToolbox 全部免费在线工具列表。",
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh/tools`,
    languages: { en: `${siteConfig.siteUrl}/tools`, zh: `${siteConfig.siteUrl}/zh/tools` },
  },
};

export default function Page() {
  return <ToolsIndexPage />;
}
