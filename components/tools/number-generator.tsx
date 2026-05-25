"use client";

import { useMemo, useState } from "react";
import { generateRandomNumbers } from "@/lib/formulas/units";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { copyToClipboard } from "@/lib/utils";

function mapNumberGenError(
  err: string,
  ui: ReturnType<typeof useToolUi<"number-generator">>
): string {
  if (err === "Min must be ≤ max") return ui.errMinMax;
  if (err === "Count must be at least 1") return ui.errCount;
  if (err === "Cannot generate more unique integers than the range allows") return ui.errUnique;
  return err;
}

export function NumberGeneratorTool() {
  const ui = useToolUi("number-generator");
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    const out = generateRandomNumbers(
      parseInt(min, 10) || 0,
      parseInt(max, 10) || 0,
      parseInt(count, 10) || 1,
      unique
    );
    if ("error" in out) {
      setError(mapNumberGenError(out.error, ui));
      setResults([]);
    } else {
      setError("");
      setResults(out);
    }
  };

  const preview = useMemo(() => results.join(", "), [results]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.min}</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.max}</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.count}</span>
        <input
          type="number"
          min="1"
          className="tool-input mt-2"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
        {ui.unique}
      </label>

      <button type="button" className="btn-primary w-full" onClick={generate}>
        {ui.generate}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="result-card">
          <p className="result-value break-all text-2xl">{preview}</p>
          <button
            type="button"
            className="btn-secondary mt-4 w-full"
            onClick={() => copyToClipboard(preview)}
          >
            {ui.copy}
          </button>
        </div>
      )}
    </div>
  );
}
