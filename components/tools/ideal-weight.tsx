"use client";

import { useMemo, useState } from "react";
import { calcIdealWeight, type BmiUnit, type IdealWeightFormula } from "@/lib/formulas/bmi";

const FORMULAS: { id: IdealWeightFormula; label: string }[] = [
  { id: "devine", label: "Devine (1974)" },
  { id: "robinson", label: "Robinson (1983)" },
  { id: "miller", label: "Miller (1983)" },
];

export function IdealWeightTool() {
  const [unit, setUnit] = useState<BmiUnit>("metric");
  const [formula, setFormula] = useState<IdealWeightFormula>("devine");
  const [height, setHeight] = useState("5");
  const [heightInches, setHeightInches] = useState("7");
  const [heightCm, setHeightCm] = useState("170");

  const result = useMemo(() => {
    if (unit === "metric") {
      return calcIdealWeight(formula, "metric", parseFloat(heightCm) || 0, 0);
    }
    return calcIdealWeight(
      formula,
      "imperial",
      parseFloat(height) || 0,
      parseFloat(heightInches) || 0
    );
  }, [unit, formula, height, heightInches, heightCm]);

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

      <label className="tool-panel block">
        <span className="text-sm font-medium">Formula</span>
        <select
          className="tool-input mt-2"
          value={formula}
          onChange={(e) => setFormula(e.target.value as IdealWeightFormula)}
        >
          {FORMULAS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      {unit === "metric" ? (
        <label className="tool-panel block">
          <span className="text-sm font-medium">Height (cm)</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
          />
        </label>
      ) : (
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      )}

      {result !== null && result > 0 && (
        <div className="result-card">
          <p className="text-sm text-[var(--muted)]">Ideal weight</p>
          <p className="result-value mt-1">
            {result.toFixed(1)} {unit === "metric" ? "kg" : "lb"}
          </p>
        </div>
      )}
    </div>
  );
}
