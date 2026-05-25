"use client";
import { useState } from "react";
import { pickRandomName } from "@/lib/formulas/social";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function NamePickerTool() {
  const ui = useToolUi("name-picker");
  const [names, setNames] = useState("Alice\nBob\nCharlie\nDiana");
  const [winner, setWinner] = useState("");
  const [error, setError] = useState("");
  const pick = () => {
    const list = names.split(/\n/);
    const out = pickRandomName(list);
    if (typeof out === "string") { setWinner(out); setError(""); }
    else { setError(out.error === "Add at least one name" ? ui.errNoNames : out.error); setWinner(""); }
  };
  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.names}</span>
        <textarea className="tool-input mt-2 min-h-[160px] font-sans" value={names} onChange={(e) => setNames(e.target.value)} />
      </label>
      <button type="button" className="btn-primary w-full" onClick={pick}>{ui.pick}</button>
      {error && <p className="text-red-500">{error}</p>}
      {winner && (
        <div className="result-card text-center">
          <p className="text-sm text-[var(--muted)]">{ui.winner}</p>
          <p className="result-value mt-2">{winner}</p>
        </div>
      )}
    </div>
  );
}
