import { computeCartTotals, getCartItemCount, TAX_RATE } from "@/utils/cart";
import { formatCurrency, fromCents, toCents } from "@/utils/currency";

import type { CartItem } from "@/types";

const item = (over: Partial<CartItem> = {}): CartItem => ({
  id: "1",
  name: "Item",
  price: 10,
  image: "img",
  quantity: 1,
  ...over,
});

describe("cart totals (assignment §14)", () => {
  it("uses a 10% tax rate", () => {
    expect(TAX_RATE).toBe(0.1);
  });

  it("computes subtotal, 10% tax, total and item count", () => {
    const totals = computeCartTotals([
      item({ id: "a", price: 10, quantity: 2 }), // 20.00
      item({ id: "b", price: 5, quantity: 1 }), //  5.00
    ]);
    expect(totals.subtotal).toBe(25);
    expect(totals.tax).toBe(2.5);
    expect(totals.total).toBe(27.5);
    expect(totals.itemCount).toBe(3);
  });

  it("returns zeros for an empty cart", () => {
    expect(computeCartTotals([])).toEqual({
      subtotal: 0,
      tax: 0,
      total: 0,
      itemCount: 0,
    });
  });

  it("avoids floating-point drift (0.1 + 0.2 must equal 0.3)", () => {
    const totals = computeCartTotals([
      item({ id: "a", price: 0.1, quantity: 1 }),
      item({ id: "b", price: 0.2, quantity: 1 }),
    ]);
    // A naive float sum would give 0.30000000000000004.
    expect(totals.subtotal).toBe(0.3);
  });

  it("handles fractional prices without rounding errors in the total", () => {
    const totals = computeCartTotals([item({ price: 19.99, quantity: 3 })]);
    expect(totals.subtotal).toBe(59.97);
    expect(totals.tax).toBe(6); // round(5.997) cents-wise → 599.7 → 600c
    expect(totals.total).toBe(65.97);
  });

  it("counts every unit for the nav badge (assignment §15)", () => {
    const count = getCartItemCount([
      item({ id: "1", quantity: 3 }),
      item({ id: "2", quantity: 2 }),
    ]);
    expect(count).toBe(5);
    expect(getCartItemCount([])).toBe(0);
  });
});

describe("currency helpers (assignment §14)", () => {
  it("formats amounts as USD", () => {
    expect(formatCurrency(99.9)).toBe("$99.90");
    expect(formatCurrency(0)).toBe("$0.00");
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("round-trips dollars through integer cents", () => {
    expect(toCents(19.99)).toBe(1999);
    expect(fromCents(1999)).toBe(19.99);
    expect(fromCents(toCents(0.1) + toCents(0.2))).toBe(0.3);
  });
});
