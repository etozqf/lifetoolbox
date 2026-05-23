export type BmiUnit = "metric" | "imperial";

export type BmiCategory =
  | "Underweight"
  | "Normal"
  | "Overweight"
  | "Obese";

export function calcBmi(
  unit: BmiUnit,
  height: number,
  heightInches: number,
  weight: number
): { bmi: number; category: BmiCategory } | null {
  let heightM: number;
  let weightKg: number;

  if (unit === "metric") {
    if (height <= 0 || weight <= 0) return null;
    heightM = height / 100;
    weightKg = weight;
  } else {
    if (height <= 0 || weight <= 0) return null;
    heightM = (height * 12 + heightInches) * 0.0254;
    weightKg = weight * 0.453592;
  }

  const bmi = weightKg / (heightM * heightM);
  return { bmi, category: getBmiCategory(bmi) };
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function getHealthyWeightRange(heightCm: number): { minKg: number; maxKg: number } | null {
  if (heightCm <= 0) return null;
  const h = heightCm / 100;
  return {
    minKg: 18.5 * h * h,
    maxKg: 24.9 * h * h,
  };
}

export type IdealWeightFormula = "devine" | "robinson" | "miller";

export function calcIdealWeight(
  formula: IdealWeightFormula,
  unit: BmiUnit,
  height: number,
  heightInches: number
): number | null {
  let heightCm: number;
  if (unit === "metric") {
    if (height <= 0) return null;
    heightCm = height;
  } else {
    if (height <= 0) return null;
    heightCm = (height * 12 + heightInches) * 2.54;
  }

  const heightIn = heightCm / 2.54;
  const over5ft = Math.max(0, heightIn - 60);

  let weightLbs: number;
  switch (formula) {
    case "devine":
      weightLbs = 110 + 5 * over5ft;
      break;
    case "robinson":
      weightLbs = 115 + 4.7 * over5ft;
      break;
    case "miller":
      weightLbs = 123 + 3.1 * over5ft;
      break;
  }

  return unit === "metric" ? weightLbs * 0.453592 : weightLbs;
}

export function getBmiColor(category: BmiCategory): string {
  switch (category) {
    case "Underweight":
      return "var(--bmi-underweight)";
    case "Normal":
      return "var(--bmi-normal)";
    case "Overweight":
      return "var(--bmi-overweight)";
    case "Obese":
      return "var(--bmi-obese)";
  }
}
