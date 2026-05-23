"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchExchangeRates, formatRatesTimestamp } from "@/lib/api/rates-client";
import {
  COMMON_CURRENCIES,
  convertCurrency,
  formatMoney,
} from "@/lib/formulas/finance";

export function CurrencyConverterTool() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [fetchedAt, setFetchedAt] = useState("");
  const [stale, setStale] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchExchangeRates(base)
      .then((data) => {
        if (cancelled) return;
        setRates(data.rates);
        setFetchedAt(data.fetchedAt);
        setStale(data.stale);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load rates");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [base]);

  const result = useMemo(() => {
    const n = parseFloat(amount) || 0;
    const rateFrom = rates[from] ?? (from === base ? 1 : 0);
    const rateTo = rates[to] ?? (to === base ? 1 : 0);
    if (!rateFrom || !rateTo) return null;
    return convertCurrency(n, rateFrom, rateTo);
  }, [amount, from, to, rates, base]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const currencyOptions = useMemo(() => {
    const codes = new Set([...COMMON_CURRENCIES.map((c) => c.code), ...Object.keys(rates)]);
    return [...codes].sort().map((code) => {
      const known = COMMON_CURRENCIES.find((c) => c.code === code);
      return { code, name: known?.name ?? code };
    });
  }, [rates]);

  const displayResult = result !== null ? formatMoney(result, to) : "";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        Exchange rates are indicative only. Not for trading decisions.
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">Rates base currency</span>
        <select className="tool-input mt-2" value={base} onChange={(e) => setBase(e.target.value)}>
          {COMMON_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.name}
            </option>
          ))}
        </select>
      </label>

      {loading && <p className="text-sm text-[var(--muted)]">Loading exchange rates…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {stale && !loading && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Rates may be outdated. Last update: {formatRatesTimestamp(fetchedAt)}
        </p>
      )}
      {!stale && fetchedAt && !loading && (
        <p className="text-xs text-[var(--muted)]">Rates updated: {formatRatesTimestamp(fetchedAt)}</p>
      )}

      <label className="tool-panel block">
        <span className="text-sm font-medium">Amount</span>
        <input
          type="number"
          min="0"
          step="any"
          className="tool-input mt-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="tool-panel block">
          <span className="text-sm font-medium">From</span>
          <select className="tool-input mt-2" value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencyOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn-secondary h-10 px-4" onClick={swap} aria-label="Swap currencies">
          ⇄
        </button>
        <label className="tool-panel block">
          <span className="text-sm font-medium">To</span>
          <select className="tool-input mt-2" value={to} onChange={(e) => setTo(e.target.value)}>
            {currencyOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result !== null && !loading && (
        <div className="result-card">
          <p className="text-sm text-[var(--muted)]">
            {amount || 0} {from} =
          </p>
          <p className="result-value text-2xl font-semibold">{displayResult}</p>
          {rates[from] && rates[to] && (
            <p className="mt-2 text-xs text-[var(--muted)]">
              1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}
            </p>
          )}
        </div>
      )}

      <p className="text-xs text-[var(--muted)]">
        Exchange rates are fetched via our server proxy; conversion math runs in your browser.
      </p>
    </div>
  );
}
