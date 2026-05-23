export function calcSalesTax(
  price: number,
  taxRate: number,
  taxInclusive: boolean
): { subtotal: number; taxAmount: number; total: number } | null {
  if (price < 0 || taxRate < 0) return null;

  if (taxInclusive) {
    const subtotal = price / (1 + taxRate / 100);
    const taxAmount = price - subtotal;
    return { subtotal, taxAmount, total: price };
  }

  const taxAmount = price * (taxRate / 100);
  return { subtotal: price, taxAmount, total: price + taxAmount };
}

export const US_STATE_TAX_PRESETS: { label: string; rate: number }[] = [
  { label: "California (7.25%)", rate: 7.25 },
  { label: "New York (8%)", rate: 8 },
  { label: "Texas (6.25%)", rate: 6.25 },
  { label: "Florida (6%)", rate: 6 },
  { label: "No tax (0%)", rate: 0 },
];
