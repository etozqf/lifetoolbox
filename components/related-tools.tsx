"use client";

import Link from "next/link";
import { getLocalizedRelatedTools } from "@/lib/i18n";
import { useLocale } from "./locale-provider";

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const { locale, messages: t } = useLocale();
  const related = getLocalizedRelatedTools(slugs, locale);
  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-semibold">{t.toolPage.relatedTools}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.path}
            className="rounded-xl border border-[var(--border)] p-4 transition hover:border-brand hover:shadow-sm"
          >
            <h3 className="font-medium text-brand">{tool.name}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
