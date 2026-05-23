"use client";
import { useState } from "react";
import { canvasToBlob, downloadBlob, drawImageToCanvas, loadImageFromFile } from "@/lib/image/client-image";

export function JpgToPngTool() {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const convert = async (f: File) => {
    const img = await loadImageFromFile(f);
    const canvas = drawImageToCanvas(img, img.naturalWidth, img.naturalHeight);
    const blob = await canvasToBlob(canvas, "image/png");
    setPreview(URL.createObjectURL(blob));
    setStatus("Converted to PNG");
    return blob;
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    try { await convert(f); } catch (e) { setStatus(e instanceof Error ? e.message : "Error"); }
  };

  const download = async () => {
    if (!file) return;
    const blob = await convert(file);
    downloadBlob(blob, file.name.replace(/\.\w+$/, "") + ".png");
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Select JPG/JPEG image</span>
        <input type="file" accept="image/jpeg,image/jpg" className="mt-2 w-full text-sm" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
      {status && <p className="text-sm text-[var(--muted)]">{status}</p>}
      {preview && <div className="result-card"><img src={preview} alt="PNG preview" className="max-h-64 rounded-lg" /></div>}
      {file && <button type="button" className="btn-primary w-full" onClick={download}>Download PNG</button>}
    </div>
  );
}
