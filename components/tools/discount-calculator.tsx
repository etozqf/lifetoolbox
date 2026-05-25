"use client";

import { useMemo, useState } from "react";
import { calcDiscount } from "@/lib/formulas/percentage";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function DiscountCalculatorTool() {
  const ui = useToolUi("discount-calculator");
  const { locale } = useLocale();
  const [original, setOriginal] = useState("79.99");
  const [discount, setDiscount] = useState("25");

  const result = useMemo(() => {
    return calcDiscount(parseFloat(original) || 0, parseFloat(discount) || 0);
  }, [original, discount]);

  const fmt = (n: number) =>
    n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.originalPrice}</span>
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
        <span className="text-sm font-medium">{ui.discount}</span>
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
            <span>{ui.salePrice}</span>
            <span className="result-value text-xl">{fmt(result.salePrice)}</span>
          </div>
          <div className="flex justify-between text-[var(--muted)]">
            <span>{ui.youSave}</span>
            <span>{fmt(result.savings)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
