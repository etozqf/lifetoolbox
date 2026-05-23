"use client";

import { useMemo, useState } from "react";
import { GAS_MARK_TABLE, convertOvenTemp } from "@/lib/formulas/kitchen";

export function OvenTemperatureTool() {
  const [active, setActive] = useState<"c" | "f">("c");
  const [input, setInput] = useState("180");

  const result = useMemo(() => convertOvenTemp(active, parseFloat(input) || 0), [active, input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["c", "f"] as const).map((u) => (
          <button key={u} type="button" className={`btn-preset flex-1 ${active === u ? "btn-preset-active" : ""}`} onClick={() => setActive(u)}>
            {u === "c" ? "Celsius °C" : "Fahrenheit °F"}
          </button>
        ))}
      </div>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Temperature</span>
        <input type="number" className="tool-input mt-2" value={input} onChange={(e) => { setActive(active); setInput(e.target.value); }} />
      </label>
      {result && (
        <div className="result-card space-y-2">
          <p className="result-value text-2xl">{result.c}°C = {result.f}°F</p>
          <p>Gas Mark: <strong>{result.gasMark}</strong></p>
        </div>
      )}
      <div className="tool-panel overflow-x-auto">
        <p className="mb-2 text-sm font-medium">Gas Mark reference</p>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-[var(--muted)]"><th className="pb-1">Gas</th><th>°C</th><th>°F</th></tr></thead>
          <tbody>
            {GAS_MARK_TABLE.map((row) => (
              <tr key={String(row.mark)}><td className="py-0.5">{row.mark}</td><td>{row.c}</td><td>{row.f}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
