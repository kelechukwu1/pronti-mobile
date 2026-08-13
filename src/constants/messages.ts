/**
 * Centralized user-facing copy (assignment §21). Keeping strings here keeps
 * messages consistent, avoids leaking technical details/stack traces, and makes
 * error handling testable. Grouped by domain.
 */
export const MESSAGES = {
  auth: {
    phoneRequired: "Please enter your phone number",
    // Exact wording required by the assignment (§8).
    phoneInvalid: "Please enter a valid 10-digit phone number",
    otpRequired: "Please enter the code we sent you",
    otpInvalidLength: "Enter the 4–6 digit code",
    // Exact wording required by the assignment (§8).
    otpIncorrect: "Invalid OTP. Please try again.",
    otpSent: "Verification code sent",
    networkError: "Network error. Please check your connection and try again.",
    genericError: "We couldn't sign you in. Please try again.",
  },
  dashboard: {
    loadFailed: "We couldn't load products. Pull down to try again.",
    empty: "No products available right now.",
    offline: "You're offline. Showing what we have — reconnect to refresh.",
    addedToCart: "Added to cart",
    outOfStock: "This item is out of stock.",
  },
  cart: {
    empty: "Your cart is empty",
    emptySubtitle: "Browse the dashboard and add items to get started.",
    updateFailed: "We couldn't update your cart. Please try again.",
  },
  order: {
    emptyCart: "Add an item to your cart before placing an order.",
    // Exact wording required by the assignment (§16).
    success: "Order Placed Successfully",
    failureNetworkTimeout:
      "The request timed out. Please check your connection and try again.",
    failurePayment:
      "We couldn't process your payment. Please try again.",
    failureApi: "Something interrupted your order. Please try again.",
  },
  common: {
    retry: "Try Again",
    somethingWrong: "Something unexpected happened",
    somethingWrongSubtitle:
      "The app ran into an error. You can try again below.",
  },
} as const;
