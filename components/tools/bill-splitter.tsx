"use client";

import { useMemo, useState } from "react";
import { calcBillSplit } from "@/lib/formulas/tip";

export function BillSplitterTool() {
  const [total, setTotal] = useState("120");
  const [people, setPeople] = useState("4");
  const [tipPercent, setTipPercent] = useState(18);

  const result = useMemo(() => {
    return calcBillSplit({
      totalAmount: parseFloat(total) || 0,
      splitCount: parseInt(people, 10) || 1,
      tipPercent,
    });
  }, [total, people, tipPercent]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Total bill ($)</span>
        <input
          type="number"
          min="0"
          step="0.01"
          className="tool-input mt-2"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </label>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Number of people</span>
        <input
          type="number"
          min="1"
          className="tool-input mt-2"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
      </label>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Tip % (optional)</span>
        <input
          type="number"
          min="0"
          className="tool-input mt-2"
          value={tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value))}
        />
      </label>

      {result && (
        <div className="result-card space-y-3">
          <div className="flex justify-between">
            <span>Grand total (with tip)</span>
            <span className="result-value text-xl">{fmt(result.total)}</span>
          </div>
          <div className="flex justify-between border-t border-brand/20 pt-3">
            <span className="font-medium">Each person pays</span>
            <span className="result-value">{fmt(result.perPerson)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
