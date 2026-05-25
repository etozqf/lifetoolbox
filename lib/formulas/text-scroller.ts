export type ScrollDirection = "left" | "right" | "up" | "down";

export type ScrollerFontFamily = "sans" | "mono" | "serif";

export const FONT_FAMILIES: { id: ScrollerFontFamily; label: string; css: string }[] = [
  { id: "sans", label: "Sans-serif", css: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
  { id: "mono", label: "Monospace", css: 'ui-monospace, "Cascadia Code", monospace' },
  { id: "serif", label: "Serif", css: 'Georgia, "Times New Roman", serif' },
];

/** px/s → animation duration from travel distance in pixels */
export function scrollDurationFromSpeed(travelPx: number, speedPxPerSec: number): number {
  const speed = Math.max(10, Math.min(500, speedPxPerSec));
  const distance = Math.max(200, travelPx);
  return distance / speed;
}

/**
 * Font size scale: 0 = auto (fill display height; computed in the component).
 * 1–100 = percentage of display height (not px).
 */
export function fontSizeLabel(scale: number): string {
  if (scale === 0) return "Auto";
  return `${scale}%`;
}

export function fontSizeCss(scale: number): string {
  return `${Math.min(100, Math.max(10, scale))}cqh`;
}

/** Fit text line-height to a target container height (measured at 10px baseline). */
export function computeAutoFontSizePx(
  containerHeightPx: number,
  textHeightAt10Px: number,
  fillRatio = 0.98
): number {
  const target = Math.max(12, containerHeightPx * fillRatio);
  if (textHeightAt10Px <= 0) return target;
  return (10 * target) / textHeightAt10Px;
}

export const SCROLLER_PRESETS = [
  {
    label: "Concert",
    text: "🎵 WE LOVE YOU! 🎵",
    bg: "#000000",
    color: "#ffffff",
    fontSizeScale: 0,
    speed: 50,
    stageHeight: 120,
    fontFamily: "sans" as ScrollerFontFamily,
    fontWeight: 700,
  },
  {
    label: "Sale",
    text: "BIG SALE — 50% OFF TODAY ONLY",
    bg: "#ff0000",
    color: "#ffffff",
    fontSizeScale: 0,
    speed: 80,
    stageHeight: 120,
    fontFamily: "sans" as ScrollerFontFamily,
    fontWeight: 700,
  },
  {
    label: "Welcome",
    text: "Welcome to our event!",
    bg: "#1c1917",
    color: "#2ecc9a",
    fontSizeScale: 0,
    speed: 40,
    stageHeight: 160,
    fontFamily: "sans" as ScrollerFontFamily,
    fontWeight: 400,
  },
] as const;

export const TEMPLATE_OPTIONS = [
  { label: "Default scrolling text", text: "Your scrolling message here" },
  { label: "Thank you", text: "THANK YOU FOR COMING!" },
  { label: "Happy birthday", text: "🎂 HAPPY BIRTHDAY! 🎂" },
] as const;
