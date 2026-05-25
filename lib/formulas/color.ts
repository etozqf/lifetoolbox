export type Rgb = { r: number; g: number; b: number };
export type Hsl = { h: number; s: number; l: number };

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function clampPercent(n: number): number {
  return Math.max(0, Math.min(100, n));
}

export function parseHex(input: string): Rgb | null {
  const cleaned = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return {
      r: parseInt(cleaned[0] + cleaned[0], 16),
      g: parseInt(cleaned[1] + cleaned[1], 16),
      b: parseInt(cleaned[2] + cleaned[2], 16),
    };
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return {
      r: parseInt(cleaned.slice(0, 2), 16),
      g: parseInt(cleaned.slice(2, 4), 16),
      b: parseInt(cleaned.slice(4, 6), 16),
    };
  }
  return null;
}

export function rgbToHex(rgb: Rgb): string {
  const toHex = (n: number) => clampByte(n).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function parseRgb(input: string): Rgb | null {
  const match = input.trim().match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (!match) return null;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  if (![r, g, b].every((n) => Number.isFinite(n) && n >= 0 && n <= 255)) {
    return null;
  }
  return { r, g, b };
}

export function parseHsl(input: string): Hsl | null {
  const match = input.trim().match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i);
  if (!match) return null;

  const h = Number(match[1]);
  const s = Number(match[2]);
  const l = Number(match[3]);
  if (![h, s, l].every((n) => Number.isFinite(n))) return null;
  if (s < 0 || s > 100 || l < 0 || l > 100) return null;

  return { h: ((h % 360) + 360) % 360, s, l };
}

export function rgbToHsl(rgb: Rgb): Hsl {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

export function hslToRgb(hsl: Hsl): Rgb {
  const h = hsl.h / 360;
  const s = clampPercent(hsl.s) / 100;
  const l = clampPercent(hsl.l) / 100;

  if (s === 0) {
    const gray = clampByte(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: clampByte(hueToRgb(p, q, h + 1 / 3) * 255),
    g: clampByte(hueToRgb(p, q, h) * 255),
    b: clampByte(hueToRgb(p, q, h - 1 / 3) * 255),
  };
}

export function formatRgb(rgb: Rgb): string {
  return `rgb(${clampByte(rgb.r)}, ${clampByte(rgb.g)}, ${clampByte(rgb.b)})`;
}

export function formatHsl(hsl: Hsl): string {
  return `hsl(${Math.round(hsl.h)}, ${Math.round(clampPercent(hsl.s))}%, ${Math.round(clampPercent(hsl.l))}%)`;
}

export function rgbToColorInput(rgb: Rgb): string {
  return rgbToHex(rgb);
}
