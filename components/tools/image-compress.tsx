"use client";
import { useState } from "react";
import { canvasToBlob, formatFileSize, loadImageFromFile, drawImageToCanvas, downloadBlob } from "@/lib/image/client-image";

export function ImageCompressTool() {
  const [quality, setQuality] = useState(80);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [sizes, setSizes] = useState({ orig: 0, comp: 0 });

  const process = async (f: File, q: number) => {
    setStatus("Processing...");
    const img = await loadImageFromFile(f);
    const canvas = drawImageToCanvas(img, img.naturalWidth, img.naturalHeight);
    const blob = await canvasToBlob(canvas, "image/jpeg", q / 100);
    setSizes({ orig: f.size, comp: blob.size });
    setPreview(URL.createObjectURL(blob));
    setStatus(`Done: ${formatFileSize(f.size)} → ${formatFileSize(blob.size)}`);
    return blob;
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    try { await process(f, quality); } catch (e) { setStatus(e instanceof Error ? e.message : "Error"); }
  };

  const onQuality = async (q: number) => {
    setQuality(q);
    if (file) try { await process(file, q); } catch (e) { setStatus(e instanceof Error ? e.message : "Error"); }
  };

  const download = async () => {
    if (!file) return;
    const blob = await process(file, quality);
    downloadBlob(blob, file.name.replace(/\.\w+$/, "") + "-compressed.jpg");
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Select image (max 10 MB)</span>
        <input type="file" accept="image/*" className="mt-2 w-full text-sm" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
      <label className="tool-panel block">
        <span className="text-sm font-medium">Quality: {quality}%</span>
        <input type="range" min="10" max="100" className="mt-2 w-full" value={quality} onChange={(e) => onQuality(Number(e.target.value))} />
      </label>
      {status && <p className="text-sm text-[var(--muted)]">{status}</p>}
      {sizes.orig > 0 && sizes.comp > 0 && (
        <p className="text-sm">Reduction: <strong>{Math.round((1 - sizes.comp / sizes.orig) * 100)}%</strong></p>
      )}
      {preview && (
        <div className="result-card">
          <img src={preview} alt="Preview" className="max-h-64 rounded-lg" />
        </div>
      )}
      {file && <button type="button" className="btn-primary w-full" onClick={download}>Download compressed JPG</button>}
      <p className="text-xs text-[var(--muted)]">Processed locally — never uploaded.</p>
    </div>
  );
}
