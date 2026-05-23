export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "veryActive";

export const activityFactors: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Light (1–3 days/week)",
  moderate: "Moderate (3–5 days/week)",
  active: "Active (6–7 days/week)",
  veryActive: "Very active (physical job + exercise)",
};

export type CalorieInput = {
  sex: "male" | "female";
  age: number;
  weightKg: number;
  heightCm: number;
  activity: ActivityLevel;
};

/** Mifflin-St Jeor BMR + activity factor */
export function calcDailyCalories(input: CalorieInput): number | null {
  const { sex, age, weightKg, heightCm, activity } = input;
  if (age <= 0 || weightKg <= 0 || heightCm <= 0) return null;

  const bmr =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  return Math.round(bmr * activityFactors[activity]);
}

export function calcWaterIntake(weightKg: number, unit: "metric" | "imperial"): {
  liters: number;
  ml: number;
  cups: number;
  oz: number;
} | null {
  if (weightKg <= 0) return null;
  const liters = weightKg * 0.033;
  const ml = liters * 1000;
  const cups = liters / 0.236588;
  const oz = liters * 33.814;
  return { liters, ml, cups, oz };
}

export function calcWaterFromLbs(lbs: number) {
  if (lbs <= 0) return null;
  const oz = lbs / 2;
  const liters = oz * 0.0295735;
  return { liters, ml: liters * 1000, cups: liters / 0.236588, oz };
}

export function calcDueDate(lmpDateStr: string): {
  dueDate: string;
  weeksPregnant: number;
  daysRemaining: number;
} | null {
  const lmp = new Date(lmpDateStr + "T12:00:00");
  if (Number.isNaN(lmp.getTime())) return null;

  const due = new Date(lmp);
  due.setDate(due.getDate() + 280);

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const daysSinceLmp = Math.floor((today.getTime() - lmp.getTime()) / 86400000);
  const weeksPregnant = Math.max(0, Math.floor(daysSinceLmp / 7));
  const daysRemaining = Math.ceil((due.getTime() - today.getTime()) / 86400000);

  return {
    dueDate: due.toISOString().slice(0, 10),
    weeksPregnant,
    daysRemaining,
  };
}
