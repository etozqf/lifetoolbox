"use client";

import Link from "next/link";
import { useState } from "react";
import {
  activeClusters,
  CURRENT_PHASE,
  getToolsByPhase,
  type ToolCluster,
} from "@/lib/tool-registry";
import { getClusterLabel, getToolDisplay } from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

export function ToolsIndexPage() {
  const { locale, messages: t } = useLocale();
  const [tab, setTab] = useState<ToolCluster | "all">("all");
  const all = getToolsByPhase(CURRENT_PHASE);
  const filtered = tab === "all" ? all : all.filter((tool) => tool.cluster === tab);

  return (
    <div className="mx-auto max-w-content px-4 py-12">
      <h1 className="text-3xl font-bold">{t.toolsIndex.title}</h1>
      <p className="mt-2 text-[var(--muted)]">{t.toolsIndex.subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <TabButton active={tab === "all"} onClick={() => setTab("all")}>
          {t.toolsIndex.all}
        </TabButton>
        {activeClusters.map((cluster) => (
          <TabButton key={cluster} active={tab === cluster} onClick={() => setTab(cluster)}>
            {getClusterLabel(cluster, locale)}
          </TabButton>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          const display = getToolDisplay(tool, locale);
          return (
            <Link
              key={tool.slug}
              href={display.path}
              className="rounded-xl border border-[var(--border)] p-5 hover:border-brand"
            >
              <h2 className="font-medium">{display.name}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{display.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium ${
        active ? "bg-brand text-white" : "border border-[var(--border)]"
      }`}
    >
      {children}
    </button>
  );
}
