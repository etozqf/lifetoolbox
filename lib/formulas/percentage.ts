export type PercentMode = "of" | "what" | "change";

export function calcPercentOf(x: number, y: number): number | null {
  if (y === 0) return null;
  return (x / 100) * y;
}

export function calcWhatPercent(x: number, y: number): number | null {
  if (y === 0) return null;
  return (x / y) * 100;
}

export function calcPercentChange(from: number, to: number): number | null {
  if (from === 0) return null;
  return ((to - from) / from) * 100;
}

export function calcDiscount(original: number, discountPercent: number) {
  if (original < 0 || discountPercent < 0) return null;
  const savings = original * (discountPercent / 100);
  return {
    salePrice: original - savings,
    savings,
  };
}
