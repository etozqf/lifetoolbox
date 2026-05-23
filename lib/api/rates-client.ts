export type RatesResponse = {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
  stale: boolean;
  source: string;
};

export function getRatesApiUrl(base = "USD"): string {
  const root = process.env.NEXT_PUBLIC_RATES_API_URL ?? "/api/rates";
  const sep = root.includes("?") ? "&" : "?";
  return `${root}${sep}base=${encodeURIComponent(base)}`;
}

export async function fetchExchangeRates(base = "USD"): Promise<RatesResponse> {
  const res = await fetch(getRatesApiUrl(base), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(res.status === 429 ? "Too many requests. Please wait a minute." : "Failed to load rates");
  }
  return res.json() as Promise<RatesResponse>;
}

export function formatRatesTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}
