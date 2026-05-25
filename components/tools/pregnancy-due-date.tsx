"use client";
import { useMemo, useState } from "react";
import { calcDueDate } from "@/lib/formulas/health";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function PregnancyDueDateTool() {
  const ui = useToolUi("pregnancy-due-date");
  const [lmp, setLmp] = useState("2025-08-15");
  const result = useMemo(() => calcDueDate(lmp), [lmp]);
  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.lmp}</span>
        <input type="date" className="tool-input mt-2" value={lmp} onChange={(e) => setLmp(e.target.value)} />
      </label>
      {result && (
        <div className="result-card space-y-2">
          <p>{ui.dueDate} <strong className="text-brand">{result.dueDate}</strong></p>
          <p className="text-[var(--muted)]">{ui.weeksPregnant.replace("{n}", String(result.weeksPregnant))}</p>
          {result.daysRemaining > 0 && <p>{ui.daysUntil.replace("{n}", String(result.daysRemaining))}</p>}
        </div>
      )}
      <p className="text-xs text-[var(--muted)]">{ui.disclaimer}</p>
    </div>
  );
}
