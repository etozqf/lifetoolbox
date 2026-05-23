import type { Metadata } from "next";

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
}): Metadata {
  const url = `${siteConfig.siteUrl}${opts.path}`;
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
    },
    alternates: { canonical: url },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
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
