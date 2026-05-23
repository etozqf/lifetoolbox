"use client";

import { useMemo, useState } from "react";
import {
  calcPercentChange,
  calcPercentOf,
  calcWhatPercent,
  type PercentMode,
} from "@/lib/formulas/percentage";

const MODES: { id: PercentMode; label: string; example: string }[] = [
  { id: "of", label: "What is X% of Y?", example: "20% off a $49.99 item" },
  { id: "what", label: "X is what % of Y?", example: "Scored 42 out of 50" },
  { id: "change", label: "Percent change", example: "Price went from $80 to $100" },
];

export function PercentageCalculatorTool() {
  const [mode, setMode] = useState<PercentMode>("of");
  const [a, setA] = useState("20");
  const [b, setB] = useState("49.99");

  const result = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    switch (mode) {
      case "of":
        return calcPercentOf(x, y);
      case "what":
        return calcWhatPercent(x, y);
      case "change":
        return calcPercentChange(x, y);
    }
  }, [mode, a, b]);

  const current = MODES.find((m) => m.id === mode)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`btn-preset text-left ${mode === m.id ? "btn-preset-active" : ""}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="tool-panel space-y-3">
        <label className="block">
          <span className="text-sm font-medium">
            {mode === "of" ? "X (%)" : mode === "what" ? "X (part)" : "From (original)"}
          </span>
          <input
            type="number"
            className="tool-input mt-1"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">
            {mode === "of" ? "Y (number)" : mode === "what" ? "Y (whole)" : "To (new value)"}
          </span>
          <input
            type="number"
            className="tool-input mt-1"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </label>
      </div>

      <div className="result-card">
        {result === null ? (
          <p className="text-red-500">Cannot divide by zero or invalid input.</p>
        ) : (
          <>
            <p className="text-sm text-[var(--muted)]">Result</p>
            <p className="result-value mt-1">
              {mode === "change"
                ? `${result >= 0 ? "+" : ""}${result.toFixed(2)}%`
                : mode === "what"
                  ? `${result.toFixed(2)}%`
                  : result.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">Example: {current.example}</p>
          </>
        )}
      </div>
    </div>
  );
}
