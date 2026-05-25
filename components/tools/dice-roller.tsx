"use client";
import { useState } from "react";
import { rollDice } from "@/lib/formulas/social";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

function mapDiceError(err: string, ui: ReturnType<typeof useToolUi<"dice-roller">>): string {
  if (err === "Roll 1–20 dice") return ui.errDice;
  if (err === "Sides must be 2–100") return ui.errSides;
  return err;
}

export function DiceRollerTool() {
  const ui = useToolUi("dice-roller");
  const { locale } = useLocale();
  const [count, setCount] = useState("2");
  const [sides, setSides] = useState("6");
  const [rolls, setRolls] = useState<number[]>([]);
  const [error, setError] = useState("");
  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  const roll = () => {
    const out = rollDice(parseInt(count, 10) || 1, parseInt(sides, 10) || 6);
    if ("error" in out) { setError(mapDiceError(out.error, ui)); setRolls([]); }
    else { setError(""); setRolls(out); }
  };

  const total = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block"><span className="text-sm font-medium">{ui.dice}</span>
          <input type="number" min="1" max="20" className="tool-input mt-2" value={count} onChange={(e) => setCount(e.target.value)} /></label>
        <label className="tool-panel block"><span className="text-sm font-medium">{ui.sides}</span>
          <input type="number" min="2" className="tool-input mt-2" value={sides} onChange={(e) => setSides(e.target.value)} /></label>
      </div>
      <div className="flex flex-wrap gap-2">
        {[4, 6, 8, 10, 20].map((s) => (
          <button key={s} type="button" className="btn-preset" onClick={() => setSides(String(s))}>d{s}</button>
        ))}
      </div>
      <button type="button" className="btn-primary w-full" onClick={roll}>{ui.roll}</button>
      {error && <p className="text-red-500">{error}</p>}
      {rolls.length > 0 && (
        <div className="result-card text-center">
          <p className="text-sm text-[var(--muted)]">{ui.results}</p>
          <p className="result-value mt-2">{rolls.join(" + ")}</p>
          <p className="mt-2 text-lg">{ui.totalLabel} <strong>{numFmt(total)}</strong></p>
        </div>
      )}
    </div>
  );
}
