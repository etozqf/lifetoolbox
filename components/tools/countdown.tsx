"use client";

import { useMemo, useState } from "react";
import { calcCountdown } from "@/lib/formulas/date";

export function CountdownTool() {
  const [target, setTarget] = useState("2026-12-31");

  const result = useMemo(() => calcCountdown(target), [target]);

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Target date</span>
        <input
          type="date"
          className="tool-input mt-2"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </label>

      <p className="text-xs text-[var(--muted)]">
        Share this page:{" "}
        <code className="rounded bg-[var(--surface-muted)] px-1">
          ?d={target}
        </code>
      </p>

      <div className="result-card text-center">
        {!result.ok ? (
          <p className="text-red-500">{result.error}</p>
        ) : result.passed ? (
          <p className="text-lg">
            That date was <strong>{result.days}</strong> days ago.
          </p>
        ) : (
          <>
            <p className="result-value">{result.days}</p>
            <p className="mt-2 text-[var(--muted)]">days remaining</p>
          </>
        )}
      </div>
    </div>
  );
}
