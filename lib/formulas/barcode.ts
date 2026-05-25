export type BarcodeFormat = "CODE128" | "EAN13" | "UPC";

export type BarcodeValidation =
  | { ok: true }
  | { ok: false; error: string };

export function validateBarcodeInput(
  value: string,
  format: BarcodeFormat
): BarcodeValidation {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, error: "Value is required." };
  }

  if (format === "CODE128") {
    if (trimmed.length > 80) {
      return { ok: false, error: "CODE128 supports up to 80 characters." };
    }
    return { ok: true };
  }

  const digits = trimmed.replace(/\D/g, "");
  if (format === "EAN13") {
    if (digits.length !== 12 && digits.length !== 13) {
      return { ok: false, error: "EAN-13 requires 12 or 13 digits." };
    }
    return { ok: true };
  }

  if (digits.length !== 11 && digits.length !== 12) {
    return { ok: false, error: "UPC requires 11 or 12 digits." };
  }
  return { ok: true };
}

export function normalizeBarcodeValue(value: string, format: BarcodeFormat): string {
  const trimmed = value.trim();
  if (format === "CODE128") return trimmed;
  return trimmed.replace(/\D/g, "");
}
