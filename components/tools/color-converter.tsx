"use client";

import { useEffect, useState } from "react";
import {
  formatHsl,
  formatRgb,
  hslToRgb,
  parseHex,
  parseHsl,
  parseRgb,
  rgbToColorInput,
  rgbToHex,
  rgbToHsl,
  type Rgb,
} from "@/lib/formulas/color";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { copyToClipboard } from "@/lib/utils";

type ColorField = "hex" | "rgb" | "hsl";

export function ColorConverterTool() {
  const ui = useToolUi("color-converter");
  const [hex, setHex] = useState("#ff0000");
  const [rgbText, setRgbText] = useState("rgb(255, 0, 0)");
  const [hslText, setHslText] = useState("hsl(0, 100%, 50%)");
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState<ColorField | "">("");

  const syncFromRgb = (rgb: Rgb) => {
    setHex(rgbToHex(rgb));
    setRgbText(formatRgb(rgb));
    setHslText(formatHsl(rgbToHsl(rgb)));
    setError("");
  };

  useEffect(() => {
    const initial = parseHex("#ff0000");
    if (initial) syncFromRgb(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHexChange = (value: string) => {
    setHex(value);
    const parsed = parseHex(value);
    if (!parsed) {
      setError(ui.errInvalidHex);
      return;
    }
    syncFromRgb(parsed);
  };

  const handleRgbChange = (value: string) => {
    setRgbText(value);
    const parsed = parseRgb(value);
    if (!parsed) {
      setError(ui.errInvalidRgb);
      return;
    }
    syncFromRgb(parsed);
  };

  const handleHslChange = (value: string) => {
    setHslText(value);
    const parsed = parseHsl(value);
    if (!parsed) {
      setError(ui.errInvalidHsl);
      return;
    }
    syncFromRgb(hslToRgb(parsed));
  };

  const handlePickerChange = (value: string) => {
    const parsed = parseHex(value);
    if (!parsed) return;
    syncFromRgb(parsed);
  };

  const handleCopy = async (field: ColorField, text: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const previewRgb = parseHex(hex) ?? parseRgb(rgbText) ?? { r: 0, g: 0, b: 0 };

  return (
    <div className="space-y-4">
      <div className="tool-panel flex flex-wrap items-center gap-4">
        <div
          className="h-20 w-20 rounded-xl border border-[var(--border)]"
          style={{ backgroundColor: rgbToColorInput(previewRgb) }}
        />
        <label className="block">
          <span className="text-sm font-medium">{ui.colorPicker}</span>
          <input
            type="color"
            className="mt-2 h-10 w-20 cursor-pointer"
            value={rgbToColorInput(previewRgb)}
            onChange={(e) => handlePickerChange(e.target.value)}
          />
        </label>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="tool-panel space-y-3">
        <label className="block">
          <span className="text-sm font-medium">HEX</span>
          <div className="mt-1 flex gap-2">
            <input
              className="tool-input flex-1 font-mono"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#ff0000"
            />
            <button type="button" className="btn-secondary" onClick={() => handleCopy("hex", hex)}>
              {copiedField === "hex" ? ui.copied : ui.copy}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium">RGB</span>
          <div className="mt-1 flex gap-2">
            <input
              className="tool-input flex-1 font-mono"
              value={rgbText}
              onChange={(e) => handleRgbChange(e.target.value)}
              placeholder="rgb(255, 0, 0)"
            />
            <button type="button" className="btn-secondary" onClick={() => handleCopy("rgb", rgbText)}>
              {copiedField === "rgb" ? ui.copied : ui.copy}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium">HSL</span>
          <div className="mt-1 flex gap-2">
            <input
              className="tool-input flex-1 font-mono"
              value={hslText}
              onChange={(e) => handleHslChange(e.target.value)}
              placeholder="hsl(0, 100%, 50%)"
            />
            <button type="button" className="btn-secondary" onClick={() => handleCopy("hsl", hslText)}>
              {copiedField === "hsl" ? ui.copied : ui.copy}
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
