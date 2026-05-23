"use client";
import { useMemo, useState } from "react";
import { calcSalesTax, US_STATE_TAX_PRESETS } from "@/lib/formulas/tax";

export function SalesTaxCalculatorTool() {
  const [price, setPrice] = useState("99.99");
  const [rate, setRate] = useState("8");
  const [inclusive, setInclusive] = useState(false);
  const result = useMemo(() => calcSalesTax(parseFloat(price) || 0, parseFloat(rate) || 0, inclusive), [price, rate, inclusive]);
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Price ($)</span>
        <input type="number" step="0.01" className="tool-input mt-2" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Tax rate (%)</span>
        <input type="number" className="tool-input mt-2" value={rate} onChange={(e) => setRate(e.target.value)} />
        <div className="mt-2 flex flex-wrap gap-2">
          {US_STATE_TAX_PRESETS.map((p) => (
            <button key={p.label} type="button" className="btn-preset text-xs" onClick={() => setRate(String(p.rate))}>{p.label}</button>
          ))}
        </div>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} />
        Price already includes tax
      </label>
      {result && (
        <div className="result-card space-y-2">
          <div className="flex justify-between"><span>Subtotal</span><span>{fmt(result.subtotal)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>{fmt(result.taxAmount)}</span></div>
          <div className="flex justify-between border-t border-brand/20 pt-2 font-medium"><span>Total</span><span className="result-value text-xl">{fmt(result.total)}</span></div>
        </div>
      )}
    </div>
  );
}
