import { runSaga } from "redux-saga";

// Mock the async/randomness helpers so the saga runs instantly and
// deterministically — no real timers, no flaky random failures.
jest.mock("@/services/mock", () => ({
  delay: jest.fn(() => Promise.resolve()),
  randomLatency: jest.fn(() => 0),
  rollFailure: jest.fn(() => false),
  pickOne: jest.fn((items: unknown[]) => items[0]),
}));

import { rollFailure } from "@/services/mock";
import { clearCart } from "@/store/slices/cartSlice";
import {
  placeOrderFailure,
  placeOrderSuccess,
} from "@/store/slices/orderSlice";
import { handlePlaceOrder } from "@/store/sagas/orderSaga";

import type { Action } from "@reduxjs/toolkit";

async function runHandler(): Promise<Action[]> {
  const dispatched: Action[] = [];
  await runSaga(
    {
      dispatch: (action: Action) => {
        dispatched.push(action);
      },
      getState: () => ({}),
    },
    handlePlaceOrder,
  ).toPromise();
  return dispatched;
}

describe("orderSaga (assignment §16)", () => {
  afterEach(() => jest.clearAllMocks());

  it("on success: dispatches placeOrderSuccess and clears the cart", async () => {
    (rollFailure as jest.Mock).mockReturnValue(false);

    const dispatched = await runHandler();
    const types = dispatched.map((a) => a.type);

    expect(types).toContain(placeOrderSuccess.type);
    expect(types).toContain(clearCart.type);
    expect(types).not.toContain(placeOrderFailure.type);
  });

  it("on failure: dispatches placeOrderFailure and does not clear the cart", async () => {
    (rollFailure as jest.Mock).mockReturnValue(true);

    const dispatched = await runHandler();
    const types = dispatched.map((a) => a.type);

    expect(types).toContain(placeOrderFailure.type);
    expect(types).not.toContain(placeOrderSuccess.type);
    expect(types).not.toContain(clearCart.type);
  });

  it("emits a non-empty, user-friendly failure message (never a raw error)", async () => {
    (rollFailure as jest.Mock).mockReturnValue(true);

    const dispatched = await runHandler();
    const failure = dispatched.find(
      (a) => a.type === placeOrderFailure.type,
    ) as { payload: string } | undefined;

    expect(failure).toBeDefined();
    expect(typeof failure?.payload).toBe("string");
    expect(failure?.payload.length).toBeGreaterThan(0);
    expect(failure?.payload).not.toMatch(/error:/i);
  });
});
