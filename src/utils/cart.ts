import { fromCents, toCents } from "./currency";

import type { CartItem, CartTotals } from "@/types";

/** Tax rate applied to the cart subtotal (assignment §14). */
export const TAX_RATE = 0.1;

/**
 * Compute cart totals from items (assignment §14). Derived values are never
 * stored in Redux (assignment §13) — they're computed here on read.
 *
 * subtotal = Σ(price × quantity), tax = subtotal × 10%, total = subtotal + tax.
 * Summation is done in integer cents to avoid floating-point drift.
 */
export function computeCartTotals(items: CartItem[]): CartTotals {
  const subtotalCents = items.reduce(
    (sum, item) => sum + toCents(item.price) * item.quantity,
    0,
  );
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  return {
    subtotal: fromCents(subtotalCents),
    tax: fromCents(taxCents),
    total: fromCents(totalCents),
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
  };
}

/** Total number of units in the cart — used for the nav badge (assignment §15). */
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
