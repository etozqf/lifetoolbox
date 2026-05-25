"use client";

import { useMemo, useState } from "react";
import { calcBudget } from "@/lib/formulas/budget";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function BudgetCalculatorTool() {
  const ui = useToolUi("budget-calculator");
  const [incomeExtra, setIncomeExtra] = useState("5000");
  const [incomeLines, setIncomeLines] = useState("Salary 4500\nFreelance 800");
  const [expenseLines, setExpenseLines] = useState(
    "Rent 1200\nGroceries 400\nTransport 150"
  );

  const result = useMemo(() => {
    const extra = parseFloat(incomeExtra.replace(/,/g, "")) || 0;
    return calcBudget(incomeLines, expenseLines, extra);
  }, [incomeExtra, incomeLines, expenseLines]);

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.baseIncome}</span>
        <input
          type="number"
          className="tool-input mt-2"
          value={incomeExtra}
          onChange={(e) => setIncomeExtra(e.target.value)}
          min="0"
          step="0.01"
        />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.incomeLines}</span>
        <textarea
          className="tool-textarea mt-2 min-h-[80px]"
          value={incomeLines}
          onChange={(e) => setIncomeLines(e.target.value)}
          placeholder={ui.linesPlaceholder}
        />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.expenseLines}</span>
        <textarea
          className="tool-textarea mt-2 min-h-[100px]"
          value={expenseLines}
          onChange={(e) => setExpenseLines(e.target.value)}
          placeholder={ui.linesPlaceholder}
        />
      </label>
      <div className="result-card space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-sm text-[var(--muted)]">{ui.totalIncome}</p>
            <p className="result-value text-lg">
              {result.incomeTotal.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-[var(--muted)]">{ui.totalExpenses}</p>
            <p className="result-value text-lg">
              {result.expenseTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">{ui.balance}</p>
          <p
            className={`result-value text-lg ${result.balance < 0 ? "text-red-500" : ""}`}
          >
            {result.balance.toFixed(2)}
          </p>
        </div>
        {result.savingsRate !== null && (
          <div>
            <p className="text-sm text-[var(--muted)]">{ui.savingsRate}</p>
            <p className="text-lg font-semibold">
              {result.savingsRate.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
