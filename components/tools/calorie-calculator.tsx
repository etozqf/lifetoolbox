"use client";

import { useMemo, useState } from "react";
import {
  calcDailyCalories,
  type ActivityLevel,
} from "@/lib/formulas/health";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

const ACTIVITY_LEVELS: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "veryActive"];

export function CalorieCalculatorTool() {
  const ui = useToolUi("calorie-calculator");
  const { locale } = useLocale();
  const [sex, setSex] = useState<"male" | "female">("female");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  const activityLabels = useMemo(
    () => ({
      sedentary: ui.sedentary,
      light: ui.light,
      moderate: ui.moderate,
      active: ui.active,
      veryActive: ui.veryActive,
    }),
    [ui]
  );

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

  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

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
            {s === "female" ? ui.female : ui.male}
          </button>
        ))}
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.age}</span>
        <input type="number" className="tool-input mt-2" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.weightKg}</span>
          <input type="number" className="tool-input mt-2" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.heightCm}</span>
          <input type="number" className="tool-input mt-2" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.activity}</span>
        <select
          className="tool-input mt-2"
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityLevel)}
        >
          {ACTIVITY_LEVELS.map((key) => (
            <option key={key} value={key}>
              {activityLabels[key]}
            </option>
          ))}
        </select>
      </label>

      {result !== null && result > 0 && (
        <div className="result-card">
          <p className="text-sm text-[var(--muted)]">{ui.dailyCalories}</p>
          <p className="result-value mt-1">{numFmt(result)} {ui.kcalDay}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">{ui.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
