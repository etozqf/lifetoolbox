import { siteConfig } from "@/lib/seo";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-[var(--muted)]">
        {siteConfig.siteName} is provided &quot;as is&quot; without warranty. Use
        the tools at your own risk.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Health &amp; fitness tools</h2>
      <p className="mt-2 text-[var(--muted)]">
        BMI and ideal weight calculators are for informational purposes only. They
        do not constitute medical advice, diagnosis, or treatment. Consult a
        qualified healthcare provider for health-related questions.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Financial calculators</h2>
      <p className="mt-2 text-[var(--muted)]">
        Tip, discount, and bill-splitting tools provide estimates for educational
        purposes only. They do not constitute financial advice.
      </p>
      <p className="mt-4 text-[var(--muted)]">
        You may link to our tools. Do not scrape or republish the site in ways
        that misrepresent affiliation with {siteConfig.siteName}.
      </p>
    </div>
  );
}
