"use client";
import { useState } from "react";
import { canvasToBlob, formatFileSize, loadImageFromFile, drawImageToCanvas, downloadBlob } from "@/lib/image/client-image";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function ImageCompressTool() {
  const ui = useToolUi("compress");
  const [quality, setQuality] = useState(80);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [sizes, setSizes] = useState({ orig: 0, comp: 0 });

  const process = async (f: File, q: number) => {
    setStatus(ui.processing);
    const img = await loadImageFromFile(f);
    const canvas = drawImageToCanvas(img, img.naturalWidth, img.naturalHeight);
    const blob = await canvasToBlob(canvas, "image/jpeg", q / 100);
    setSizes({ orig: f.size, comp: blob.size });
    setPreview(URL.createObjectURL(blob));
    setStatus(
      ui.done
        .replace("{orig}", formatFileSize(f.size))
        .replace("{compressed}", formatFileSize(blob.size))
    );
    return blob;
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    try { await process(f, quality); } catch (e) { setStatus(e instanceof Error ? e.message : ui.error); }
  };

  const onQuality = async (q: number) => {
    setQuality(q);
    if (file) try { await process(file, q); } catch (e) { setStatus(e instanceof Error ? e.message : ui.error); }
  };

  const download = async () => {
    if (!file) return;
    const blob = await process(file, quality);
    downloadBlob(blob, file.name.replace(/\.\w+$/, "") + "-compressed.jpg");
  };

  const reductionPct =
    sizes.orig > 0 && sizes.comp > 0 ? Math.round((1 - sizes.comp / sizes.orig) * 100) : null;

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.selectImageMax}</span>
        <input type="file" accept="image/*" className="mt-2 w-full text-sm" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.quality.replace("{n}", String(quality))}</span>
        <input type="range" min="10" max="100" className="mt-2 w-full" value={quality} onChange={(e) => onQuality(Number(e.target.value))} />
      </label>
      {status && <p className="text-sm text-[var(--muted)]">{status}</p>}
      {reductionPct !== null && (
        <p className="text-sm">{ui.reduction.replace("{n}", String(reductionPct))}</p>
      )}
      {preview && (
        <div className="result-card">
          <img src={preview} alt={ui.preview} className="max-h-64 rounded-lg" />
        </div>
      )}
      {file && <button type="button" className="btn-primary w-full" onClick={download}>{ui.downloadJpg}</button>}
      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
