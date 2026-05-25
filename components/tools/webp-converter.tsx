"use client";

import { useState } from "react";
import {
  convertImageFile,
  exportExtension,
  type ImageExportFormat,
} from "@/lib/formulas/webp";
import {
  downloadBlob,
  formatFileSize,
  loadImageFromFile,
} from "@/lib/image/client-image";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function WebpConverterTool() {
  const ui = useToolUi("webp-converter");
  const [format, setFormat] = useState<ImageExportFormat>("webp");
  const [quality, setQuality] = useState(85);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);

  const process = async (f: File, fmt: ImageExportFormat, q: number) => {
    setStatus(ui.converting);
    await loadImageFromFile(f);
    const out = await convertImageFile(f, fmt, q / 100);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(out));
    setBlob(out);
    setStatus(ui.done.replace("{size}", formatFileSize(out.size)));
    return out;
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    try {
      await process(f, format, quality);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : ui.errConvert);
    }
  };

  const onFormat = async (fmt: ImageExportFormat) => {
    setFormat(fmt);
    if (file) {
      try {
        await process(file, fmt, quality);
      } catch (e) {
        setStatus(e instanceof Error ? e.message : ui.errConvert);
      }
    }
  };

  const onQuality = async (q: number) => {
    setQuality(q);
    if (file && format !== "png") {
      try {
        await process(file, format, q);
      } catch (e) {
        setStatus(e instanceof Error ? e.message : ui.errConvert);
      }
    }
  };

  const download = () => {
    if (!blob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(blob, `${base}.${exportExtension(format)}`);
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.selectImageMax}</span>
        <input
          type="file"
          accept="image/*"
          className="mt-2 w-full text-sm"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {(["webp", "png", "jpeg"] as const).map((fmt) => (
          <button
            key={fmt}
            type="button"
            className={`btn-preset ${format === fmt ? "btn-preset-active" : ""}`}
            onClick={() => onFormat(fmt)}
          >
            {fmt === "webp" ? ui.formatWebp : fmt === "png" ? ui.formatPng : ui.formatJpeg}
          </button>
        ))}
      </div>
      {format !== "png" && (
        <label className="tool-panel block">
          <span className="text-sm font-medium">
            {ui.quality.replace("{n}", String(quality))}
          </span>
          <input
            type="range"
            min="10"
            max="100"
            className="mt-2 w-full"
            value={quality}
            onChange={(e) => onQuality(Number(e.target.value))}
          />
        </label>
      )}
      {status && <p className="text-sm text-[var(--muted)]">{status}</p>}
      {preview && (
        <div className="result-card">
          <img src={preview} alt={ui.preview} className="max-h-64 rounded-lg" />
        </div>
      )}
      {blob && (
        <button type="button" className="btn-primary w-full" onClick={download}>
          {ui.download}
        </button>
      )}
      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
