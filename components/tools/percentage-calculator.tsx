"use client";

import { useMemo, useState } from "react";
import {
  calcPercentChange,
  calcPercentOf,
  calcWhatPercent,
  type PercentMode,
} from "@/lib/formulas/percentage";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function PercentageCalculatorTool() {
  const ui = useToolUi("percentage-calculator");
  const [mode, setMode] = useState<PercentMode>("of");
  const [a, setA] = useState("20");
  const [b, setB] = useState("49.99");

  const modes = useMemo(
    () =>
      [
        { id: "of" as const, label: ui.modeOf, example: ui.exOf },
        { id: "what" as const, label: ui.modeWhat, example: ui.exWhat },
        { id: "change" as const, label: ui.modeChange, example: ui.exChange },
      ] as const,
    [ui]
  );

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

  const current = modes.find((m) => m.id === mode)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
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
            {mode === "of" ? ui.xPercent : mode === "what" ? ui.xPart : ui.fromOriginal}
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
            {mode === "of" ? ui.yNumber : mode === "what" ? ui.yWhole : ui.toNew}
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
          <p className="text-red-500">{ui.invalidInput}</p>
        ) : (
          <>
            <p className="text-sm text-[var(--muted)]">{ui.result}</p>
            <p className="result-value mt-1">
              {mode === "change"
                ? `${result >= 0 ? "+" : ""}${result.toFixed(2)}%`
                : mode === "what"
                  ? `${result.toFixed(2)}%`
                  : result.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {ui.example} {current.example}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
