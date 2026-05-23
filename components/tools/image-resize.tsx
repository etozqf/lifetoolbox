"use client";
import { useState } from "react";
import { canvasToBlob, downloadBlob, drawImageToCanvas, loadImageFromFile } from "@/lib/image/client-image";

export function ImageResizeTool() {
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [lockRatio, setLockRatio] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");

  const resize = async (f: File, w: number, h: number) => {
    const img = await loadImageFromFile(f);
    setRatio(img.naturalWidth / img.naturalHeight);
    const canvas = drawImageToCanvas(img, w, h);
    const blob = await canvasToBlob(canvas, "image/png");
    setPreview(URL.createObjectURL(blob));
    setStatus(`${w}×${h}px`);
    return blob;
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    try {
      await resize(f, parseInt(width, 10) || 800, parseInt(height, 10) || 600);
    } catch (e) { setStatus(e instanceof Error ? e.message : "Error"); }
  };

  const onWidth = (w: string) => {
    setWidth(w);
    const wn = parseInt(w, 10) || 0;
    if (lockRatio && wn > 0) setHeight(String(Math.round(wn / ratio)));
    if (file) resize(file, wn, parseInt(lockRatio ? String(Math.round(wn / ratio)) : height, 10) || 0).catch(() => {});
  };

  const download = async () => {
    if (!file) return;
    const blob = await resize(file, parseInt(width, 10) || 800, parseInt(height, 10) || 600);
    downloadBlob(blob, file.name.replace(/\.\w+$/, "") + "-resized.png");
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Select image</span>
        <input type="file" accept="image/*" className="mt-2 w-full text-sm" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block"><span className="text-sm font-medium">Width (px)</span>
          <input type="number" className="tool-input mt-2" value={width} onChange={(e) => onWidth(e.target.value)} /></label>
        <label className="tool-panel block"><span className="text-sm font-medium">Height (px)</span>
          <input type="number" className="tool-input mt-2" value={height} onChange={(e) => setHeight(e.target.value)} disabled={lockRatio} /></label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} /> Lock aspect ratio
      </label>
      {status && <p className="text-sm">{status}</p>}
      {preview && <div className="result-card"><img src={preview} alt="Preview" className="max-h-64 rounded-lg" /></div>}
      {file && <button type="button" className="btn-primary w-full" onClick={download}>Download PNG</button>}
    </div>
  );
}
