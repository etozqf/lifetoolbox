import Link from "next/link";
import {
  activeClusters,
  CURRENT_PHASE,
  getToolsByCluster,
  type ToolCluster,
} from "@/lib/tool-registry";
import { getClusterLabel, getToolDisplay } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <div>
      <section className="border-b border-[var(--border)] bg-brand-light px-4 py-16 dark:bg-brand/10">
        <div className="mx-auto max-w-content text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{t.home.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">{t.home.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={locale === "zh" ? "/zh/tools" : "/tools"} className="btn-primary">
              {t.home.exploreTools}
            </Link>
            <Link href={locale === "zh" ? "/zh/blog" : "/blog"} className="btn-secondary">
              {t.home.readBlog}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16">
        {activeClusters.map((cluster) => (
          <ClusterSection key={cluster} cluster={cluster} locale={locale} />
        ))}
      </section>
    </div>
  );
}

function ClusterSection({ cluster, locale }: { cluster: ToolCluster; locale: Locale }) {
  const t = getMessages(locale);
  const items = getToolsByCluster(cluster, CURRENT_PHASE);

  return (
    <div className="mb-12">
      <h2 className="mb-6 font-display text-2xl font-semibold">{getClusterLabel(cluster, locale)}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tool) => {
          const display = getToolDisplay(tool, locale);
          return (
            <Link
              key={tool.slug}
              href={display.path}
              className="group rounded-2xl border border-[var(--border)] p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <h3 className="font-semibold text-brand group-hover:underline">{display.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{display.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand">{t.home.open}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
