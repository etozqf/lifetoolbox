"use client";

import { useMemo, useState } from "react";
import { generateRandomNumbers } from "@/lib/formulas/units";
import { copyToClipboard } from "@/lib/utils";

export function NumberGeneratorTool() {
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
      setError(out.error);
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
          <span className="text-sm font-medium">Min</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">Max</span>
          <input
            type="number"
            className="tool-input mt-2"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </label>
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">How many numbers?</span>
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
        No duplicates (integers only)
      </label>

      <button type="button" className="btn-primary w-full" onClick={generate}>
        Generate
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
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
