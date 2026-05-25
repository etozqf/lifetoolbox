"use client";

import { useMemo, useState } from "react";
import { arabicToRoman, romanToArabic } from "@/lib/formulas/roman";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { copyToClipboard } from "@/lib/utils";

type Mode = "toRoman" | "toArabic";

export function RomanNumeralTool() {
  const ui = useToolUi("roman-numeral");
  const [mode, setMode] = useState<Mode>("toRoman");
  const [input, setInput] = useState("2024");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (mode === "toRoman") {
      const n = parseInt(input, 10);
      if (!Number.isInteger(n)) return { ok: false as const, error: ui.errInvalidNumber };
      const roman = arabicToRoman(n);
      if (roman === null) return { ok: false as const, error: ui.errOutOfRange };
      return { ok: true as const, value: roman };
    }

    const arabic = romanToArabic(input);
    if (arabic === null) return { ok: false as const, error: ui.errInvalidRoman };
    return { ok: true as const, value: String(arabic) };
  }, [mode, input, ui]);

  const handleCopy = async () => {
    if (!result.ok) return;
    await copyToClipboard(result.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={mode === "toRoman" ? "btn-primary" : "btn-secondary"}
          onClick={() => setMode("toRoman")}
        >
          {ui.toRoman}
        </button>
        <button
          type="button"
          className={mode === "toArabic" ? "btn-primary" : "btn-secondary"}
          onClick={() => setMode("toArabic")}
        >
          {ui.toArabic}
        </button>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">{mode === "toRoman" ? ui.arabicInput : ui.romanInput}</span>
        <input
          className="tool-input mt-2 font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "toRoman" ? ui.arabicPlaceholder : ui.romanPlaceholder}
        />
      </label>

      <div className="result-card">
        {result.ok ? (
          <>
            <p className="text-sm text-[var(--muted)]">{ui.result}</p>
            <p className="result-value mt-1 font-mono">{result.value}</p>
            <button type="button" className="btn-secondary mt-3" onClick={handleCopy}>
              {copied ? ui.copied : ui.copy}
            </button>
          </>
        ) : (
          <p className="text-red-500">{result.error}</p>
        )}
      </div>

      <p className="text-xs text-[var(--muted)]">{ui.rangeNote}</p>
    </div>
  );
}
