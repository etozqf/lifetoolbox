"use client";

import { useMemo } from "react";
import type { Locale } from "./config";
import { useLocale } from "@/components/locale-provider";
import { lifeToolUiEn, lifeToolUiZh, type LifeToolSlug } from "./tool-ui/life";
import { sharedToolUiEn, sharedToolUiZh, type SharedToolUi } from "./tool-ui/shared";

export type ToolUi<T extends LifeToolSlug> = SharedToolUi & (typeof lifeToolUiEn)[T];

export function getToolUiStrings<T extends LifeToolSlug>(slug: T, locale: Locale): ToolUi<T> {
  const shared = locale === "zh" ? sharedToolUiZh : sharedToolUiEn;
  const tool = locale === "zh" ? lifeToolUiZh[slug] : lifeToolUiEn[slug];
  return { ...shared, ...tool } as ToolUi<T>;
}

export function useToolUi<T extends LifeToolSlug>(slug: T): ToolUi<T> {
  const { locale } = useLocale();
  return useMemo(() => getToolUiStrings(slug, locale), [slug, locale]);
}
