"use client";

import { useMemo, useState } from "react";
import { calcWaterFromLbs, calcWaterIntake } from "@/lib/formulas/health";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function WaterIntakeTool() {
  const ui = useToolUi("water-intake");
  const { locale } = useLocale();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("70");
  const result = useMemo(() => {
    const w = parseFloat(weight) || 0;
    return unit === "metric" ? calcWaterIntake(w, "metric") : calcWaterFromLbs(w);
  }, [unit, weight]);

  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} type="button" className={`btn-preset flex-1 ${unit === u ? "btn-preset-active" : ""}`} onClick={() => setUnit(u)}>
            {u === "metric" ? ui.kilograms : ui.pounds}
          </button>
        ))}
      </div>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.weight}</span>
        <input type="number" className="tool-input mt-2" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      {result && (
        <div className="result-card space-y-2">
          <p className="result-value text-2xl">{ui.perDay.replace("{n}", result.liters.toFixed(1))}</p>
          <p className="text-sm text-[var(--muted)]">
            {ui.details
              .replace("{ml}", numFmt(Math.round(result.ml)))
              .replace("{cups}", result.cups.toFixed(1))
              .replace("{oz}", numFmt(Math.round(result.oz)))}
          </p>
        </div>
      )}
    </div>
  );
}
