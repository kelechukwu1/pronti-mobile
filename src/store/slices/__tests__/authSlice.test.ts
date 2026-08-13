import { MESSAGES } from "@/constants/messages";
import reducer, {
  clearError,
  logout,
  requestOtp,
  requestOtpFailure,
  requestOtpSuccess,
  resetOtpRequest,
  verifyOtp,
  verifyOtpFailure,
  verifyOtpSuccess,
} from "@/store/slices/authSlice";

describe("authSlice", () => {
  it("sets loading and stores the phone/country on requestOtp", () => {
    const state = reducer(
      undefined,
      requestOtp({ phoneNumber: "+1 1234567890", countryCode: "US" }),
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.phoneNumber).toBe("+1 1234567890");
    expect(state.countryCode).toBe("US");
  });

  it("marks otpRequested on requestOtpSuccess", () => {
    let state = reducer(
      undefined,
      requestOtp({ phoneNumber: "x", countryCode: "US" }),
    );
    state = reducer(state, requestOtpSuccess());
    expect(state.loading).toBe(false);
    expect(state.otpRequested).toBe(true);
    expect(state.error).toBeNull();
  });

  it("stores the error on requestOtpFailure", () => {
    const state = reducer(
      undefined,
      requestOtpFailure(MESSAGES.auth.networkError),
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(MESSAGES.auth.networkError);
  });

  it("authenticates the user on verifyOtpSuccess", () => {
    let state = reducer(undefined, verifyOtp({ code: "123456" }));
    expect(state.loading).toBe(true);
    state = reducer(state, verifyOtpSuccess());
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("stores the exact incorrect-OTP message on verifyOtpFailure", () => {
    const state = reducer(
      undefined,
      verifyOtpFailure(MESSAGES.auth.otpIncorrect),
    );
    // Wording mandated verbatim by the assignment (§8).
    expect(state.error).toBe("Invalid OTP. Please try again.");
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
  });

  it("clears the error", () => {
    let state = reducer(undefined, verifyOtpFailure("boom"));
    state = reducer(state, clearError());
    expect(state.error).toBeNull();
  });

  it("returns to the phone step on resetOtpRequest", () => {
    let state = reducer(undefined, requestOtpSuccess());
    state = reducer(state, resetOtpRequest());
    expect(state.otpRequested).toBe(false);
    expect(state.error).toBeNull();
  });

  it("resets to the initial state on logout", () => {
    let state = reducer(undefined, verifyOtpSuccess());
    state = reducer(state, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.otpRequested).toBe(false);
    expect(state.phoneNumber).toBeNull();
  });
});
