export type BudgetLine = { name: string; amount: number };

export type BudgetResult = {
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
  savingsRate: number | null;
  incomeLines: BudgetLine[];
  expenseLines: BudgetLine[];
};

function parseAmount(raw: string): number | null {
  const n = parseFloat(raw.replace(/,/g, "").trim());
  if (Number.isNaN(n) || n < 0) return null;
  return n;
}

/** Parse "name amount" per line (amount is last token) */
export function parseBudgetLines(text: string): BudgetLine[] {
  const lines: BudgetLine[] = [];
  for (const row of text.split(/\r?\n/)) {
    const trimmed = row.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;
    const amountStr = parts[parts.length - 1];
    const amount = parseAmount(amountStr);
    if (amount === null) continue;
    const name = parts.slice(0, -1).join(" ").trim() || "—";
    lines.push({ name, amount });
  }
  return lines;
}

export function calcBudget(
  incomeText: string,
  expenseText: string,
  extraIncome = 0
): BudgetResult {
  const incomeLines = parseBudgetLines(incomeText);
  const expenseLines = parseBudgetLines(expenseText);
  const incomeFromLines = incomeLines.reduce((s, l) => s + l.amount, 0);
  const incomeTotal = incomeFromLines + Math.max(0, extraIncome);
  const expenseTotal = expenseLines.reduce((s, l) => s + l.amount, 0);
  const balance = incomeTotal - expenseTotal;
  const savingsRate =
    incomeTotal > 0 ? (balance / incomeTotal) * 100 : null;

  return {
    incomeTotal,
    expenseTotal,
    balance,
    savingsRate,
    incomeLines,
    expenseLines,
  };
}
