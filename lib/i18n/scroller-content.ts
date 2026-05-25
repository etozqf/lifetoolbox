import type { Locale } from "./config";
import type { ScrollerFontFamily } from "@/lib/formulas/text-scroller";

export type ScrollerPreset = {
  label: string;
  text: string;
  bg: string;
  color: string;
  fontSizeScale: number;
  speed: number;
  stageHeight: number;
  fontFamily: ScrollerFontFamily;
  fontWeight: number;
};

export type ScrollerTemplate = { label: string; text: string };

const PRESETS_EN: ScrollerPreset[] = [
  {
    label: "Concert",
    text: "🎵 WE LOVE YOU! 🎵",
    bg: "#000000",
    color: "#ffffff",
    fontSizeScale: 0,
    speed: 50,
    stageHeight: 120,
    fontFamily: "sans",
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
    fontFamily: "sans",
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
    fontFamily: "sans",
    fontWeight: 400,
  },
];

const PRESETS_ZH: ScrollerPreset[] = [
  {
    label: "演唱会",
    text: "🎵 我们爱你！🎵",
    bg: "#000000",
    color: "#ffffff",
    fontSizeScale: 0,
    speed: 50,
    stageHeight: 120,
    fontFamily: "sans",
    fontWeight: 700,
  },
  {
    label: "促销",
    text: "大促销 — 今日全场五折",
    bg: "#ff0000",
    color: "#ffffff",
    fontSizeScale: 0,
    speed: 80,
    stageHeight: 120,
    fontFamily: "sans",
    fontWeight: 700,
  },
  {
    label: "欢迎",
    text: "欢迎参加本次活动！",
    bg: "#1c1917",
    color: "#2ecc9a",
    fontSizeScale: 0,
    speed: 40,
    stageHeight: 160,
    fontFamily: "sans",
    fontWeight: 400,
  },
];

const TEMPLATES_EN: ScrollerTemplate[] = [
  { label: "Default scrolling text", text: "Your scrolling message here" },
  { label: "Thank you", text: "THANK YOU FOR COMING!" },
  { label: "Happy birthday", text: "🎂 HAPPY BIRTHDAY! 🎂" },
];

const TEMPLATES_ZH: ScrollerTemplate[] = [
  { label: "默认滚动文字", text: "在此输入滚动消息" },
  { label: "感谢", text: "感谢光临！" },
  { label: "生日快乐", text: "🎂 生日快乐！🎂" },
];

const FONT_LABELS: Record<ScrollerFontFamily, { en: string; zh: string }> = {
  sans: { en: "Sans-serif", zh: "无衬线" },
  mono: { en: "Monospace", zh: "等宽" },
  serif: { en: "Serif", zh: "衬线" },
};

export function getScrollerPresets(locale: Locale): ScrollerPreset[] {
  return locale === "zh" ? PRESETS_ZH : PRESETS_EN;
}

export function getScrollerTemplates(locale: Locale): ScrollerTemplate[] {
  return locale === "zh" ? TEMPLATES_ZH : TEMPLATES_EN;
}

export function getScrollerDefaultText(locale: Locale): string {
  return locale === "zh" ? "在此输入滚动消息" : "Your scrolling message here";
}

export function getFontFamilyLabel(id: ScrollerFontFamily, locale: Locale): string {
  return FONT_LABELS[id][locale];
}

export function getFontSizeLabel(scale: number, locale: Locale): string {
  if (scale === 0) return locale === "zh" ? "自动" : "Auto";
  return `${scale}%`;
}
