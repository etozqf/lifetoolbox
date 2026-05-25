"use client";

import { useMemo, useState } from "react";
import { calcPermutationCombination } from "@/lib/formulas/combinatorics";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function PermutationCombinationTool() {
  const ui = useToolUi("permutation-combination");
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");

  const result = useMemo(() => {
    const nVal = parseInt(n, 10);
    const rVal = parseInt(r, 10);
    return calcPermutationCombination(nVal, rVal);
  }, [n, r]);

  const errorMessage =
    result.ok === false
      ? result.error === "nLessThanR"
        ? ui.errNLessThanR
        : result.error === "tooLarge"
          ? ui.errTooLarge
          : result.error === "negative"
            ? ui.errNegative
            : ui.errInvalid
      : "";

  return (
    <div className="space-y-4">
      <div className="tool-panel grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">{ui.nLabel}</span>
          <input
            type="number"
            min={0}
            className="tool-input mt-1"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">{ui.rLabel}</span>
          <input
            type="number"
            min={0}
            className="tool-input mt-1"
            value={r}
            onChange={(e) => setR(e.target.value)}
          />
        </label>
      </div>

      {result.ok ? (
        <div className="space-y-3">
          <div className="result-card">
            <p className="text-sm text-[var(--muted)]">{ui.permutationLabel}</p>
            <p className="result-value mt-1 font-mono">{result.permutation.toString()}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">{ui.permutationFormula}</p>
          </div>
          <div className="result-card">
            <p className="text-sm text-[var(--muted)]">{ui.combinationLabel}</p>
            <p className="result-value mt-1 font-mono">{result.combination.toString()}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">{ui.combinationFormula}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
