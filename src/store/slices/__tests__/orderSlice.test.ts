import reducer, {
  clearOrderError,
  placeOrder,
  placeOrderFailure,
  placeOrderSuccess,
} from "@/store/slices/orderSlice";

describe("orderSlice", () => {
  it("sets placing and clears the error on placeOrder", () => {
    const state = reducer(undefined, placeOrder({ items: [] }));
    expect(state.placing).toBe(true);
    expect(state.error).toBeNull();
  });

  it("records the order id and stops placing on success", () => {
    let state = reducer(undefined, placeOrder({ items: [] }));
    state = reducer(state, placeOrderSuccess("ORD-123"));
    expect(state.placing).toBe(false);
    expect(state.lastOrderId).toBe("ORD-123");
    expect(state.error).toBeNull();
  });

  it("stores the error and stops placing on failure", () => {
    let state = reducer(undefined, placeOrder({ items: [] }));
    state = reducer(state, placeOrderFailure("Payment failed"));
    expect(state.placing).toBe(false);
    expect(state.error).toBe("Payment failed");
  });

  it("clears the order error", () => {
    let state = reducer(undefined, placeOrderFailure("Payment failed"));
    state = reducer(state, clearOrderError());
    expect(state.error).toBeNull();
  });
});
