import reducer, {
  addItem,
  clearCart,
  decrementQty,
  hydrateCart,
  incrementQty,
  removeItem,
  setQty,
} from "@/store/slices/cartSlice";

import type { CartItem, Product } from "@/types";

const product = (over: Partial<Product> = {}): Product => ({
  id: "p1",
  name: "Widget",
  price: 9.99,
  image: "img",
  description: "A widget",
  category: "tools",
  inStock: true,
  ...over,
});

describe("cartSlice (assignment §13)", () => {
  it("adds a new item at quantity 1, storing only row fields", () => {
    const state = reducer(undefined, addItem(product()));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      id: "p1",
      name: "Widget",
      price: 9.99,
      image: "img",
      quantity: 1,
    });
    // Non-row / derived fields must never be persisted in cart state.
    expect(state.items[0]).not.toHaveProperty("inStock");
    expect(state.items[0]).not.toHaveProperty("description");
    expect(state.items[0]).not.toHaveProperty("category");
  });

  it("bumps quantity when the same product is added again", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, addItem(product()));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("increments and decrements quantity", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, incrementQty("p1"));
    expect(state.items[0].quantity).toBe(2);
    state = reducer(state, decrementQty("p1"));
    expect(state.items[0].quantity).toBe(1);
  });

  it("removes the line when decrementing below the minimum", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, decrementQty("p1"));
    expect(state.items).toHaveLength(0);
  });

  it("clamps quantity to the maximum of 99", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, setQty({ id: "p1", quantity: 500 }));
    expect(state.items[0].quantity).toBe(99);
  });

  it("removes the line when setQty drops below 1", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, setQty({ id: "p1", quantity: 0 }));
    expect(state.items).toHaveLength(0);
  });

  it("removes a specific item", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, addItem(product({ id: "p2", name: "Gadget" })));
    state = reducer(state, removeItem("p1"));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("p2");
  });

  it("clears the whole cart", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, addItem(product({ id: "p2" })));
    state = reducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });

  it("hydrates from persisted items", () => {
    const items: CartItem[] = [
      { id: "x", name: "X", price: 1, image: "i", quantity: 2 },
    ];
    const state = reducer(undefined, hydrateCart(items));
    expect(state.items).toEqual(items);
  });

  it("ignores increment/decrement for unknown ids", () => {
    let state = reducer(undefined, addItem(product()));
    state = reducer(state, incrementQty("missing"));
    state = reducer(state, decrementQty("missing"));
    expect(state.items[0].quantity).toBe(1);
  });
});
