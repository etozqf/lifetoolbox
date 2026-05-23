"use client";

import { useMemo, useState } from "react";
import { calcCompoundInterest, formatMoney } from "@/lib/formulas/finance";

export function CompoundInterestTool() {
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

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Initial investment ($)</span>
        <input type="number" className="tool-input mt-2" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Annual interest rate (%)</span>
        <input type="number" step="0.1" className="tool-input mt-2" value={rate} onChange={(e) => setRate(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Years to grow</span>
        <input type="number" className="tool-input mt-2" value={years} onChange={(e) => setYears(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Monthly contribution ($)</span>
        <input type="number" className="tool-input mt-2" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
      </label>
      {result && (
        <div className="result-card space-y-2">
          <div className="flex justify-between font-medium">
            <span>Future value</span>
            <span className="result-value text-xl">{formatMoney(result.futureValue)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>Total contributed</span>
            <span>{formatMoney(result.totalContributions)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>Interest earned</span>
            <span>{formatMoney(result.totalInterest)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
