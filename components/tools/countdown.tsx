"use client";

import { useMemo, useState } from "react";
import { calcCountdown } from "@/lib/formulas/date";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function CountdownTool() {
  const ui = useToolUi("countdown");
  const { locale } = useLocale();
  const [target, setTarget] = useState("2026-12-31");

  const result = useMemo(() => calcCountdown(target), [target]);
  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.targetDate}</span>
        <input
          type="date"
          className="tool-input mt-2"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </label>

      <p className="text-xs text-[var(--muted)]">
        {ui.sharePage}{" "}
        <code className="rounded bg-[var(--surface-muted)] px-1">
          ?d={target}
        </code>
      </p>

      <div className="result-card text-center">
        {!result.ok ? (
          <p className="text-red-500">{ui.invalidDate}</p>
        ) : result.passed ? (
          <p className="text-lg">
            {ui.passed.replace("{n}", numFmt(result.days))}
          </p>
        ) : (
          <>
            <p className="result-value">{numFmt(result.days)}</p>
            <p className="mt-2 text-[var(--muted)]">{ui.daysRemaining}</p>
          </>
        )}
      </div>
    </div>
  );
}
