"use client";

import { useMemo, useState } from "react";
import { parseAndScaleIngredient, scaleRecipeFactor } from "@/lib/formulas/kitchen";

export function RecipeScalerTool() {
  const [original, setOriginal] = useState("4");
  const [target, setTarget] = useState("8");
  const [ingredients, setIngredients] = useState("2 cups flour\n1 cup sugar\n3 eggs\n1/2 cup butter");

  const factor = useMemo(() => scaleRecipeFactor(parseFloat(original) || 0, parseFloat(target) || 0), [original, target]);

  const scaled = useMemo(() => {
    if (factor === null) return [];
    return ingredients.split("\n").map((line) => parseAndScaleIngredient(line, factor));
  }, [ingredients, factor]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">Original servings</span>
          <input type="number" min="1" className="tool-input mt-2" value={original} onChange={(e) => setOriginal(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">Target servings</span>
          <input type="number" min="1" className="tool-input mt-2" value={target} onChange={(e) => setTarget(e.target.value)} />
        </label>
      </div>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Ingredients (one per line, start with amount)</span>
        <textarea className="tool-input mt-2 min-h-[160px] font-sans" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </label>
      {factor !== null && (
        <div className="result-card space-y-2">
          <p className="text-sm text-[var(--muted)]">Scale factor: ×{factor.toFixed(2)}</p>
          <ul className="space-y-1 font-mono text-sm">
            {scaled.filter((s) => s.line).map((s, i) => (
              <li key={i}>
                {s.scaledAmount !== null ? (
                  <><strong>{s.scaledAmount}</strong> {s.unit} {s.name}</>
                ) : (
                  s.line
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
