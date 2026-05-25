"use client";
import { useState } from "react";
import { downloadPdfBytes, mergePdfFiles } from "@/lib/pdf/client-pdf";
import { formatFileSize } from "@/lib/image/client-image";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

export function PdfMergeTool() {
  const ui = useToolUi("merge");
  const { locale } = useLocale();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const numFmt = (n: number) => n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  const onSelect = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
    setStatus(ui.selected.replace("{n}", numFmt(list.length)));
  };

  const merge = async () => {
    if (files.length < 2) { setStatus(ui.needTwo); return; }
    setStatus(ui.merging);
    try {
      const bytes = await mergePdfFiles(files);
      downloadPdfBytes(bytes, "merged.pdf");
      setStatus(ui.merged.replace("{n}", numFmt(files.length)).replace("{size}", formatFileSize(bytes.length)));
    } catch (e) { setStatus(e instanceof Error ? e.message : ui.failed); }
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.selectPdfs}</span>
        <input type="file" accept="application/pdf,.pdf" multiple className="mt-2 w-full text-sm" onChange={(e) => onSelect(e.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="text-sm text-[var(--muted)]">{files.map((f) => <li key={f.name}>{f.name} ({formatFileSize(f.size)})</li>)}</ul>
      )}
      <button type="button" className="btn-primary w-full" onClick={merge} disabled={files.length < 2}>{ui.mergeDownload}</button>
      {status && <p className="text-sm">{status}</p>}
      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
