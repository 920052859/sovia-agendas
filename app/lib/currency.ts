export type Currency = "USD" | "PEN";

// Approximate reference rate for on-site display only. Real charges in PEN
// go through the Mercado Pago integration, which can use its own live rate.
export const USD_TO_PEN = 3.75;

export function convert(amountUsd: number, currency: Currency): number {
  return currency === "PEN" ? amountUsd * USD_TO_PEN : amountUsd;
}

export function formatPrice(amountUsd: number, currency: Currency, locale: string): string {
  const value = convert(amountUsd, currency);
  const rounded = currency === "PEN" ? Math.round(value) : Math.round(value * 100) / 100;
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-PE", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "PEN" ? 0 : 2,
    maximumFractionDigits: currency === "PEN" ? 0 : 2,
  }).format(rounded);
}
