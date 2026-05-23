import Link from "next/link";
import {
  activeClusters,
  clusterLabels,
  CURRENT_PHASE,
  getToolsByCluster,
  type ToolCluster,
} from "@/lib/tool-registry";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-[var(--border)] bg-brand-light px-4 py-16 dark:bg-brand/10">
        <div className="mx-auto max-w-content text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Everyday Tools That Just Work
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Free calculators for tips, BMI, percentages, unit conversions, and more —
            no signup, runs in your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools" className="btn-primary">
              Explore Tools
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16">
        {activeClusters.map((cluster) => (
          <ClusterSection key={cluster} cluster={cluster} />
        ))}
      </section>
    </div>
  );
}

function ClusterSection({ cluster }: { cluster: ToolCluster }) {
  const items = getToolsByCluster(cluster, CURRENT_PHASE);
  return (
    <div className="mb-12">
      <h2 className="mb-6 font-display text-2xl font-semibold">{clusterLabels[cluster]}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Link
            key={t.slug}
            href={t.path}
            className="group rounded-2xl border border-[var(--border)] p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
          >
            <h3 className="font-semibold text-brand group-hover:underline">{t.name}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{t.description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-brand">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
