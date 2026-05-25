"use client";
import { useMemo, useState } from "react";
import { pickRandomOption } from "@/lib/formulas/social";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

const COLORS = ["#FF6B4A", "#2ECC9A", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6", "#EF4444"];

export function DecisionWheelTool() {
  const ui = useToolUi("decision-wheel");
  const [optionsText, setOptionsText] = useState("Pizza\nSushi\nTacos\nSalad");
  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);
  const options = useMemo(() => optionsText.split(/\n/).map((s) => s.trim()).filter(Boolean), [optionsText]);

  const spin = () => {
    if (options.length < 2) return;
    setSpinning(true);
    setWinner("");
    setTimeout(() => {
      const out = pickRandomOption(options);
      setWinner(typeof out === "string" ? out : "");
      setSpinning(false);
    }, 800);
  };

  const slice = 360 / Math.max(options.length, 1);
  const gradient = options.length
    ? `conic-gradient(${options.map((_, i) => `${COLORS[i % COLORS.length]} ${i * slice}deg ${(i + 1) * slice}deg`).join(", ")})`
    : "#e7e5e4";

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.options}</span>
        <textarea className="tool-input mt-2 min-h-[120px] font-sans" value={optionsText} onChange={(e) => setOptionsText(e.target.value)} />
      </label>
      <div className="flex justify-center">
        <div
          className={`h-48 w-48 rounded-full border-4 border-white shadow-lg transition-transform duration-700 ${spinning ? "animate-spin" : ""}`}
          style={{ background: gradient }}
        />
      </div>
      <button type="button" className="btn-primary w-full" disabled={options.length < 2 || spinning} onClick={spin}>
        {spinning ? ui.spinning : ui.spin}
      </button>
      {winner && !spinning && (
        <div className="result-card text-center">
          <p className="text-sm text-[var(--muted)]">{ui.choose}</p>
          <p className="result-value mt-2">{winner}</p>
        </div>
      )}
    </div>
  );
}
