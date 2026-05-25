import type { UnitDef } from "@/lib/formulas/units";
import type { Locale } from "@/lib/i18n/config";

const unitLabelsZh: Record<string, string> = {
  mg: "毫克 (mg)",
  g: "克 (g)",
  kg: "千克 (kg)",
  oz: "盎司 (oz)",
  lb: "磅 (lb)",
  st: "英石 (st)",
  mm: "毫米 (mm)",
  cm: "厘米 (cm)",
  m: "米 (m)",
  km: "千米 (km)",
  in: "英寸 (in)",
  ft: "英尺 (ft)",
  yd: "码 (yd)",
  mi: "英里 (mi)",
  "mm2": "平方毫米 (mm²)",
  "cm2": "平方厘米 (cm²)",
  "m2": "平方米 (m²)",
  "km2": "平方千米 (km²)",
  "in2": "平方英寸 (in²)",
  "ft2": "平方英尺 (ft²)",
  acre: "英亩",
  ha: "公顷 (ha)",
  ml: "毫升 (ml)",
  l: "升 (L)",
  floz: "美制液盎司 (fl oz)",
  cup: "美制杯",
  pint: "美制品脱",
  quart: "美制夸脱",
  gal: "美制加仑",
  "m3": "立方米 (m³)",
  mps: "米/秒 (m/s)",
  kmh: "千米/时 (km/h)",
  mph: "英里/时 (mph)",
  knot: "节",
  fps: "英尺/秒 (ft/s)",
};

export function getUnitLabel(unit: UnitDef, locale: Locale): string {
  if (locale === "zh") return unitLabelsZh[unit.key] ?? unit.label;
  return unit.label;
}
