"use client";

import { useMemo, useState } from "react";
import { INGREDIENT_DENSITIES, convertCookingAmount } from "@/lib/formulas/kitchen";

export function CookingConverterTool() {
  const [ingredient, setIngredient] = useState("flour");
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState<"cup" | "tbsp" | "g" | "ml">("cup");

  const result = useMemo(
    () => convertCookingAmount(ingredient, parseFloat(amount) || 0, fromUnit),
    [ingredient, amount, fromUnit]
  );

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Ingredient</span>
        <select className="tool-input mt-2" value={ingredient} onChange={(e) => setIngredient(e.target.value)}>
          {INGREDIENT_DENSITIES.map((i) => (
            <option key={i.key} value={i.key}>{i.label}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">Amount</span>
          <input type="number" className="tool-input mt-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">From unit</span>
          <select className="tool-input mt-2" value={fromUnit} onChange={(e) => setFromUnit(e.target.value as typeof fromUnit)}>
            <option value="cup">Cups</option>
            <option value="tbsp">Tablespoons</option>
            <option value="g">Grams</option>
            <option value="ml">Milliliters</option>
          </select>
        </label>
      </div>
      {result && (
        <div className="result-card grid grid-cols-2 gap-3 text-sm">
          <p><strong>{result.grams}</strong> grams</p>
          <p><strong>{result.ml}</strong> ml</p>
          <p><strong>{result.cups}</strong> cups</p>
          <p><strong>{result.tbsp}</strong> tbsp</p>
        </div>
      )}
      <p className="text-xs text-[var(--muted)]">Approximate weights for common ingredients. Not suitable for precision baking without a scale.</p>
    </div>
  );
}
