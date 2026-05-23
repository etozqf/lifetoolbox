export function rollDice(count: number, sides: number): number[] | { error: string } {
  if (count < 1 || count > 20) return { error: "Roll 1–20 dice" };
  if (sides < 2 || sides > 100) return { error: "Sides must be 2–100" };
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  return rolls;
}

export function pickRandomName(names: string[]): string | { error: string } {
  const trimmed = names.map((n) => n.trim()).filter(Boolean);
  if (trimmed.length === 0) return { error: "Add at least one name" };
  return trimmed[Math.floor(Math.random() * trimmed.length)];
}

export function pickRandomOption(options: string[]): string | { error: string } {
  return pickRandomName(options);
}

export type CharCountResult = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  sentences: number;
};

export function countCharacters(text: string): CharCountResult {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split(/\n/).length : 0;
  const sentences = text.trim()
    ? (text.match(/[^.!?]+[.!?]+/g) ?? [text.trim()]).length
    : 0;
  return { characters, charactersNoSpaces, words, lines, sentences };
}

export const SOCIAL_LIMITS = [
  { platform: "Twitter / X", limit: 280 },
  { platform: "Instagram caption", limit: 2200 },
  { platform: "Facebook post", limit: 63206 },
  { platform: "LinkedIn post", limit: 3000 },
  { platform: "SMS", limit: 160 },
] as const;
