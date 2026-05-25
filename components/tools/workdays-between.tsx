"use client";
import { useMemo, useState } from "react";
import { calcWorkdaysBetween } from "@/lib/formulas/date";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function WorkdaysBetweenTool() {
  const ui = useToolUi("workdays-between");
  const { locale } = useLocale();
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const result = useMemo(() => calcWorkdaysBetween(start, end), [start, end]);
  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.startDate}</span>
          <input type="date" className="tool-input mt-2" value={start} onChange={(e) => setStart(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.endDate}</span>
          <input type="date" className="tool-input mt-2" value={end} onChange={(e) => setEnd(e.target.value)} />
        </label>
      </div>
      <div className="result-card">
        {!result.ok ? <p className="text-red-500">{ui.invalidDate}</p> : (
          <ul className="space-y-2 text-lg">
            <li><strong>{numFmt(result.workdays)}</strong> {ui.workdays}</li>
            <li><strong>{numFmt(result.weekends)}</strong> {ui.weekends}</li>
            <li><strong>{numFmt(result.totalDays)}</strong> {ui.totalDays}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
