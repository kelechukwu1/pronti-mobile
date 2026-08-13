import { call, put, takeLatest } from 'redux-saga/effects';

import { ENVIRONMENT } from '@/config';
import { MESSAGES } from '@/constants/messages';
import { navigate } from '@/navigation/navigationRef';
import { delay, pickOne, rollFailure } from '@/services/mock';
import { toast } from '@/services/toast';

import { clearCart } from '../slices/cartSlice';
import {
  placeOrder,
  placeOrderFailure,
  placeOrderSuccess,
} from '../slices/orderSlice';

import type { OrderFailureReason } from '@/types';

// Order placement takes 2–3s
const ORDER_MIN_MS = 2000;
const ORDER_MAX_MS = 3000;

const FAILURE_REASONS: OrderFailureReason[] = [
  'NETWORK_TIMEOUT',
  'PAYMENT_PROCESSING',
  'ORDER_API',
];

function messageForReason(reason: OrderFailureReason): string {
  switch (reason) {
    case 'NETWORK_TIMEOUT':
      return MESSAGES.order.failureNetworkTimeout;
    case 'PAYMENT_PROCESSING':
      return MESSAGES.order.failurePayment;
    case 'ORDER_API':
    default:
      return MESSAGES.order.failureApi;
  }
}

/** Exported for unit testing; run by the watcher below. */
export function* handlePlaceOrder(): Generator<unknown, void, unknown> {
  const ms =
    ORDER_MIN_MS + Math.floor(Math.random() * (ORDER_MAX_MS - ORDER_MIN_MS));
  yield call(delay, ms);

  // Randomly fail ~10% of the time with a specific, user-friendly reason
  if (rollFailure(ENVIRONMENT.MOCK.ORDER_FAILURE_RATE)) {
    const reason = pickOne(FAILURE_REASONS);
    const message = messageForReason(reason);
    yield put(placeOrderFailure(message));
    toast.error(message);
    return;
  }

  const orderId = `ORD-${Date.now()}`;
  yield put(placeOrderSuccess(orderId));
  yield put(clearCart());
  toast.success(MESSAGES.order.success);

  // Return to the Dashboard after a successful order
  yield call(navigate, 'Dashboard');
}

export function* orderSaga() {
  yield takeLatest(placeOrder.type, handlePlaceOrder);
}
