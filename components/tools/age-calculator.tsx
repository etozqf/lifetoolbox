"use client";

import { useMemo, useState } from "react";
import { calcAge } from "@/lib/formulas/date";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function AgeCalculatorTool() {
  const ui = useToolUi("age-calculator");
  const { locale } = useLocale();
  const [birthDate, setBirthDate] = useState("1990-05-15");
  const [showMore, setShowMore] = useState(false);

  const result = useMemo(() => calcAge(birthDate), [birthDate]);
  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.birthDate}</span>
        <input
          type="date"
          className="tool-input mt-2"
          value={birthDate}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </label>

      {!result.ok ? (
        <p className="text-red-500">{ui.invalidBirth}</p>
      ) : (
        <div className="result-card space-y-3">
          <p className="text-lg">
            {ui.ageResult
              .replace("{years}", String(result.years))
              .replace("{months}", String(result.months))
              .replace("{days}", String(result.days))}
          </p>
          <p className="text-[var(--muted)]">
            {ui.nextBirthday.replace("{n}", String(result.daysUntilBirthday))}
          </p>
          <button
            type="button"
            className="text-sm text-brand hover:underline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? ui.hideMore : ui.showMore}
          </button>
          {showMore && (
            <ul className="space-y-1 text-sm text-[var(--muted)]">
              <li>{ui.totalDays} {numFmt(result.totalDays)}</li>
              <li>{ui.totalHours} {numFmt(result.totalHours)}</li>
            </ul>
          )}
        </div>
      )}

      <p className="text-xs text-[var(--muted)]">{ui.privacy}</p>
    </div>
  );
}
