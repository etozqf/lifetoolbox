import { ReactNode } from "react";
import { AdBanner } from "./ad-banner";
import { DisclaimerBanner } from "./disclaimer-banner";
import { RelatedTools } from "./related-tools";
import { JsonLd } from "./json-ld";
import { siteConfig, webApplicationJsonLd } from "@/lib/seo";
import type { DisclaimerType } from "@/lib/tool-registry";

export function ToolPageShell({
  title,
  description,
  path,
  related,
  disclaimer,
  children,
}: {
  title: string;
  description: string;
  path: string;
  related: string[];
  disclaimer?: DisclaimerType;
  children: ReactNode;
}) {
  const url = `${siteConfig.siteUrl}${path}`;
  return (
    <div className="mx-auto max-w-content px-4 py-8">
      <JsonLd data={webApplicationJsonLd({ name: title, url, description })} />
      <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">{description}</p>
      <p className="mt-2 text-xs text-[var(--muted)]">
        All calculations run locally in your browser — nothing is uploaded.
      </p>
      {disclaimer && <DisclaimerBanner type={disclaimer} />}
      <AdBanner slot="tool-top" />
      <div className="mx-auto mt-8 max-w-tool">{children}</div>
      <AdBanner slot="tool-bottom" />
      <RelatedTools slugs={related} />
    </div>
  );
}
