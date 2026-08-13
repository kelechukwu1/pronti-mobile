import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { OrderState, PlaceOrderPayload } from '@/types';

const initialState: OrderState = {
  placing: false,
  lastOrderId: null,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, _action: PayloadAction<PlaceOrderPayload>) => {
      state.placing = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action: PayloadAction<string>) => {
      state.placing = false;
      state.lastOrderId = action.payload;
      state.error = null;
    },
    placeOrderFailure: (state, action: PayloadAction<string>) => {
      state.placing = false;
      state.error = action.payload;
    },
    clearOrderError: state => {
      state.error = null;
    },
  },
});

export const {
  placeOrder,
  placeOrderSuccess,
  placeOrderFailure,
  clearOrderError,
} = orderSlice.actions;

export default orderSlice.reducer;
