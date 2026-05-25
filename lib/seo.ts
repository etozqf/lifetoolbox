import type { Metadata } from "next";
import { getOgImageForCluster } from "@/lib/og-images";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import type { ToolCluster } from "@/lib/tool-registry";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://life.hottoolsbox.com";

export const siteConfig = {
  siteName: "LifeToolbox",
  siteUrl: rawSiteUrl.replace(/\/$/, ""),
  defaultOgImage: "/og-images/default.png",
  twitterHandle: "@lifetoolbox",
  locale: "en_US",
  description:
    "Free everyday online tools — tip calculator, BMI, percentage, unit converters, and more. No signup, runs in your browser.",
  sisterSite: {
    name: "DevToolbox",
    url: "https://dev.hottoolsbox.com",
  },
};

export function buildToolMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  cluster?: ToolCluster;
  locale?: Locale;
}): Metadata {
  const url = `${siteConfig.siteUrl}${opts.path}`;
  const ogImage = getOgImageForCluster(opts.cluster);
  const imageUrl = `${siteConfig.siteUrl}${ogImage}`;
  const enPath = opts.locale === "zh" ? opts.path.replace(/^\/zh/, "") || "/" : opts.path;
  const zhPath = opts.locale === "zh" ? opts.path : localizePath(opts.path, "zh");
  return {
    title: `${opts.title} | ${siteConfig.siteName}`,
    description: opts.description,
    keywords: opts.keywords,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: "website",
      siteName: siteConfig.siteName,
      locale: opts.locale === "zh" ? "zh_CN" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: opts.title }],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.siteUrl}${enPath}`,
        zh: `${siteConfig.siteUrl}${zhPath}`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [imageUrl],
    },
  };
}

export function webApplicationJsonLd(opts: {
  name: string;
  url: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    url: opts.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: opts.description,
  };
}
