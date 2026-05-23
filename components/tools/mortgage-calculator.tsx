"use client";

import { useMemo, useState } from "react";
import { calcMortgage, formatMoney } from "@/lib/formulas/finance";

export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("70000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");

  const result = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const principal = price - down;
    return calcMortgage(principal, parseFloat(rate) || 0, parseInt(years, 10) || 0);
  }, [homePrice, downPayment, rate, years]);

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Home price ($)</span>
        <input type="number" className="tool-input mt-2" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Down payment ($)</span>
        <input type="number" className="tool-input mt-2" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Interest rate (% per year)</span>
        <input type="number" step="0.01" className="tool-input mt-2" value={rate} onChange={(e) => setRate(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Loan term (years)</span>
        <select className="tool-input mt-2" value={years} onChange={(e) => setYears(e.target.value)}>
          {[10, 15, 20, 25, 30].map((y) => (
            <option key={y} value={y}>{y} years</option>
          ))}
        </select>
      </label>
      {result && (
        <div className="result-card space-y-2">
          <div className="flex justify-between"><span>Loan amount</span><span>{formatMoney(result.principal)}</span></div>
          <div className="flex justify-between border-t border-brand/20 pt-2 font-medium">
            <span>Monthly payment</span>
            <span className="result-value text-xl">{formatMoney(result.monthlyPayment)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]"><span>Total interest</span><span>{formatMoney(result.totalInterest)}</span></div>
          <div className="flex justify-between text-sm text-[var(--muted)]"><span>Total paid</span><span>{formatMoney(result.totalPayment)}</span></div>
        </div>
      )}
    </div>
  );
}
