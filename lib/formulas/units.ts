export type UnitDef = {
  key: string;
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
};

export const lengthUnits: UnitDef[] = [
  { key: "mm", label: "Millimeters (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { key: "cm", label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  { key: "m", label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
  { key: "km", label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { key: "in", label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  { key: "ft", label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  { key: "yd", label: "Yards (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  { key: "mi", label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
];

export const weightUnits: UnitDef[] = [
  { key: "mg", label: "Milligrams (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
  { key: "g", label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { key: "kg", label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
  { key: "oz", label: "Ounces (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  { key: "lb", label: "Pounds (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  { key: "st", label: "Stones (st)", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
];

export function convertFromBase(units: UnitDef[], baseValue: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const u of units) {
    out[u.key] = u.fromBase(baseValue);
  }
  return out;
}

export function convertUnit(
  units: UnitDef[],
  fromKey: string,
  value: number
): Record<string, number> | null {
  const from = units.find((u) => u.key === fromKey);
  if (!from || !Number.isFinite(value)) return null;
  return convertFromBase(units, from.toBase(value));
}

export function cToF(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fToC(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function cToK(c: number): number {
  return c + 273.15;
}

export function kToC(k: number): number {
  return k - 273.15;
}

export function convertTemperature(from: "c" | "f" | "k", value: number): Record<string, number> | null {
  if (!Number.isFinite(value)) return null;
  let c: number;
  switch (from) {
    case "c":
      c = value;
      break;
    case "f":
      c = fToC(value);
      break;
    case "k":
      c = kToC(value);
      break;
  }
  return { c, f: cToF(c), k: cToK(c) };
}

export function formatNumber(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  unique: boolean
): number[] | { error: string } {
  if (min > max) return { error: "Min must be ≤ max" };
  if (count < 1) return { error: "Count must be at least 1" };
  const range = max - min + 1;
  if (unique && count > range && Number.isInteger(min) && Number.isInteger(max)) {
    return { error: "Cannot generate more unique integers than the range allows" };
  }

  const results: number[] = [];
  const used = new Set<number>();

  while (results.length < count) {
    const n = Number.isInteger(min) && Number.isInteger(max)
      ? Math.floor(Math.random() * range) + min
      : Math.random() * (max - min) + min;

    const rounded = Number.isInteger(min) && Number.isInteger(max) ? n : Math.round(n * 100) / 100;

    if (unique) {
      if (used.has(rounded)) continue;
      used.add(rounded);
    }
    results.push(rounded);
  }
  return results;
}
