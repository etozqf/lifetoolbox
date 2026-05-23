export type TipInput = {
  billAmount: number;
  tipPercent: number;
  splitCount: number;
  roundUp: boolean;
};

export type TipResult = {
  tipAmount: number;
  total: number;
  perPerson: number;
};

export function calcTip(input: TipInput): TipResult | null {
  const { billAmount, tipPercent, splitCount, roundUp } = input;
  if (billAmount <= 0 || splitCount < 1 || tipPercent < 0) return null;

  let tipAmount = billAmount * (tipPercent / 100);
  let total = billAmount + tipAmount;

  if (roundUp) {
    total = Math.ceil(total);
    tipAmount = total - billAmount;
  }

  return {
    tipAmount,
    total,
    perPerson: total / splitCount,
  };
}

export function formatTipSummary(
  bill: number,
  result: TipResult,
  splitCount: number
): string {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return `Bill ${fmt(bill)} + Tip ${fmt(result.tipAmount)} = Total ${fmt(result.total)}${splitCount > 1 ? ` (${fmt(result.perPerson)} per person)` : ""}`;
}

export type BillSplitInput = {
  totalAmount: number;
  splitCount: number;
  tipPercent: number;
};

export function calcBillSplit(input: BillSplitInput): TipResult | null {
  return calcTip({
    billAmount: input.totalAmount,
    tipPercent: input.tipPercent,
    splitCount: input.splitCount,
    roundUp: false,
  });
}
