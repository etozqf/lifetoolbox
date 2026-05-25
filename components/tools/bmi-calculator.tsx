"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calcBmi,
  getBmiColor,
  getHealthyWeightRange,
  type BmiCategory,
  type BmiUnit,
} from "@/lib/formulas/bmi";
import { localizePath } from "@/lib/i18n";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

const BMI_CATEGORY_KEYS: Record<BmiCategory, "underweight" | "normal" | "overweight" | "obese"> = {
  Underweight: "underweight",
  Normal: "normal",
  Overweight: "overweight",
  Obese: "obese",
};

export function BmiCalculatorTool() {
  const ui = useToolUi("bmi-calculator");
  const { locale } = useLocale();
  const [unit, setUnit] = useState<BmiUnit>("metric");
  const [height, setHeight] = useState("170");
  const [heightInches, setHeightInches] = useState("0");
  const [weight, setWeight] = useState("70");

  const result = useMemo(() => {
    return calcBmi(
      unit,
      parseFloat(height) || 0,
      parseFloat(heightInches) || 0,
      parseFloat(weight) || 0
    );
  }, [unit, height, heightInches, weight]);

  const heightCm =
    unit === "metric"
      ? parseFloat(height) || 0
      : ((parseFloat(height) || 0) * 12 + (parseFloat(heightInches) || 0)) * 2.54;

  const range = getHealthyWeightRange(heightCm);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            type="button"
            className={`btn-preset flex-1 capitalize ${unit === u ? "btn-preset-active" : ""}`}
            onClick={() => setUnit(u)}
          >
            {u === "metric" ? ui.metric : ui.imperial}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="tool-panel block">
            <span className="text-sm font-medium">{ui.heightCm}</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label className="tool-panel block">
            <span className="text-sm font-medium">{ui.weightKg}</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="tool-panel block">
            <span className="text-sm font-medium">{ui.heightFt}</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label className="tool-panel block">
            <span className="text-sm font-medium">{ui.inches}</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
            />
          </label>
          <label className="tool-panel block">
            <span className="text-sm font-medium">{ui.weightLb}</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>
      )}

      {result && (
        <div className="result-card space-y-4">
          <div>
            <p className="text-sm text-[var(--muted)]">{ui.yourBmi}</p>
            <p className="result-value">{result.bmi.toFixed(1)}</p>
          </div>
          <div>
            <p
              className="inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
              style={{ backgroundColor: getBmiColor(result.category) }}
            >
              {ui[BMI_CATEGORY_KEYS[result.category]]}
            </p>
          </div>
          {range && unit === "metric" && (
            <p className="text-sm text-[var(--muted)]">
              {ui.healthyRange
                .replace("{min}", range.minKg.toFixed(1))
                .replace("{max}", range.maxKg.toFixed(1))}
            </p>
          )}
          <Link href={localizePath("/tools/health/ideal-weight", locale)} className="text-sm text-brand hover:underline">
            {ui.tryIdealWeight}
          </Link>
        </div>
      )}
    </div>
  );
}
