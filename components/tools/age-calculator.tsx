"use client";

import { useMemo, useState } from "react";
import { calcAge } from "@/lib/formulas/date";

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState("1990-05-15");
  const [showMore, setShowMore] = useState(false);

  const result = useMemo(() => calcAge(birthDate), [birthDate]);

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Date of birth</span>
        <input
          type="date"
          className="tool-input mt-2"
          value={birthDate}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </label>

      {!result.ok ? (
        <p className="text-red-500">{result.error}</p>
      ) : (
        <div className="result-card space-y-3">
          <p className="text-lg">
            You are{" "}
            <strong>
              {result.years} years, {result.months} months, {result.days} days
            </strong>{" "}
            old
          </p>
          <p className="text-[var(--muted)]">
            🎂 Next birthday in <strong>{result.daysUntilBirthday}</strong> days
          </p>
          <button
            type="button"
            className="text-sm text-brand hover:underline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide stats" : "Show more stats"}
          </button>
          {showMore && (
            <ul className="space-y-1 text-sm text-[var(--muted)]">
              <li>Total days lived: {result.totalDays.toLocaleString()}</li>
              <li>Total hours: {result.totalHours.toLocaleString()}</li>
            </ul>
          )}
        </div>
      )}

      <p className="text-xs text-[var(--muted)]">
        Your birthday never leaves your browser.
      </p>
    </div>
  );
}
