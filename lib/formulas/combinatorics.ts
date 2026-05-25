export const MAX_COMBINATORICS_N = 170;

export type CombinatoricsError =
  | "invalidInput"
  | "nLessThanR"
  | "negative"
  | "tooLarge";

export type CombinatoricsResult =
  | { ok: true; permutation: bigint; combination: bigint }
  | { ok: false; error: CombinatoricsError };

function factorial(n: number): bigint {
  let result = BigInt(1);
  for (let i = BigInt(2); i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

export function calcPermutationCombination(n: number, r: number): CombinatoricsResult {
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    return { ok: false, error: "invalidInput" };
  }
  if (n < 0 || r < 0) {
    return { ok: false, error: "negative" };
  }
  if (n > MAX_COMBINATORICS_N) {
    return { ok: false, error: "tooLarge" };
  }
  if (r > n) {
    return { ok: false, error: "nLessThanR" };
  }

  const nFact = factorial(n);
  const rFact = factorial(r);
  const nMinusRFact = factorial(n - r);

  return {
    ok: true,
    permutation: nFact / nMinusRFact,
    combination: nFact / (rFact * nMinusRFact),
  };
}
