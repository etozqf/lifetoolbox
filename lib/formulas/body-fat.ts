export type BodyFatSex = "male" | "female";

export type BodyFatInput = {
  sex: BodyFatSex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
};

function cmToInches(cm: number): number {
  return cm / 2.54;
}

/** US Navy circumference method (metric inputs converted to inches) */
export function calcBodyFatPercent(input: BodyFatInput): number | null {
  const { sex, heightCm, neckCm, waistCm, hipCm } = input;
  if (heightCm <= 0 || neckCm <= 0 || waistCm <= 0) return null;

  const height = cmToInches(heightCm);
  const neck = cmToInches(neckCm);
  const waist = cmToInches(waistCm);

  if (sex === "male") {
    const diff = waist - neck;
    if (diff <= 0) return null;
    const bf =
      86.01 * Math.log10(diff) - 70.041 * Math.log10(height) + 36.76;
    return Math.round(bf * 10) / 10;
  }

  const hip = cmToInches(hipCm ?? 0);
  if (hip <= 0) return null;
  const sum = waist + hip - neck;
  if (sum <= 0) return null;
  const bf =
    163.205 * Math.log10(sum) - 97.684 * Math.log10(height) - 78.387;
  return Math.round(bf * 10) / 10;
}
