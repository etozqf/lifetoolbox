"use client";

import { useMemo, useState } from "react";
import { calcBodyFatPercent, type BodyFatSex } from "@/lib/formulas/body-fat";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function BodyFatCalculatorTool() {
  const ui = useToolUi("body-fat-calculator");
  const [sex, setSex] = useState<BodyFatSex>("male");
  const [height, setHeight] = useState("175");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");

  const percent = useMemo(() => {
    return calcBodyFatPercent({
      sex,
      heightCm: parseFloat(height) || 0,
      neckCm: parseFloat(neck) || 0,
      waistCm: parseFloat(waist) || 0,
      hipCm: sex === "female" ? parseFloat(hip) || 0 : undefined,
    });
  }, [sex, height, neck, waist, hip]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["male", "female"] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`btn-preset flex-1 capitalize ${sex === s ? "btn-preset-active" : ""}`}
            onClick={() => setSex(s)}
          >
            {s === "male" ? ui.male : ui.female}
          </button>
        ))}
      </div>
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
          <span className="text-sm font-medium">{ui.neckCm}</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.waistCm}</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </label>
        {sex === "female" && (
          <label className="tool-panel block">
            <span className="text-sm font-medium">{ui.hipCm}</span>
            <input
              type="number"
              className="tool-input mt-2"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
          </label>
        )}
      </div>
      {percent !== null ? (
        <div className="result-card">
          <p className="text-sm text-[var(--muted)]">{ui.bodyFat}</p>
          <p className="result-value">{percent}%</p>
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">{ui.invalid}</p>
      )}
      <p className="text-xs text-[var(--muted)]">{ui.disclaimer}</p>
    </div>
  );
}
