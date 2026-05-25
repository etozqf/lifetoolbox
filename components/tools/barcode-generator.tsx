"use client";

import { useEffect, useRef, useState } from "react";
import {
  normalizeBarcodeValue,
  validateBarcodeInput,
  type BarcodeFormat,
} from "@/lib/formulas/barcode";
import { downloadBlob } from "@/lib/image/client-image";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function BarcodeGeneratorTool() {
  const ui = useToolUi("barcode-generator");
  const [value, setValue] = useState("123456789012");
  const [format, setFormat] = useState<BarcodeFormat>("EAN13");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const validation = validateBarcodeInput(value, format);
    if (!validation.ok) {
      setError(validation.error);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const JsBarcode = (await import("jsbarcode")).default;
        if (cancelled) return;
        const normalized = normalizeBarcodeValue(value, format);
        JsBarcode(canvas, normalized, {
          format,
          displayValue: true,
          margin: 12,
          height: 80,
        });
        setError("");
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : ui.errRender);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [value, format, ui.errRender]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || error) return;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `barcode-${format.toLowerCase()}.png`);
    }, "image/png");
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.value}</span>
        <input
          type="text"
          className="tool-input mt-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={ui.placeholder}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {(["CODE128", "EAN13", "UPC"] as const).map((fmt) => (
          <button
            key={fmt}
            type="button"
            className={`btn-preset ${format === fmt ? "btn-preset-active" : ""}`}
            onClick={() => setFormat(fmt)}
          >
            {ui[fmt]}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="result-card flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="max-w-full" />
        {!error && (
          <button type="button" className="btn-secondary" onClick={download}>
            {ui.downloadPng}
          </button>
        )}
      </div>
      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
