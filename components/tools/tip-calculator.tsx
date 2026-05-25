"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcTip, formatTipSummary } from "@/lib/formulas/tip";
import { localizePath } from "@/lib/i18n";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";
import { copyToClipboard } from "@/lib/utils";

const PRESETS = [15, 18, 20, 25];

export function TipCalculatorTool() {
  const ui = useToolUi("tip-calculator");
  const { locale } = useLocale();
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
    n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { style: "currency", currency: "USD" });

  const handleCopy = async () => {
    if (!result) return;
    await copyToClipboard(formatTipSummary(parseFloat(bill) || 0, result, parseInt(splitCount, 10) || 1));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.billAmount}</span>
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
        <span className="text-sm font-medium">{ui.tipPercent}</span>
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
          {ui.customPercent}
          <input
            type="number"
            min="0"
            className="tool-input mt-1"
            placeholder={ui.placeholderCustom}
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
          />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.splitPeople}</span>
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
        {ui.roundUp}
      </label>

      {result && (
        <div className="result-card space-y-3">
          <div className="flex justify-between">
            <span>{ui.tipAmount}</span>
            <span className="result-value text-xl">{fmt(result.tipAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>{ui.totalBill}</span>
            <span className="result-value text-xl">{fmt(result.total)}</span>
          </div>
          <div className="flex justify-between border-t border-brand/20 pt-3">
            <span className="font-medium">{ui.perPerson}</span>
            <span className="result-value">{fmt(result.perPerson)}</span>
          </div>
          <button type="button" className="btn-secondary w-full" onClick={handleCopy}>
            {copied ? ui.copied : ui.copySummary}
          </button>
        </div>
      )}

      <p className="text-center text-sm text-[var(--muted)]">
        <Link href={localizePath("/tools/calc/bill-splitter", locale)} className="text-brand hover:underline">
          {ui.tryBillSplitter}
        </Link>
      </p>
    </div>
  );
}
