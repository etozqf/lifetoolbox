import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12 prose prose-slate dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>
        Last updated: May 23, 2026 · Applies to{" "}
        <Link href={siteConfig.siteUrl}>{siteConfig.siteUrl}</Link>
      </p>

      <p>
        {siteConfig.siteName} provides free online everyday calculators and tools.
        We respect your privacy and collect as little personal data as possible.
      </p>

      <h2>Your data stays on your device</h2>
      <p>
        Our tools (tip calculator, BMI, unit converters, etc.) run in your web
        browser. We do <strong>not</strong> upload the numbers, dates, or text
        you enter to our servers for processing.
      </p>

      <h2>Cookies and storage</h2>
      <ul>
        <li>
          <strong>cookie-consent</strong> (localStorage) — analytics preference
        </li>
        <li>
          <strong>theme</strong> (localStorage) — light/dark mode
        </li>
        <li>
          <strong>Google Analytics</strong> — only if you accept the cookie banner
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions? Email{" "}
        <a href="mailto:hello@lifetoolbox.com">hello@lifetoolbox.com</a>.
      </p>
    </div>
  );
}
