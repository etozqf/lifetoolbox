const ROMAN_PAIRS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const ROMAN_PATTERN =
  /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const ROMAN_VALUES: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export function arabicToRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;

  let remaining = n;
  let result = "";
  for (const [value, numeral] of ROMAN_PAIRS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export function romanToArabic(input: string): number | null {
  const roman = input.trim().toUpperCase();
  if (!roman || !ROMAN_PATTERN.test(roman)) return null;

  let total = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = ROMAN_VALUES[roman[i]];
    const next = ROMAN_VALUES[roman[i + 1]];
    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  if (arabicToRoman(total) !== roman) return null;
  return total;
}
