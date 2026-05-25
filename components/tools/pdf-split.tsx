"use client";
import { useState } from "react";
import { downloadPdfBytes, splitPdfFile } from "@/lib/pdf/client-pdf";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function PdfSplitTool() {
  const ui = useToolUi("split");
  const [file, setFile] = useState<File | null>(null);
  const [start, setStart] = useState("1");
  const [end, setEnd] = useState("1");
  const [status, setStatus] = useState("");

  const split = async () => {
    if (!file) return;
    setStatus(ui.splitting);
    try {
      const bytes = await splitPdfFile(file, parseInt(start, 10) || 1, parseInt(end, 10) || 1);
      downloadPdfBytes(bytes, `pages-${start}-${end}.pdf`);
      setStatus(ui.extracted.replace("{start}", start).replace("{end}", end));
    } catch (e) { setStatus(e instanceof Error ? e.message : ui.failed); }
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.selectPdf}</span>
        <input type="file" accept="application/pdf,.pdf" className="mt-2 w-full text-sm" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="tool-panel block"><span className="text-sm font-medium">{ui.fromPage}</span>
          <input type="number" min="1" className="tool-input mt-2" value={start} onChange={(e) => setStart(e.target.value)} /></label>
        <label className="tool-panel block"><span className="text-sm font-medium">{ui.toPage}</span>
          <input type="number" min="1" className="tool-input mt-2" value={end} onChange={(e) => setEnd(e.target.value)} /></label>
      </div>
      <button type="button" className="btn-primary w-full" onClick={split} disabled={!file}>{ui.extract}</button>
      {status && <p className="text-sm">{status}</p>}
      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
