"use client";
import { useState } from "react";
import { downloadPdfBytes, mergePdfFiles } from "@/lib/pdf/client-pdf";
import { formatFileSize } from "@/lib/image/client-image";

export function PdfMergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");

  const onSelect = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
    setStatus(`${list.length} file(s) selected`);
  };

  const merge = async () => {
    if (files.length < 2) { setStatus("Select at least 2 PDF files"); return; }
    setStatus("Merging...");
    try {
      const bytes = await mergePdfFiles(files);
      downloadPdfBytes(bytes, "merged.pdf");
      setStatus(`Merged ${files.length} files (${formatFileSize(bytes.length)})`);
    } catch (e) { setStatus(e instanceof Error ? e.message : "Merge failed"); }
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">Select PDF files (max 20 MB each)</span>
        <input type="file" accept="application/pdf,.pdf" multiple className="mt-2 w-full text-sm" onChange={(e) => onSelect(e.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="text-sm text-[var(--muted)]">{files.map((f) => <li key={f.name}>{f.name} ({formatFileSize(f.size)})</li>)}</ul>
      )}
      <button type="button" className="btn-primary w-full" onClick={merge} disabled={files.length < 2}>Merge & Download</button>
      {status && <p className="text-sm">{status}</p>}
      <p className="text-xs text-[var(--muted)]">Merged locally in your browser.</p>
    </div>
  );
}
