"use client";

import Link from "next/link";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useState } from "react";
import {
  activeClusters,
  clusterLabels,
  CURRENT_PHASE,
  getToolsByCluster,
} from "@/lib/tool-registry";
import { siteConfig } from "@/lib/seo";
import { useTheme } from "./theme-provider";

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold text-brand">
          <Sparkles className="h-5 w-5" />
          LifeToolbox
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div className="group relative">
            <button type="button" className="text-sm font-medium hover:text-brand">
              Tools
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="max-h-[70vh] w-72 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
                {activeClusters.map((cluster) => (
                  <div key={cluster} className="mb-2 last:mb-0">
                    <p className="mb-1 text-xs font-semibold uppercase text-[var(--muted)]">
                      {clusterLabels[cluster]}
                    </p>
                    {getToolsByCluster(cluster, CURRENT_PHASE).map((t) => (
                      <Link
                        key={t.slug}
                        href={t.path}
                        className="block rounded px-2 py-1 text-sm hover:bg-[var(--surface-muted)]"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href="/tools" className="mt-2 block text-sm text-brand">
                  All tools →
                </Link>
              </div>
            </div>
          </div>
          <Link href="/blog" className="text-sm font-medium hover:text-brand">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand">
            About
          </Link>
          <a
            href={siteConfig.sisterSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--muted)] hover:text-brand"
          >
            {siteConfig.sisterSite.name} ↗
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-[var(--border)] p-2"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] px-4 py-4 md:hidden">
          <Link href="/tools" className="block py-2" onClick={() => setOpen(false)}>
            All Tools
          </Link>
          <Link href="/blog" className="block py-2" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/about" className="block py-2" onClick={() => setOpen(false)}>
            About
          </Link>
          <a
            href={siteConfig.sisterSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2"
          >
            {siteConfig.sisterSite.name} ↗
          </a>
        </nav>
      )}
    </header>
  );
}
