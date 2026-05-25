"use client";

import { useMemo, useState } from "react";
import { parseAndScaleIngredient, scaleRecipeFactor } from "@/lib/formulas/kitchen";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function RecipeScalerTool() {
  const ui = useToolUi("recipe-scaler");
  const { locale } = useLocale();
  const [original, setOriginal] = useState("4");
  const [target, setTarget] = useState("8");
  const [ingredients, setIngredients] = useState("2 cups flour\n1 cup sugar\n3 eggs\n1/2 cup butter");

  const factor = useMemo(() => scaleRecipeFactor(parseFloat(original) || 0, parseFloat(target) || 0), [original, target]);

  const scaled = useMemo(() => {
    if (factor === null) return [];
    return ingredients.split("\n").map((line) => parseAndScaleIngredient(line, factor));
  }, [ingredients, factor]);

  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { maximumFractionDigits: 4 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.originalServings}</span>
          <input type="number" min="1" className="tool-input mt-2" value={original} onChange={(e) => setOriginal(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.targetServings}</span>
          <input type="number" min="1" className="tool-input mt-2" value={target} onChange={(e) => setTarget(e.target.value)} />
        </label>
      </div>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.ingredients}</span>
        <textarea className="tool-input mt-2 min-h-[160px] font-sans" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </label>
      {factor !== null && (
        <div className="result-card space-y-2">
          <p className="text-sm text-[var(--muted)]">{ui.scaleFactor.replace("{factor}", numFmt(factor))}</p>
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
