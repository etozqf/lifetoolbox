/**
 * Exchange rate proxy for Cloudflare Pages Functions.
 * Spec: 1h cache, 20 req/min/IP, 5s upstream timeout, stale fallback.
 */

const CACHE_TTL_SEC = 3600;
const RATE_LIMIT_PER_MIN = 20;
const UPSTREAM_TIMEOUT_MS = 5000;
const UPSTREAM_URL = "https://open.er-api.com/v6/latest";

type RatesPayload = {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
  stale: boolean;
  source: string;
};

type EventContext = {
  request: Request;
  waitUntil: (promise: Promise<unknown>) => void;
};

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function isRateLimited(ip: string, cache: Cache): Promise<boolean> {
  const minute = Math.floor(Date.now() / 60000);
  const ipHash = await hashIp(ip);
  const key = new Request(`https://ratelimit.internal/${ipHash}/${minute}`);
  const hit = await cache.match(key);
  const count = hit ? parseInt(await hit.text(), 10) + 1 : 1;
  if (count > RATE_LIMIT_PER_MIN) return true;
  await cache.put(
    key,
    new Response(String(count), { headers: { "Cache-Control": "max-age=60" } })
  );
  return false;
}

function jsonResponse(body: RatesPayload, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${CACHE_TTL_SEC}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      ...extraHeaders,
    },
  });
}

async function fetchUpstream(base: string): Promise<RatesPayload> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const res = await fetch(`${UPSTREAM_URL}/${encodeURIComponent(base)}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = (await res.json()) as {
      result?: string;
      base_code?: string;
      rates?: Record<string, number>;
      time_last_update_unix?: number;
    };
    if (data.result !== "success" || !data.rates) throw new Error("Invalid upstream payload");
    return {
      base: data.base_code ?? base,
      rates: data.rates,
      fetchedAt: data.time_last_update_unix
        ? new Date(data.time_last_update_unix * 1000).toISOString()
        : new Date().toISOString(),
      stale: false,
      source: "open.er-api.com",
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function onRequest(context: EventContext): Promise<Response> {
  const { request } = context;
  const cache = caches.default;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  }

  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(request.url);
  const base = (url.searchParams.get("base") ?? "USD").toUpperCase().slice(0, 3);

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (await isRateLimited(ip, cache)) {
    return jsonResponse(
      {
        base,
        rates: {},
        fetchedAt: new Date().toISOString(),
        stale: true,
        source: "rate-limited",
      },
      429
    );
  }

  const cacheKey = new Request(`https://cache.internal/rates/${base}`);
  const cached = await cache.match(cacheKey);

  try {
    const fresh = await fetchUpstream(base);
    const ipHash = await hashIp(ip);
    console.log(JSON.stringify({ event: "rates_fetch", ipHash, base, ts: Date.now() }));

    const response = jsonResponse(fresh);
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    console.error(JSON.stringify({ event: "rates_error", base, message: String(err) }));
    if (cached) {
      const staleBody = (await cached.json()) as RatesPayload;
      return jsonResponse({ ...staleBody, stale: true });
    }
    return jsonResponse(
      {
        base,
        rates: { [base]: 1 },
        fetchedAt: new Date().toISOString(),
        stale: true,
        source: "fallback",
      },
      503
    );
  }
}
