"use client";
import { useEffect, useState } from "react";
import { downloadBlob } from "@/lib/image/client-image";
import { useToolUi } from "@/lib/i18n/use-tool-ui";

export function QrCodeTool() {
  const ui = useToolUi("qr-code");
  const [text, setText] = useState("https://life.hottoolsbox.com");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!text.trim()) { setDataUrl(""); return; }
      try {
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(text, { width: 280, margin: 2 });
        if (!cancelled) { setDataUrl(url); setError(""); }
      } catch {
        if (!cancelled) setError(ui.errGenerate);
      }
    })();
    return () => { cancelled = true; };
  }, [text, ui.errGenerate]);

  const download = () => {
    if (!dataUrl) return;
    fetch(dataUrl).then((r) => r.blob()).then((blob) => downloadBlob(blob, "qrcode.png"));
  };

  return (
    <div className="space-y-4">
      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.textOrUrl}</span>
        <input type="text" className="tool-input mt-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      {dataUrl && (
        <div className="result-card flex flex-col items-center gap-4">
          <img src={dataUrl} alt={ui.altQr} className="rounded-lg" width={280} height={280} />
          <button type="button" className="btn-secondary" onClick={download}>{ui.downloadPng}</button>
        </div>
      )}
    </div>
  );
}
