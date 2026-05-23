export type ToolCluster =
  | "calc"
  | "health"
  | "date"
  | "convert"
  | "random"
  | "social"
  | "kitchen"
  | "image"
  | "pdf"
  | "finance";

export type DisclaimerType = "medical" | "financial";

export type ToolEntry = {
  slug: string;
  cluster: ToolCluster;
  path: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
  related: string[];
  phase: number;
  disclaimer?: DisclaimerType;
};

export const clusterLabels: Record<ToolCluster, string> = {
  calc: "Calculators",
  health: "Health & Fitness",
  date: "Date & Age",
  convert: "Unit Converters",
  random: "Random & Decision",
  social: "Social Text",
  kitchen: "Kitchen & Cooking",
  image: "Image Tools",
  pdf: "PDF Tools",
  finance: "Finance",
};

export const tools: ToolEntry[] = [
  {
    slug: "tip-calculator",
    cluster: "calc",
    path: "/tools/calc/tip-calculator",
    name: "Tip Calculator",
    description: "Calculate restaurant tips and split bills instantly.",
    icon: "Receipt",
    keywords: ["tip calculator", "gratuity calculator", "restaurant tip"],
    related: ["bill-splitter", "percentage-calculator", "discount-calculator"],
    phase: 0,
    disclaimer: "financial",
  },
  {
    slug: "bill-splitter",
    cluster: "calc",
    path: "/tools/calc/bill-splitter",
    name: "Bill Splitter",
    description: "Split a bill evenly or by custom amounts among friends.",
    icon: "Users",
    keywords: ["split bill calculator", "bill splitter"],
    related: ["tip-calculator", "percentage-calculator"],
    phase: 0,
    disclaimer: "financial",
  },
  {
    slug: "percentage-calculator",
    cluster: "calc",
    path: "/tools/calc/percentage-calculator",
    name: "Percentage Calculator",
    description: "Find percentages, percent of a number, and percent change.",
    icon: "Percent",
    keywords: ["percentage calculator", "percent of a number"],
    related: ["discount-calculator", "tip-calculator"],
    phase: 0,
  },
  {
    slug: "discount-calculator",
    cluster: "calc",
    path: "/tools/calc/discount-calculator",
    name: "Discount Calculator",
    description: "Calculate sale price after a percentage discount.",
    icon: "Tag",
    keywords: ["discount calculator", "sale price calculator"],
    related: ["percentage-calculator", "tip-calculator"],
    phase: 0,
  },
  {
    slug: "bmi-calculator",
    cluster: "health",
    path: "/tools/health/bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index with metric or imperial units.",
    icon: "HeartPulse",
    keywords: ["bmi calculator", "body mass index calculator"],
    related: ["ideal-weight"],
    phase: 0,
    disclaimer: "medical",
  },
  {
    slug: "ideal-weight",
    cluster: "health",
    path: "/tools/health/ideal-weight",
    name: "Ideal Weight Calculator",
    description: "Estimate healthy weight range based on your height.",
    icon: "Scale",
    keywords: ["ideal body weight calculator", "healthy weight range"],
    related: ["bmi-calculator"],
    phase: 0,
    disclaimer: "medical",
  },
  {
    slug: "age-calculator",
    cluster: "date",
    path: "/tools/date/age-calculator",
    name: "Age Calculator",
    description: "Find your exact age in years, months, and days.",
    icon: "Cake",
    keywords: ["age calculator", "how old am i"],
    related: ["days-between", "countdown"],
    phase: 0,
  },
  {
    slug: "days-between",
    cluster: "date",
    path: "/tools/date/days-between",
    name: "Days Between Dates",
    description: "Count calendar days, weeks, and months between two dates.",
    icon: "Calendar",
    keywords: ["days between dates", "date difference calculator"],
    related: ["age-calculator", "countdown"],
    phase: 0,
  },
  {
    slug: "countdown",
    cluster: "date",
    path: "/tools/date/countdown",
    name: "Countdown Timer",
    description: "Count down to any future date or event.",
    icon: "Timer",
    keywords: ["countdown to date", "days until"],
    related: ["days-between", "age-calculator"],
    phase: 0,
  },
  {
    slug: "length",
    cluster: "convert",
    path: "/tools/convert/length",
    name: "Length Converter",
    description: "Convert cm, inches, feet, meters, miles, and more.",
    icon: "Ruler",
    keywords: ["cm to inches", "length converter"],
    related: ["weight", "temperature", "area"],
    phase: 0,
  },
  {
    slug: "weight",
    cluster: "convert",
    path: "/tools/convert/weight",
    name: "Weight Converter",
    description: "Convert kg, pounds, ounces, and stones.",
    icon: "Weight",
    keywords: ["kg to lbs", "weight converter"],
    related: ["length", "temperature"],
    phase: 0,
  },
  {
    slug: "temperature",
    cluster: "convert",
    path: "/tools/convert/temperature",
    name: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, and Kelvin.",
    icon: "Thermometer",
    keywords: ["celsius to fahrenheit", "temperature converter"],
    related: ["length", "weight"],
    phase: 0,
  },
  {
    slug: "number-generator",
    cluster: "random",
    path: "/tools/random/number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers within a custom range.",
    icon: "Shuffle",
    keywords: ["random number generator", "pick a random number"],
    related: ["dice-roller", "name-picker"],
    phase: 0,
  },
  // --- Phase 1: Calc ---
  {
    slug: "sales-tax-calculator",
    cluster: "calc",
    path: "/tools/calc/sales-tax-calculator",
    name: "Sales Tax Calculator",
    description: "Calculate sales tax and total price for any US tax rate.",
    icon: "Receipt",
    keywords: ["sales tax calculator", "tax calculator"],
    related: ["tip-calculator", "discount-calculator"],
    phase: 1,
    disclaimer: "financial",
  },
  // --- Phase 1: Health ---
  {
    slug: "calorie-calculator",
    cluster: "health",
    path: "/tools/health/calorie-calculator",
    name: "Calorie Calculator",
    description: "Estimate daily calorie needs based on age, weight, and activity.",
    icon: "Flame",
    keywords: ["calorie calculator", "daily calories", "tdee calculator"],
    related: ["bmi-calculator", "water-intake"],
    phase: 1,
    disclaimer: "medical",
  },
  {
    slug: "water-intake",
    cluster: "health",
    path: "/tools/health/water-intake",
    name: "Water Intake Calculator",
    description: "Find how much water you should drink daily based on weight.",
    icon: "Droplets",
    keywords: ["water intake calculator", "how much water to drink"],
    related: ["calorie-calculator", "bmi-calculator"],
    phase: 1,
    disclaimer: "medical",
  },
  {
    slug: "pregnancy-due-date",
    cluster: "health",
    path: "/tools/health/pregnancy-due-date",
    name: "Pregnancy Due Date Calculator",
    description: "Estimate your due date from the first day of your last period.",
    icon: "Baby",
    keywords: ["pregnancy due date calculator", "due date calculator"],
    related: ["days-between", "countdown"],
    phase: 1,
    disclaimer: "medical",
  },
  // --- Phase 1: Date ---
  {
    slug: "workdays-between",
    cluster: "date",
    path: "/tools/date/workdays-between",
    name: "Workdays Calculator",
    description: "Count business days between two dates (Mon–Fri).",
    icon: "Briefcase",
    keywords: ["workdays calculator", "business days between dates"],
    related: ["days-between", "countdown"],
    phase: 1,
  },
  // --- Phase 1: Convert ---
  {
    slug: "area",
    cluster: "convert",
    path: "/tools/convert/area",
    name: "Area Converter",
    description: "Convert square meters, acres, hectares, square feet, and more.",
    icon: "Square",
    keywords: ["area converter", "square meters to square feet"],
    related: ["length", "volume"],
    phase: 1,
  },
  {
    slug: "volume",
    cluster: "convert",
    path: "/tools/convert/volume",
    name: "Volume Converter",
    description: "Convert liters, gallons, cups, milliliters, and cubic meters.",
    icon: "GlassWater",
    keywords: ["volume converter", "liters to gallons"],
    related: ["area", "weight"],
    phase: 1,
  },
  {
    slug: "speed",
    cluster: "convert",
    path: "/tools/convert/speed",
    name: "Speed Converter",
    description: "Convert mph, km/h, m/s, knots, and feet per second.",
    icon: "Gauge",
    keywords: ["speed converter", "mph to kmh"],
    related: ["length", "temperature"],
    phase: 1,
  },
  // --- Phase 1: Random ---
  {
    slug: "dice-roller",
    cluster: "random",
    path: "/tools/random/dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice — d4, d6, d20, or any custom sides.",
    icon: "Dices",
    keywords: ["dice roller", "roll dice online"],
    related: ["number-generator", "decision-wheel"],
    phase: 1,
  },
  {
    slug: "decision-wheel",
    cluster: "random",
    path: "/tools/random/decision-wheel",
    name: "Decision Wheel",
    description: "Spin a wheel to pick randomly from your options.",
    icon: "CircleDot",
    keywords: ["decision wheel", "spin the wheel"],
    related: ["name-picker", "dice-roller"],
    phase: 1,
  },
  {
    slug: "name-picker",
    cluster: "random",
    path: "/tools/random/name-picker",
    name: "Name Picker",
    description: "Randomly pick a name from your list — perfect for giveaways.",
    icon: "UserRound",
    keywords: ["name picker", "random name generator"],
    related: ["decision-wheel", "number-generator"],
    phase: 1,
  },
  // --- Phase 1: Social ---
  {
    slug: "character-counter",
    cluster: "social",
    path: "/tools/social/character-counter",
    name: "Character Counter",
    description: "Count characters and words for Twitter, Instagram, and more.",
    icon: "Type",
    keywords: ["character counter", "twitter character count"],
    related: ["percentage-calculator"],
    phase: 1,
  },
];

export const CURRENT_PHASE = 1;

export const activeClusters: ToolCluster[] = [
  "calc",
  "health",
  "date",
  "convert",
  "random",
  "social",
];

export function getToolsByPhase(maxPhase = CURRENT_PHASE) {
  return tools.filter((t) => t.phase <= maxPhase);
}

export function getToolsByCluster(cluster: ToolCluster, maxPhase = CURRENT_PHASE) {
  return getToolsByPhase(maxPhase).filter((t) => t.cluster === cluster);
}

export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slugs: string[]) {
  return slugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolEntry => Boolean(t));
}
