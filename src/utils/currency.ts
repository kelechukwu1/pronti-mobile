/**
 * Currency helpers (assignment §14). Money is summed in integer cents to avoid
 * floating-point display artefacts (e.g. 0.1 + 0.2 !== 0.3), then formatted.
 */

/** Convert a decimal amount (dollars) to integer cents, rounded safely. */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

/** Convert integer cents back to a decimal amount (dollars). */
export function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Format a decimal amount as USD, e.g. 99.9 → "$99.90".
 * Uses Intl when available (Hermes ships it), with a manual fallback so tests
 * and older runtimes never crash.
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(safe);
  } catch {
    return `$${safe.toFixed(2)}`;
  }
}
