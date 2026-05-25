import {
  canvasToBlob,
  drawImageToCanvas,
  loadImageFromFile,
} from "@/lib/image/client-image";

export type ImageExportFormat = "webp" | "png" | "jpeg";

const MIME: Record<ImageExportFormat, string> = {
  webp: "image/webp",
  png: "image/png",
  jpeg: "image/jpeg",
};

const EXT: Record<ImageExportFormat, string> = {
  webp: "webp",
  png: "png",
  jpeg: "jpg",
};

export function exportMime(format: ImageExportFormat): string {
  return MIME[format];
}

export function exportExtension(format: ImageExportFormat): string {
  return EXT[format];
}

export async function convertImageFile(
  file: File,
  format: ImageExportFormat,
  quality = 0.85
): Promise<Blob> {
  const img = await loadImageFromFile(file);
  const canvas = drawImageToCanvas(img, img.naturalWidth, img.naturalHeight);
  const q = format === "png" ? undefined : quality;
  return canvasToBlob(canvas, MIME[format], q);
}
