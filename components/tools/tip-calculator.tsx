"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcTip, formatTipSummary } from "@/lib/formulas/tip";
import { copyToClipboard } from "@/lib/utils";

const PRESETS = [15, 18, 20, 25];

export function TipCalculatorTool() {
  const [bill, setBill] = useState("60");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [splitCount, setSplitCount] = useState("2");
  const [roundUp, setRoundUp] = useState(false);
  const [copied, setCopied] = useState(false);

  const effectiveTip = customTip !== "" ? Number(customTip) : tipPercent;

  const result = useMemo(() => {
    const billAmount = parseFloat(bill) || 0;
    const people = parseInt(splitCount, 10) || 1;
    return calcTip({
      billAmount,
      tipPercent: effectiveTip,
      splitCount: people,
      roundUp,
    });
  }, [bill, effectiveTip, splitCount, roundUp]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const handleCopy = async () => {
    if (!result) return;
    await copyToClipboard(formatTipSummary(parseFloat(bill) || 0, result, parseInt(splitCount, 10) || 1));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Bill amount ($)</span>
        <input
          type="number"
          min="0"
          step="0.01"
          className="tool-input mt-2"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </label>

      <div className="tool-panel">
        <span className="text-sm font-medium">Tip percentage</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className={`btn-preset ${customTip === "" && tipPercent === p ? "btn-preset-active" : ""}`}
              onClick={() => {
                setTipPercent(p);
                setCustomTip("");
              }}
            >
              {p}%
            </button>
          ))}
        </div>
        <label className="mt-3 block text-sm">
          Custom %
          <input
            type="number"
            min="0"
            className="tool-input mt-1"
            placeholder="Custom"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
          />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Split between (people)</span>
        <input
          type="number"
          min="1"
          className="tool-input mt-2"
          value={splitCount}
          onChange={(e) => setSplitCount(e.target.value)}
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={roundUp} onChange={(e) => setRoundUp(e.target.checked)} />
        Round up total to nearest dollar
      </label>

      {result && (
        <div className="result-card space-y-3">
          <div className="flex justify-between">
            <span>Tip amount</span>
            <span className="result-value text-xl">{fmt(result.tipAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total bill</span>
            <span className="result-value text-xl">{fmt(result.total)}</span>
          </div>
          <div className="flex justify-between border-t border-brand/20 pt-3">
            <span className="font-medium">Per person</span>
            <span className="result-value">{fmt(result.perPerson)}</span>
          </div>
          <button type="button" className="btn-secondary w-full" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy summary"}
          </button>
        </div>
      )}

      <p className="text-center text-sm text-[var(--muted)]">
        <Link href="/tools/calc/bill-splitter" className="text-brand hover:underline">
          Try Bill Splitter →
        </Link>
      </p>
    </div>
  );
}
