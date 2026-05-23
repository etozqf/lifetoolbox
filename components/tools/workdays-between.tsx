"use client";
import { useMemo, useState } from "react";
import { calcWorkdaysBetween } from "@/lib/formulas/date";

export function WorkdaysBetweenTool() {
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const result = useMemo(() => calcWorkdaysBetween(start, end), [start, end]);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="tool-panel block">
          <span className="text-sm font-medium">Start date</span>
          <input type="date" className="tool-input mt-2" value={start} onChange={(e) => setStart(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">End date</span>
          <input type="date" className="tool-input mt-2" value={end} onChange={(e) => setEnd(e.target.value)} />
        </label>
      </div>
      <div className="result-card">
        {!result.ok ? <p className="text-red-500">{result.error}</p> : (
          <ul className="space-y-2 text-lg">
            <li><strong>{result.workdays}</strong> workdays (Mon–Fri)</li>
            <li><strong>{result.weekends}</strong> weekend days</li>
            <li><strong>{result.totalDays}</strong> total calendar days</li>
          </ul>
        )}
      </div>
    </div>
  );
}
