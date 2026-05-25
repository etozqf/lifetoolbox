"use client";

import { useMemo, useState } from "react";
import { calcCompoundInterest } from "@/lib/formulas/finance";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function CompoundInterestTool() {
  const ui = useToolUi("compound-interest");
  const { locale } = useLocale();
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [monthly, setMonthly] = useState("200");

  const result = useMemo(
    () =>
      calcCompoundInterest(
        parseFloat(principal) || 0,
        parseFloat(rate) || 0,
        parseInt(years, 10) || 0,
        parseFloat(monthly) || 0
      ),
    [principal, rate, years, monthly]
  );

  const fmt = (n: number) =>
    n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.initial}</span>
        <input type="number" className="tool-input mt-2" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.annualRate}</span>
        <input type="number" step="0.1" className="tool-input mt-2" value={rate} onChange={(e) => setRate(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.yearsGrow}</span>
        <input type="number" className="tool-input mt-2" value={years} onChange={(e) => setYears(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.monthlyContribution}</span>
        <input type="number" className="tool-input mt-2" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
      </label>
      {result && (
        <div className="result-card space-y-2">
          <div className="flex justify-between font-medium">
            <span>{ui.futureValue}</span>
            <span className="result-value text-xl">{fmt(result.futureValue)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>{ui.totalContributed}</span>
            <span>{fmt(result.totalContributions)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>{ui.interestEarned}</span>
            <span>{fmt(result.totalInterest)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
