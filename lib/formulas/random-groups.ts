export type GroupMode = "groupCount" | "groupSize";

export type RandomGroupsError = "noNames" | "invalidCount" | "invalidSize";

export function parseNames(input: string): string[] {
  return input
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function fisherYatesShuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function splitIntoGroups(
  names: string[],
  mode: GroupMode,
  value: number
): { ok: true; groups: string[][] } | { ok: false; error: RandomGroupsError } {
  if (names.length === 0) {
    return { ok: false, error: "noNames" };
  }

  const shuffled = fisherYatesShuffle(names);

  if (mode === "groupCount") {
    const groupCount = Math.floor(value);
    if (groupCount < 1) {
      return { ok: false, error: "invalidCount" };
    }

    const groups: string[][] = Array.from({ length: groupCount }, () => []);
    shuffled.forEach((name, index) => {
      groups[index % groupCount].push(name);
    });
    return { ok: true, groups };
  }

  const groupSize = Math.floor(value);
  if (groupSize < 1) {
    return { ok: false, error: "invalidSize" };
  }

  const groups: string[][] = [];
  for (let i = 0; i < shuffled.length; i += groupSize) {
    groups.push(shuffled.slice(i, i + groupSize));
  }
  return { ok: true, groups };
}
