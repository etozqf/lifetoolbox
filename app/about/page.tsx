import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata = {
  title: "About",
  description: `About ${siteConfig.siteName} — free everyday calculators that run in your browser.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">About LifeToolbox</h1>
      <p className="mt-4 text-[var(--muted)]">
        LifeToolbox is a collection of free online tools for everyday life — tip
        calculators, BMI, unit converters, date tools, and more. Every calculation
        runs entirely in your browser. We never upload your data to our servers.
      </p>
      <p className="mt-4 text-[var(--muted)]">
        We pair simple, mobile-friendly calculators with practical guides so you
        can get answers fast — at a restaurant, while shopping, or planning your
        day.
      </p>
      <p className="mt-4 text-[var(--muted)]">
        Looking for developer tools? Visit our sister site{" "}
        <a
          href={siteConfig.sisterSite.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
        >
          {siteConfig.sisterSite.name}
        </a>
        .
      </p>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Health and finance tools are for informational purposes only — not medical
        or financial advice. See our <Link href="/terms">Terms</Link> for details.
      </p>
    </div>
  );
}
