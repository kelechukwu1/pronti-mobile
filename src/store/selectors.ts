import { createSelector } from '@reduxjs/toolkit';

import { computeCartTotals, getCartItemCount } from '@/utils/cart';

import type { RootState } from './index';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotals = createSelector([selectCartItems], items =>
  computeCartTotals(items),
);

export const selectCartItemCount = createSelector([selectCartItems], items =>
  getCartItemCount(items),
);

/** Quantity of a specific product currently in the cart (0 if absent). */
export const selectItemQuantity = (id: string) =>
  createSelector([selectCartItems], items => {
    const item = items.find(i => i.id === id);
    return item?.quantity ?? 0;
  });
