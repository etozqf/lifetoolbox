"use client";

import Link from "next/link";
import { useState } from "react";
import {
  activeClusters,
  clusterLabels,
  CURRENT_PHASE,
  getToolsByPhase,
  type ToolCluster,
} from "@/lib/tool-registry";

export default function ToolsIndexPage() {
  const [tab, setTab] = useState<ToolCluster | "all">("all");
  const all = getToolsByPhase(CURRENT_PHASE);
  const filtered =
    tab === "all" ? all : all.filter((t) => t.cluster === tab);

  return (
    <div className="mx-auto max-w-content px-4 py-12">
      <h1 className="text-3xl font-bold">All Tools</h1>
      <p className="mt-2 text-[var(--muted)]">
        Every tool has its own page for fast loading and SEO.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <TabButton active={tab === "all"} onClick={() => setTab("all")}>
          All
        </TabButton>
        {activeClusters.map((c) => (
          <TabButton key={c} active={tab === c} onClick={() => setTab(c)}>
            {clusterLabels[c]}
          </TabButton>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={t.path}
            className="rounded-xl border border-[var(--border)] p-5 hover:border-brand"
          >
            <h2 className="font-medium">{t.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{t.description}</p>
          </Link>
        ))}
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
