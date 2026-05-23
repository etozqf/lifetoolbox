import { siteConfig } from "@/lib/seo";

export const metadata = { title: "Affiliate Disclosure" };

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Affiliate Disclosure</h1>
      <p className="mt-4 text-[var(--muted)]">
        {siteConfig.siteName} is reader-supported. Some pages may contain affiliate
        links to products or services we believe may be helpful. If you click a link
        and make a purchase, we may earn a commission at no extra cost to you.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Our commitment</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>We only recommend products relevant to the tools and topics on this site.</li>
        <li>Affiliate relationships do not influence our tool recommendations or calculations.</li>
        <li>All calculators and converters run locally in your browser regardless of affiliate links.</li>
        <li>Sponsored or affiliate content will be clearly marked where applicable.</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold">Amazon Associates</h2>
      <p className="mt-2 text-[var(--muted)]">
        {siteConfig.siteName} is a participant in the Amazon Services LLC Associates
        Program, an affiliate advertising program designed to provide a means for sites
        to earn advertising fees by linking to Amazon.com.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Questions</h2>
      <p className="mt-2 text-[var(--muted)]">
        Contact us at{" "}
        <a href="mailto:hello@lifetoolbox.com" className="text-brand hover:underline">
          hello@lifetoolbox.com
        </a>{" "}
        with any questions about this disclosure.
      </p>
    </div>
  );
}
