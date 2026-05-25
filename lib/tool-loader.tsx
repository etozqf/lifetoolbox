import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type UnitKind = "length" | "weight" | "area" | "volume" | "speed";

type ToolLoader =
  | { kind: "component"; module: string; exportName: string }
  | { kind: "unit"; unitKind: UnitKind };

export const TOOL_LOADERS: Record<string, ToolLoader> = {
  "tip-calculator": { kind: "component", module: "tip-calculator", exportName: "TipCalculatorTool" },
  "bill-splitter": { kind: "component", module: "bill-splitter", exportName: "BillSplitterTool" },
  "percentage-calculator": { kind: "component", module: "percentage-calculator", exportName: "PercentageCalculatorTool" },
  "discount-calculator": { kind: "component", module: "discount-calculator", exportName: "DiscountCalculatorTool" },
  "bmi-calculator": { kind: "component", module: "bmi-calculator", exportName: "BmiCalculatorTool" },
  "ideal-weight": { kind: "component", module: "ideal-weight", exportName: "IdealWeightTool" },
  "age-calculator": { kind: "component", module: "age-calculator", exportName: "AgeCalculatorTool" },
  "days-between": { kind: "component", module: "days-between", exportName: "DaysBetweenTool" },
  countdown: { kind: "component", module: "countdown", exportName: "CountdownTool" },
  length: { kind: "unit", unitKind: "length" },
  weight: { kind: "unit", unitKind: "weight" },
  temperature: { kind: "component", module: "unit-converter", exportName: "TemperatureConverterTool" },
  area: { kind: "unit", unitKind: "area" },
  volume: { kind: "unit", unitKind: "volume" },
  speed: { kind: "unit", unitKind: "speed" },
  "number-generator": { kind: "component", module: "number-generator", exportName: "NumberGeneratorTool" },
  "sales-tax-calculator": { kind: "component", module: "sales-tax-calculator", exportName: "SalesTaxCalculatorTool" },
  "calorie-calculator": { kind: "component", module: "calorie-calculator", exportName: "CalorieCalculatorTool" },
  "water-intake": { kind: "component", module: "water-intake", exportName: "WaterIntakeTool" },
  "pregnancy-due-date": { kind: "component", module: "pregnancy-due-date", exportName: "PregnancyDueDateTool" },
  "workdays-between": { kind: "component", module: "workdays-between", exportName: "WorkdaysBetweenTool" },
  "dice-roller": { kind: "component", module: "dice-roller", exportName: "DiceRollerTool" },
  "decision-wheel": { kind: "component", module: "decision-wheel", exportName: "DecisionWheelTool" },
  "name-picker": { kind: "component", module: "name-picker", exportName: "NamePickerTool" },
  "character-counter": { kind: "component", module: "character-counter", exportName: "CharacterCounterTool" },
  "text-scroller": { kind: "component", module: "text-scroller", exportName: "TextScrollerTool" },
  "recipe-scaler": { kind: "component", module: "recipe-scaler", exportName: "RecipeScalerTool" },
  "cooking-converter": { kind: "component", module: "cooking-converter", exportName: "CookingConverterTool" },
  "oven-temperature": { kind: "component", module: "oven-temperature", exportName: "OvenTemperatureTool" },
  compress: { kind: "component", module: "image-compress", exportName: "ImageCompressTool" },
  resize: { kind: "component", module: "image-resize", exportName: "ImageResizeTool" },
  "jpg-to-png": { kind: "component", module: "jpg-to-png", exportName: "JpgToPngTool" },
  "qr-code": { kind: "component", module: "qr-code", exportName: "QrCodeTool" },
  merge: { kind: "component", module: "pdf-merge", exportName: "PdfMergeTool" },
  split: { kind: "component", module: "pdf-split", exportName: "PdfSplitTool" },
  "currency-converter": { kind: "component", module: "currency-converter", exportName: "CurrencyConverterTool" },
  "mortgage-calculator": { kind: "component", module: "mortgage-calculator", exportName: "MortgageCalculatorTool" },
  "compound-interest": { kind: "component", module: "compound-interest", exportName: "CompoundInterestTool" },
  "permutation-combination": {
    kind: "component",
    module: "permutation-combination",
    exportName: "PermutationCombinationTool",
  },
  "roman-numeral": { kind: "component", module: "roman-numeral", exportName: "RomanNumeralTool" },
  "random-groups": { kind: "component", module: "random-groups", exportName: "RandomGroupsTool" },
  "color-converter": { kind: "component", module: "color-converter", exportName: "ColorConverterTool" },
};

export function getToolSlugFromSegments(segments?: string[]) {
  if (!segments?.length) return null;
  return segments[segments.length - 1] ?? null;
}

export function loadToolComponent(slug: string): ComponentType | null {
  const loader = TOOL_LOADERS[slug];
  if (!loader) return null;

  if (loader.kind === "unit") {
    const unitKind = loader.unitKind;
    return dynamic(
      () =>
        import("@/components/tools/unit-converter").then((m) => {
          function UnitPage() {
            return <m.UnitConverterTool kind={unitKind} />;
          }
          return UnitPage;
        }),
      { ssr: false }
    );
  }

  return dynamic(
    () =>
      import(`@/components/tools/${loader.module}`).then((m) => {
        const Comp = m[loader.exportName as keyof typeof m] as ComponentType;
        return Comp;
      }),
    { ssr: false }
  );
}
