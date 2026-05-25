"use client";

import type { DisclaimerType } from "@/lib/tool-registry";
import { useTranslations } from "./locale-provider";

export function DisclaimerBanner({ type }: { type: DisclaimerType }) {
  const t = useTranslations();
  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
      ⚠ {t.disclaimer[type]}
    </div>
  );
}
