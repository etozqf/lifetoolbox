"use client";
import { useMemo, useState } from "react";
import { calcDueDate } from "@/lib/formulas/health";

export function PregnancyDueDateTool() {
  const [lmp, setLmp] = useState("2025-08-15");
  const result = useMemo(() => calcDueDate(lmp), [lmp]);
  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">First day of last menstrual period (LMP)</span>
        <input type="date" className="tool-input mt-2" value={lmp} onChange={(e) => setLmp(e.target.value)} />
      </label>
      {result && (
        <div className="result-card space-y-2">
          <p>Estimated due date: <strong className="text-brand">{result.dueDate}</strong></p>
          <p className="text-[var(--muted)]">About {result.weeksPregnant} weeks pregnant</p>
          {result.daysRemaining > 0 && <p>{result.daysRemaining} days until due date</p>}
        </div>
      )}
      <p className="text-xs text-[var(--muted)]">Naegele&apos;s rule (LMP + 280 days). Not medical advice — consult your healthcare provider.</p>
    </div>
  );
}
