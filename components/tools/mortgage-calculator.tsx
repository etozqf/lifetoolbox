"use client";

import { useMemo, useState } from "react";
import { calcMortgage } from "@/lib/formulas/finance";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function MortgageCalculatorTool() {
  const ui = useToolUi("mortgage-calculator");
  const { locale } = useLocale();
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

  const fmt = (n: number) =>
    n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.homePrice}</span>
        <input type="number" className="tool-input mt-2" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.downPayment}</span>
        <input type="number" className="tool-input mt-2" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.interestRate}</span>
        <input type="number" step="0.01" className="tool-input mt-2" value={rate} onChange={(e) => setRate(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.loanTerm}</span>
        <select className="tool-input mt-2" value={years} onChange={(e) => setYears(e.target.value)}>
          {[10, 15, 20, 25, 30].map((y) => (
            <option key={y} value={y}>{ui.years.replace("{n}", String(y))}</option>
          ))}
        </select>
      </label>
      {result && (
        <div className="result-card space-y-2">
          <div className="flex justify-between"><span>{ui.loanAmount}</span><span>{fmt(result.principal)}</span></div>
          <div className="flex justify-between border-t border-brand/20 pt-2 font-medium">
            <span>{ui.monthlyPayment}</span>
            <span className="result-value text-xl">{fmt(result.monthlyPayment)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]"><span>{ui.totalInterest}</span><span>{fmt(result.totalInterest)}</span></div>
          <div className="flex justify-between text-sm text-[var(--muted)]"><span>{ui.totalPaid}</span><span>{fmt(result.totalPayment)}</span></div>
        </div>
      )}
    </div>
  );
}
