import type { CartItem } from './cart';

export interface OrderState {
  placing: boolean;
  lastOrderId: string | null;
  error: string | null;
}

/** Distinct failure modes the mock order flow can simulate */
export type OrderFailureReason =
  | 'NETWORK_TIMEOUT'
  | 'PAYMENT_PROCESSING'
  | 'ORDER_API';

/** Payload dispatched to place an order — the current cart snapshot. */
export interface PlaceOrderPayload {
  items: CartItem[];
}

export interface OrderResult {
  orderId: string;
}
