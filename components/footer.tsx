"use client";

import Link from "next/link";
import { CURRENT_PHASE, getToolsByPhase } from "@/lib/tool-registry";
import { getToolDisplay, localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo";
import { useLocale } from "./locale-provider";

export function Footer() {
  const { locale, messages: t } = useLocale();
  const toolLinks = getToolsByPhase(CURRENT_PHASE);
  const sisterHref = locale === "zh" ? `${siteConfig.sisterSite.url}/zh` : siteConfig.sisterSite.url;

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-content px-4 py-12">
        <p className="mb-4 font-display font-semibold">{t.footer.tagline}</p>
        <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          {toolLinks.map((tool) => {
            const display = getToolDisplay(tool, locale);
            return (
              <Link key={tool.slug} href={display.path} className="hover:text-brand">
                {display.name}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href={localizePath("/blog", locale)}>{t.footer.blog}</Link>
          <Link href={localizePath("/about", locale)}>{t.footer.about}</Link>
          <Link href={localizePath("/privacy", locale)}>{t.footer.privacy}</Link>
          <Link href={localizePath("/terms", locale)}>{t.footer.terms}</Link>
          <Link href={localizePath("/affiliate-disclosure", locale)}>{t.footer.affiliate}</Link>
          <a
            href={sisterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-brand"
          >
            {t.footer.sisterSite}
          </a>
        </div>
        <p className="mt-8 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} LifeToolbox. {t.footer.copyright}
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">{t.footer.privacyShort}</p>
      </div>
    </footer>
  );
}
