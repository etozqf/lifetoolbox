"use client";

import { useMemo, useState } from "react";
import {
  convertTemperature,
  convertUnit,
  formatNumber,
  lengthUnits,
  weightUnits,
  areaUnits,
  volumeUnits,
  speedUnits,
  type UnitDef,
} from "@/lib/formulas/units";
import type { LifeToolSlug } from "@/lib/i18n/tool-ui/life";
import { getUnitLabel } from "@/lib/i18n/unit-labels";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

type ConverterKind = "length" | "weight" | "area" | "volume" | "speed";

const CONFIG: Record<ConverterKind, { slug: LifeToolSlug; units: UnitDef[] }> = {
  length: { slug: "length", units: lengthUnits },
  weight: { slug: "weight", units: weightUnits },
  area: { slug: "area", units: areaUnits },
  volume: { slug: "volume", units: volumeUnits },
  speed: { slug: "speed", units: speedUnits },
};

export function UnitConverterTool({ kind }: { kind: ConverterKind }) {
  const { slug, units } = CONFIG[kind];
  const ui = useToolUi(slug);
  const { locale } = useLocale();
  const [activeKey, setActiveKey] = useState(units[0].key);
  const [input, setInput] = useState("");

  const displayValues = useMemo(() => {
    if (input === "") return null;
    const num = parseFloat(input);
    if (!Number.isFinite(num)) return null;
    return convertUnit(units, activeKey, num);
  }, [activeKey, input, units]);

  return (
    <div className="space-y-3">
      {units.map((u) => (
        <label key={u.key} className="tool-panel flex items-center gap-3">
          <input
            type="number"
            className="tool-input max-w-[140px] flex-shrink-0"
            value={
              activeKey === u.key
                ? input
                : displayValues
                  ? formatNumber(displayValues[u.key], 4)
                  : ""
            }
            placeholder={ui.placeholderZero}
            onChange={(e) => {
              setActiveKey(u.key);
              setInput(e.target.value);
            }}
            onFocus={() => {
              if (activeKey !== u.key && displayValues) {
                setActiveKey(u.key);
                setInput(formatNumber(displayValues[u.key], 4));
              }
            }}
          />
          <span className="text-sm">{getUnitLabel(u, locale)}</span>
        </label>
      ))}
    </div>
  );
}

export function TemperatureConverterTool() {
  const ui = useToolUi("temperature");
  const [active, setActive] = useState<"c" | "f" | "k">("c");
  const [input, setInput] = useState("25");

  const result = useMemo(() => {
    const v = parseFloat(input);
    if (!Number.isFinite(v)) return null;
    return convertTemperature(active, v);
  }, [active, input]);

  const rows = [
    { key: "c" as const, label: ui.celsius },
    { key: "f" as const, label: ui.fahrenheit },
    { key: "k" as const, label: ui.kelvin },
  ];

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <label key={row.key} className="tool-panel flex items-center gap-3">
          <input
            type="number"
            className="tool-input max-w-[140px]"
            value={
              active === row.key
                ? input
                : result
                  ? formatNumber(result[row.key], 2)
                  : ""
            }
            placeholder={ui.placeholderZero}
            onChange={(e) => {
              setActive(row.key);
              setInput(e.target.value);
            }}
          />
          <span className="text-sm">{row.label}</span>
        </label>
      ))}
    </div>
  );
}
