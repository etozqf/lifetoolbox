"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchExchangeRates, formatRatesTimestamp } from "@/lib/api/rates-client";
import {
  COMMON_CURRENCIES,
  convertCurrency,
  formatMoney,
} from "@/lib/formulas/finance";
import { useToolUi } from "@/lib/i18n/use-tool-ui";
import { useLocale } from "@/components/locale-provider";

const CURRENCY_NAMES_ZH: Record<string, string> = {
  USD: "美元",
  EUR: "欧元",
  GBP: "英镑",
  JPY: "日元",
  CNY: "人民币",
  CAD: "加元",
  AUD: "澳元",
  CHF: "瑞士法郎",
  HKD: "港币",
  SGD: "新加坡元",
  KRW: "韩元",
  INR: "印度卢比",
  MXN: "墨西哥比索",
  BRL: "巴西雷亚尔",
  NZD: "新西兰元",
};

function currencyName(code: string, enName: string, locale: string): string {
  return locale === "zh" ? (CURRENCY_NAMES_ZH[code] ?? enName) : enName;
}

export function CurrencyConverterTool() {
  const ui = useToolUi("currency-converter");
  const { locale } = useLocale();
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
      .catch(() => {
        if (!cancelled) setError(ui.failedRates);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [base, ui.failedRates]);

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
      return { code, name: currencyName(code, known?.name ?? code, locale) };
    });
  }, [rates, locale]);

  const displayResult = result !== null ? formatMoney(result, to) : "";
  const numFmt = (n: number) =>
    n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { maximumFractionDigits: 4 });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        {ui.disclaimer}
      </div>

      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.ratesBase}</span>
        <select className="tool-input mt-2" value={base} onChange={(e) => setBase(e.target.value)}>
          {COMMON_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {currencyName(c.code, c.name, locale)}
            </option>
          ))}
        </select>
      </label>

      {loading && <p className="text-sm text-[var(--muted)]">{ui.loadingRates}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {stale && !loading && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          {ui.staleRates.replace("{timestamp}", formatRatesTimestamp(fetchedAt))}
        </p>
      )}
      {!stale && fetchedAt && !loading && (
        <p className="text-xs text-[var(--muted)]">{ui.ratesUpdated.replace("{timestamp}", formatRatesTimestamp(fetchedAt))}</p>
      )}

      <label className="tool-panel block">
        <span className="text-sm font-medium">{ui.amount}</span>
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
          <span className="text-sm font-medium">{ui.from}</span>
          <select className="tool-input mt-2" value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencyOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn-secondary h-10 px-4" onClick={swap} aria-label={ui.swap}>
          ⇄
        </button>
        <label className="tool-panel block">
          <span className="text-sm font-medium">{ui.to}</span>
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
            {ui.equals.replace("{amount}", amount || "0").replace("{from}", from)}
          </p>
          <p className="result-value text-2xl font-semibold">{displayResult}</p>
          {rates[from] && rates[to] && (
            <p className="mt-2 text-xs text-[var(--muted)]">
              {ui.rateLine
                .replace("{from}", from)
                .replace("{rate}", numFmt(rates[to] / rates[from]))
                .replace("{to}", to)}
            </p>
          )}
        </div>
      )}

      <p className="text-xs text-[var(--muted)]">{ui.footer}</p>
    </div>
  );
}
