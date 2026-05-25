export type ScrollDirection = "left" | "right" | "up" | "down";

export function scrollDurationSeconds(speed: number): number {
  // speed 1 (slow) → 40s, speed 100 (fast) → 4s
  const clamped = Math.min(100, Math.max(1, speed));
  return 40 - (clamped / 100) * 36;
}

export const SCROLLER_PRESETS = [
  { label: "Concert", text: "🎵 WE LOVE YOU! 🎵", bg: "#000000", color: "#ff6b4a", size: 48, speed: 60 },
  { label: "Sale", text: "BIG SALE — 50% OFF TODAY ONLY", bg: "#ff0000", color: "#ffffff", size: 40, speed: 70 },
  { label: "Welcome", text: "Welcome to our event!", bg: "#1c1917", color: "#2ecc9a", size: 36, speed: 50 },
] as const;
