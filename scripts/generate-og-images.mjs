import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/og-images");
const BRAND = "#ff6b4a";
const BRAND_DARK = "#e85a3a";
const ACCENT = "#2ecc9a";
const BG = "#fff0ed";

const cards = [
  { id: "default", title: "LifeToolbox", subtitle: "Free everyday online tools" },
  { id: "calc", title: "Calculators", subtitle: "Tip · Bill split · Percentage" },
  { id: "health", title: "Health & Fitness", subtitle: "BMI · Calories · Water intake" },
  { id: "date", title: "Date & Age", subtitle: "Age · Countdown · Workdays" },
  { id: "convert", title: "Unit Converters", subtitle: "Length · Weight · Temperature" },
  { id: "random", title: "Random & Decision", subtitle: "Dice · Wheel · Name picker" },
  { id: "social", title: "Social Text", subtitle: "Character counter for social posts" },
  { id: "kitchen", title: "Kitchen & Cooking", subtitle: "Recipe scaler · Oven temps" },
  { id: "image", title: "Image Tools", subtitle: "Compress · Resize · QR codes" },
  { id: "pdf", title: "PDF Tools", subtitle: "Merge & split PDF files" },
  { id: "finance", title: "Finance", subtitle: "Currency · Mortgage · Compound interest" },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function svgFor(title, subtitle) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BG}"/>
      <stop offset="100%" style="stop-color:#ffffff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="540" width="1200" height="90" fill="${BRAND}" opacity="0.12"/>
  <circle cx="1050" cy="120" r="140" fill="${ACCENT}" opacity="0.15"/>
  <circle cx="150" cy="520" r="100" fill="${BRAND}" opacity="0.18"/>
  <rect x="80" y="80" width="72" height="72" rx="16" fill="${BRAND}"/>
  <text x="116" y="128" text-anchor="middle" fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="36" font-weight="700">LT</text>
  <text x="180" y="115" fill="${BRAND_DARK}" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="600">LifeToolbox</text>
  <text x="180" y="200" fill="#1c1917" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="700">${escapeXml(title)}</text>
  <text x="180" y="280" fill="#78716c" font-family="Arial,Helvetica,sans-serif" font-size="32">${escapeXml(subtitle)}</text>
  <text x="180" y="560" fill="${BRAND}" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="600">life.hottoolsbox.com</text>
</svg>`;
}

fs.mkdirSync(OUT, { recursive: true });

for (const card of cards) {
  const svg = svgFor(card.title, card.subtitle);
  const outPath = path.join(OUT, `${card.id}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log("wrote", outPath);
}
