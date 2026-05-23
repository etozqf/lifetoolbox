import { MAX_PDF_BYTES, formatFileSize } from "@/lib/image/client-image";

export function validatePdfFile(file: File): string | null {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return "Please select a PDF file";
  }
  if (file.size > MAX_PDF_BYTES) {
    return `PDF must be under ${formatFileSize(MAX_PDF_BYTES)}`;
  }
  return null;
}

export async function mergePdfFiles(files: File[]): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const merged = await PDFDocument.create();

  for (const file of files) {
    const err = validatePdfFile(file);
    if (err) throw new Error(err);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }

  return merged.save();
}

export async function splitPdfFile(
  file: File,
  startPage: number,
  endPage: number
): Promise<Uint8Array> {
  const err = validatePdfFile(file);
  if (err) throw new Error(err);

  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes);
  const pageCount = source.getPageCount();

  const start = Math.max(1, Math.min(startPage, pageCount));
  const end = Math.max(start, Math.min(endPage, pageCount));
  const indices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);

  const output = await PDFDocument.create();
  const pages = await output.copyPages(source, indices);
  pages.forEach((p) => output.addPage(p));

  return output.save();
}

export function downloadPdfBytes(bytes: Uint8Array, filename: string) {
  const copy = new Uint8Array(bytes);
  const blob = new Blob([copy], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
