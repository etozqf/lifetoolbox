import Link from "next/link";
import { CURRENT_PHASE, getToolsByPhase } from "@/lib/tool-registry";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const toolLinks = getToolsByPhase(CURRENT_PHASE);

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-content px-4 py-12">
        <p className="mb-4 font-display font-semibold">LifeToolbox — Free everyday tools.</p>
        <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          {toolLinks.map((t) => (
            <Link key={t.slug} href={t.path} className="hover:text-brand">
              {t.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <a
            href={siteConfig.sisterSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-brand"
          >
            Developer tools → {siteConfig.sisterSite.name}
          </a>
        </div>
        <p className="mt-8 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} LifeToolbox. Everyday tools that just work.
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          All calculations run locally in your browser. We do not upload your data.
        </p>
      </div>
    </footer>
  );
}
