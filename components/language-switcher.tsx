"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { useLocale } from "./locale-provider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale, messages } = useLocale();

  return (
    <div
      className="flex items-center rounded-lg border border-[var(--border)] p-0.5 text-xs font-medium"
      aria-label={messages.language.label}
    >
      {(["en", "zh"] as Locale[]).map((code) => (
        <Link
          key={code}
          href={switchLocalePath(pathname, code)}
          className={`rounded-md px-2 py-1 transition ${
            locale === code ? "bg-brand text-white" : "text-[var(--muted)] hover:text-brand"
          }`}
          aria-current={locale === code ? "page" : undefined}
        >
          {messages.language[code]}
        </Link>
      ))}
    </div>
  );
}
