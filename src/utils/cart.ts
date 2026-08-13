import { fromCents, toCents } from './currency';

import type { CartItem, CartTotals } from '@/types';

export const TAX_RATE = 0.1;

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

/** Total number of units in the cart — used for the nav badge */
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
