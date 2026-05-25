"use client";

import { useMemo, useState } from "react";
import { INGREDIENT_DENSITIES, convertCookingAmount } from "@/lib/formulas/kitchen";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

const INGREDIENT_LABELS_ZH: Record<string, string> = {
  water: "水 / 牛奶",
  flour: "中筋面粉",
  sugar: "细砂糖",
  "brown-sugar": "红糖（压实）",
  butter: "黄油",
  rice: "大米（生）",
  oats: "燕麦片",
  honey: "蜂蜜",
};

function ingredientLabel(key: string, enLabel: string, locale: string): string {
  return locale === "zh" ? (INGREDIENT_LABELS_ZH[key] ?? enLabel) : enLabel;
}

export function CookingConverterTool() {
  const ui = useToolUi("cooking-converter");
  const { locale } = useLocale();
  const [ingredient, setIngredient] = useState("flour");
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState<"cup" | "tbsp" | "g" | "ml">("cup");

  const result = useMemo(
    () => convertCookingAmount(ingredient, parseFloat(amount) || 0, fromUnit),
    [ingredient, amount, fromUnit]
  );

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.ingredient}</span>
        <select className="tool-input mt-2" value={ingredient} onChange={(e) => setIngredient(e.target.value)}>
          {INGREDIENT_DENSITIES.map((i) => (
            <option key={i.key} value={i.key}>{ingredientLabel(i.key, i.label, locale)}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.amount}</span>
          <input type="number" className="tool-input mt-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.fromUnit}</span>
          <select className="tool-input mt-2" value={fromUnit} onChange={(e) => setFromUnit(e.target.value as typeof fromUnit)}>
            <option value="cup">{ui.cups}</option>
            <option value="tbsp">{ui.tbsp}</option>
            <option value="g">{ui.grams}</option>
            <option value="ml">{ui.ml}</option>
          </select>
        </label>
      </div>
      {result && (
        <div className="result-card grid grid-cols-2 gap-3 text-sm">
          <p><strong>{result.grams}</strong> {ui.grams}</p>
          <p><strong>{result.ml}</strong> {ui.ml}</p>
          <p><strong>{result.cups}</strong> {ui.cups}</p>
          <p><strong>{result.tbsp}</strong> {ui.tbsp}</p>
        </div>
      )}
      <p className="text-xs text-[var(--muted)]">{ui.disclaimer}</p>
    </div>
  );
}
