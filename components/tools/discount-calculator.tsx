"use client";

import { useMemo, useState } from "react";
import { calcDiscount } from "@/lib/formulas/percentage";

export function DiscountCalculatorTool() {
  const [original, setOriginal] = useState("79.99");
  const [discount, setDiscount] = useState("25");

  const result = useMemo(() => {
    return calcDiscount(parseFloat(original) || 0, parseFloat(discount) || 0);
  }, [original, discount]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Original price ($)</span>
        <input
          type="number"
          min="0"
          step="0.01"
          className="tool-input mt-2"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />
      </label>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Discount (%)</span>
        <input
          type="number"
          min="0"
          max="100"
          className="tool-input mt-2"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </label>

      {result && (
        <div className="result-card space-y-3">
          <div className="flex justify-between">
            <span>Sale price</span>
            <span className="result-value text-xl">{fmt(result.salePrice)}</span>
          </div>
          <div className="flex justify-between text-[var(--muted)]">
            <span>You save</span>
            <span>{fmt(result.savings)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
