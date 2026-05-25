"use client";

import Link from "next/link";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useState } from "react";
import {
  activeClusters,
  CURRENT_PHASE,
  getToolsByCluster,
} from "@/lib/tool-registry";
import { getClusterLabel, getToolDisplay, localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo";
import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";
import { useTheme } from "./theme-provider";

export function Header() {
  const { theme, toggle } = useTheme();
  const { locale, messages: t } = useLocale();
  const [open, setOpen] = useState(false);
  const homeHref = localizePath("/", locale);
  const toolsHref = localizePath("/tools", locale);
  const blogHref = localizePath("/blog", locale);
  const aboutHref = localizePath("/about", locale);
  const sisterHref = locale === "zh" ? `${siteConfig.sisterSite.url}/zh` : siteConfig.sisterSite.url;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4">
        <Link href={homeHref} className="flex items-center gap-2 font-display font-semibold text-brand">
          <Sparkles className="h-5 w-5" />
          LifeToolbox
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div className="group relative">
            <button type="button" className="text-sm font-medium hover:text-brand">
              {t.nav.tools}
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="max-h-[70vh] w-72 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
                {activeClusters.map((cluster) => (
                  <div key={cluster} className="mb-2 last:mb-0">
                    <p className="mb-1 text-xs font-semibold uppercase text-[var(--muted)]">
                      {getClusterLabel(cluster, locale)}
                    </p>
                    {getToolsByCluster(cluster, CURRENT_PHASE).map((tool) => {
                      const display = getToolDisplay(tool, locale);
                      return (
                        <Link
                          key={tool.slug}
                          href={display.path}
                          className="block rounded px-2 py-1 text-sm hover:bg-[var(--surface-muted)]"
                        >
                          {display.name}
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <Link href={toolsHref} className="mt-2 block text-sm text-brand">
                  {t.nav.allToolsArrow}
                </Link>
              </div>
            </div>
          </div>
          <Link href={blogHref} className="text-sm font-medium hover:text-brand">
            {t.nav.blog}
          </Link>
          <Link href={aboutHref} className="text-sm font-medium hover:text-brand">
            {t.nav.about}
          </Link>
          <a
            href={sisterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--muted)] hover:text-brand"
          >
            {t.nav.sisterSite}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-[var(--border)] p-2"
            aria-label={t.nav.toggleTheme}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={t.nav.menu}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] px-4 py-4 md:hidden">
          <Link href={toolsHref} className="block py-2" onClick={() => setOpen(false)}>
            {t.nav.allTools}
          </Link>
          <Link href={blogHref} className="block py-2" onClick={() => setOpen(false)}>
            {t.nav.blog}
          </Link>
          <Link href={aboutHref} className="block py-2" onClick={() => setOpen(false)}>
            {t.nav.about}
          </Link>
          <a
            href={sisterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2"
          >
            {t.nav.sisterSite}
          </a>
        </nav>
      )}
    </header>
  );
}
