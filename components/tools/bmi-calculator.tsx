"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calcBmi,
  getBmiColor,
  getHealthyWeightRange,
  type BmiUnit,
} from "@/lib/formulas/bmi";

export function BmiCalculatorTool() {
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
            {u}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="tool-panel block">
            <span className="text-sm font-medium">Height (cm)</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label className="tool-panel block">
            <span className="text-sm font-medium">Weight (kg)</span>
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
            <span className="text-sm font-medium">Height (ft)</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label className="tool-panel block">
            <span className="text-sm font-medium">Inches</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
            />
          </label>
          <label className="tool-panel block">
            <span className="text-sm font-medium">Weight (lb)</span>
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
            <p className="text-sm text-[var(--muted)]">Your BMI</p>
            <p className="result-value">{result.bmi.toFixed(1)}</p>
          </div>
          <div>
            <p
              className="inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
              style={{ backgroundColor: getBmiColor(result.category) }}
            >
              {result.category}
            </p>
          </div>
          {range && unit === "metric" && (
            <p className="text-sm text-[var(--muted)]">
              Healthy weight range: {range.minKg.toFixed(1)} – {range.maxKg.toFixed(1)} kg
            </p>
          )}
          <Link href="/tools/health/ideal-weight" className="text-sm text-brand hover:underline">
            Try Ideal Weight Calculator →
          </Link>
        </div>
      )}
    </div>
  );
}
