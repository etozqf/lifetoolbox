"use client";

import { useMemo, useState } from "react";
import {
  activityLabels,
  calcDailyCalories,
  type ActivityLevel,
} from "@/lib/formulas/health";

export function CalorieCalculatorTool() {
  const [sex, setSex] = useState<"male" | "female">("female");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  const result = useMemo(
    () =>
      calcDailyCalories({
        sex,
        age: parseFloat(age) || 0,
        weightKg: parseFloat(weight) || 0,
        heightCm: parseFloat(height) || 0,
        activity,
      }),
    [sex, age, weight, height, activity]
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["female", "male"] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`btn-preset flex-1 capitalize ${sex === s ? "btn-preset-active" : ""}`}
            onClick={() => setSex(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Age (years)</span>
        <input type="number" className="tool-input mt-2" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">Weight (kg)</span>
          <input type="number" className="tool-input mt-2" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">Height (cm)</span>
          <input type="number" className="tool-input mt-2" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Activity level</span>
        <select
          className="tool-input mt-2"
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityLevel)}
        >
          {(Object.keys(activityLabels) as ActivityLevel[]).map((key) => (
            <option key={key} value={key}>
              {activityLabels[key]}
            </option>
          ))}
        </select>
      </label>

      {result !== null && result > 0 && (
        <div className="result-card">
          <p className="text-sm text-[var(--muted)]">Estimated daily calories</p>
          <p className="result-value mt-1">{result.toLocaleString()} kcal/day</p>
          <p className="mt-2 text-xs text-[var(--muted)]">Based on Mifflin-St Jeor equation. Not medical advice.</p>
        </div>
      )}
    </div>
  );
}
