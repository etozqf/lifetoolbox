import { HomePage } from "@/components/pages/home-page";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "日常生活工具，简单好用",
  description: "免费在线计算器：小费、BMI、百分比、单位换算等——无需注册，在浏览器本地运行。",
  alternates: {
    canonical: `${siteConfig.siteUrl}/zh`,
    languages: { en: siteConfig.siteUrl, zh: `${siteConfig.siteUrl}/zh` },
  },
};

export default function Page() {
  return <HomePage locale="zh" />;
}
