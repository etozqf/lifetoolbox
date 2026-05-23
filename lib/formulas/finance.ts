import Decimal from "decimal.js";

export type MortgageResult = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
};

/** Standard amortizing loan: fixed monthly payment */
export function calcMortgage(
  principal: number,
  annualRatePercent: number,
  years: number
): MortgageResult | null {
  if (principal <= 0 || years <= 0 || annualRatePercent < 0) return null;

  const n = years * 12;
  const P = new Decimal(principal);

  if (annualRatePercent === 0) {
    const monthly = P.div(n);
    const total = P;
    return {
      monthlyPayment: monthly.toNumber(),
      totalPayment: total.toNumber(),
      totalInterest: 0,
      principal,
    };
  }

  const r = new Decimal(annualRatePercent).div(100).div(12);
  const onePlusR = r.plus(1);
  const factor = onePlusR.pow(n);
  const monthly = P.times(r).times(factor).div(factor.minus(1));

  const totalPayment = monthly.times(n);
  const totalInterest = totalPayment.minus(P);

  return {
    monthlyPayment: monthly.toDecimalPlaces(2).toNumber(),
    totalPayment: totalPayment.toDecimalPlaces(2).toNumber(),
    totalInterest: totalInterest.toDecimalPlaces(2).toNumber(),
    principal,
  };
}

export type CompoundInterestResult = {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
};

/** Compound interest with optional monthly contributions */
export function calcCompoundInterest(
  principal: number,
  annualRatePercent: number,
  years: number,
  monthlyContribution = 0,
  compoundsPerYear = 12
): CompoundInterestResult | null {
  if (principal < 0 || years <= 0 || annualRatePercent < 0 || monthlyContribution < 0) return null;
  if (compoundsPerYear <= 0) return null;

  const P = new Decimal(principal);
  const r = new Decimal(annualRatePercent).div(100);
  const n = compoundsPerYear;
  const t = new Decimal(years);
  const PMT = new Decimal(monthlyContribution);

  // FV = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)] * (n/12) adjustment
  // Monthly contributions: compound each month at monthly rate
  const monthlyRate = r.div(12);
  const months = t.times(12).toNumber();

  let balance = P;
  for (let i = 0; i < months; i++) {
    balance = balance.times(monthlyRate.plus(1)).plus(PMT);
  }

  const totalContributions = P.plus(PMT.times(months));
  const futureValue = balance;
  const totalInterest = futureValue.minus(totalContributions);

  return {
    futureValue: futureValue.toDecimalPlaces(2).toNumber(),
    totalContributions: totalContributions.toDecimalPlaces(2).toNumber(),
    totalInterest: totalInterest.toDecimalPlaces(2).toNumber(),
  };
}

export function formatMoney(n: number, currency = "USD"): string {
  return n.toLocaleString("en-US", { style: "currency", currency, maximumFractionDigits: 2 });
}

export const COMMON_CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "KRW", name: "South Korean Won" },
  { code: "INR", name: "Indian Rupee" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "THB", name: "Thai Baht" },
  { code: "ZAR", name: "South African Rand" },
  { code: "AED", name: "UAE Dirham" },
] as const;

export function convertCurrency(
  amount: number,
  rateFromBase: number,
  rateToBase: number
): number {
  if (amount < 0 || rateFromBase <= 0 || rateToBase <= 0) return 0;
  const inBase = new Decimal(amount).div(rateFromBase);
  return inBase.times(rateToBase).toDecimalPlaces(4).toNumber();
}
