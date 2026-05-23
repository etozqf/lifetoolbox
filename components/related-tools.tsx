import Link from "next/link";
import { getRelatedTools } from "@/lib/tool-registry";

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const related = getRelatedTools(slugs);
  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-semibold">Related Tools</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((t) => (
          <Link
            key={t.slug}
            href={t.path}
            className="rounded-xl border border-[var(--border)] p-4 transition hover:border-brand hover:shadow-sm"
          >
            <h3 className="font-medium text-brand">{t.name}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{t.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
