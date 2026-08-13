import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

/** Minimum/maximum units allowed per line item. */
const MIN_QTY = 1;
const MAX_QTY = 99;

const clampQty = (qty: number): number =>
  Math.max(MIN_QTY, Math.min(MAX_QTY, Math.floor(qty)));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /** Add a product, or bump quantity if it's already in the cart. */
    addItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity = clampQty(existing.quantity + 1);
        state.isHydrated = true;
        return;
      }
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      state.isHydrated = true;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.isHydrated = true;
    },

    incrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity = clampQty(item.quantity + 1);
      state.isHydrated = true;
    },

    /** Decrement quantity; removes the line entirely when it drops below 1. */
    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return;
      if (item.quantity <= MIN_QTY) {
        state.items = state.items.filter(i => i.id !== action.payload);
      } else {
        item.quantity = clampQty(item.quantity - 1);
      }
      state.isHydrated = true;
    },

    setQty: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      if (quantity < MIN_QTY) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        item.quantity = clampQty(quantity);
      }
      state.isHydrated = true;
    },

    clearCart: state => {
      state.items = [];
      state.isHydrated = true;
    },

    /** Replace the whole cart — used to hydrate persisted state on boot. */
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isHydrated = true;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQty,
  decrementQty,
  setQty,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
