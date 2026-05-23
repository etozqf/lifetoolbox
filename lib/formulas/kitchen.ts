export function scaleRecipeFactor(originalServings: number, targetServings: number): number | null {
  if (originalServings <= 0 || targetServings <= 0) return null;
  return targetServings / originalServings;
}

export type ScaledIngredient = {
  line: string;
  amount: number | null;
  unit: string;
  name: string;
  scaledAmount: number | null;
};

const AMOUNT_RE = /^([\d./]+)\s*(\S+)?\s*(.*)$/;

export function parseAndScaleIngredient(line: string, factor: number): ScaledIngredient {
  const trimmed = line.trim();
  if (!trimmed) return { line, amount: null, unit: "", name: "", scaledAmount: null };

  const match = trimmed.match(AMOUNT_RE);
  if (!match) return { line: trimmed, amount: null, unit: "", name: trimmed, scaledAmount: null };

  const rawAmount = match[1];
  let amount: number;
  if (rawAmount.includes("/")) {
    const [a, b] = rawAmount.split("/").map(Number);
    amount = b ? a / b : Number(rawAmount);
  } else {
    amount = parseFloat(rawAmount);
  }

  if (!Number.isFinite(amount)) {
    return { line: trimmed, amount: null, unit: "", name: trimmed, scaledAmount: null };
  }

  const unit = match[2] ?? "";
  const name = match[3]?.trim() ?? "";
  const scaled = Math.round(amount * factor * 100) / 100;

  return { line: trimmed, amount, unit, name, scaledAmount: scaled };
}

export type IngredientDensity = { key: string; label: string; gPerCup: number; gPerTbsp: number };

export const INGREDIENT_DENSITIES: IngredientDensity[] = [
  { key: "water", label: "Water / milk", gPerCup: 240, gPerTbsp: 15 },
  { key: "flour", label: "All-purpose flour", gPerCup: 125, gPerTbsp: 8 },
  { key: "sugar", label: "Granulated sugar", gPerCup: 200, gPerTbsp: 12.5 },
  { key: "brown-sugar", label: "Brown sugar (packed)", gPerCup: 220, gPerTbsp: 14 },
  { key: "butter", label: "Butter", gPerCup: 227, gPerTbsp: 14.2 },
  { key: "rice", label: "Rice (uncooked)", gPerCup: 185, gPerTbsp: 11.5 },
  { key: "oats", label: "Rolled oats", gPerCup: 90, gPerTbsp: 5.6 },
  { key: "honey", label: "Honey", gPerCup: 340, gPerTbsp: 21 },
];

export function convertCookingAmount(
  ingredientKey: string,
  amount: number,
  fromUnit: "cup" | "tbsp" | "g" | "ml"
): { grams: number; ml: number; cups: number; tbsp: number } | null {
  const ing = INGREDIENT_DENSITIES.find((i) => i.key === ingredientKey);
  if (!ing || amount <= 0) return null;

  let grams: number;
  switch (fromUnit) {
    case "cup":
      grams = amount * ing.gPerCup;
      break;
    case "tbsp":
      grams = amount * ing.gPerTbsp;
      break;
    case "g":
      grams = amount;
      break;
    case "ml":
      grams = amount; // approx 1ml ≈ 1g for water-like; use water density for ml input
      break;
  }

  const ml = fromUnit === "ml" ? amount : grams; // simplified for kitchen use
  return {
    grams: Math.round(grams * 10) / 10,
    ml: Math.round(ml * 10) / 10,
    cups: Math.round((grams / ing.gPerCup) * 100) / 100,
    tbsp: Math.round((grams / ing.gPerTbsp) * 100) / 100,
  };
}

export const GAS_MARK_TABLE: { mark: number | string; c: number; f: number }[] = [
  { mark: "¼", c: 110, f: 225 },
  { mark: "½", c: 130, f: 250 },
  { mark: 1, c: 140, f: 275 },
  { mark: 2, c: 150, f: 300 },
  { mark: 3, c: 160, f: 325 },
  { mark: 4, c: 180, f: 350 },
  { mark: 5, c: 190, f: 375 },
  { mark: 6, c: 200, f: 400 },
  { mark: 7, c: 220, f: 425 },
  { mark: 8, c: 230, f: 450 },
  { mark: 9, c: 240, f: 475 },
];

export function cToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function findGasMark(c: number): string {
  let closest = GAS_MARK_TABLE[0];
  let minDiff = Math.abs(c - closest.c);
  for (const row of GAS_MARK_TABLE) {
    const diff = Math.abs(c - row.c);
    if (diff < minDiff) {
      minDiff = diff;
      closest = row;
    }
  }
  return String(closest.mark);
}

export function convertOvenTemp(from: "c" | "f", value: number) {
  if (!Number.isFinite(value)) return null;
  const c = from === "c" ? value : fToCelsius(value);
  const f = from === "f" ? value : cToFahrenheit(value);
  return { c: Math.round(c), f: Math.round(f), gasMark: findGasMark(c) };
}
