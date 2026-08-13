import { runSaga } from "redux-saga";

// Deterministic mock of the async/randomness helpers.
jest.mock("@/services/mock", () => ({
  delay: jest.fn(() => Promise.resolve()),
  randomLatency: jest.fn(() => 0),
  rollFailure: jest.fn(() => false),
  pickOne: jest.fn((items: unknown[]) => items[0]),
}));

import { MESSAGES } from "@/constants/messages";
import { rollFailure } from "@/services/mock";
import {
  requestOtpFailure,
  requestOtpSuccess,
  verifyOtpFailure,
  verifyOtpSuccess,
} from "@/store/slices/authSlice";
import { handleRequestOtp, handleVerifyOtp } from "@/store/sagas/authSaga";

import type { Action, PayloadAction } from "@reduxjs/toolkit";
import type { VerifyOtpPayload } from "@/types";

// A minimal saga IO that records dispatched actions. Passing the concrete saga
// straight to runSaga lets TypeScript infer each handler's real signature.
function ioFor(dispatched: Action[]) {
  return {
    dispatch: (action: Action) => {
      dispatched.push(action);
    },
    getState: () => ({}),
  };
}

const verifyAction = (code: string): PayloadAction<VerifyOtpPayload> => ({
  type: "auth/verifyOtp",
  payload: { code },
});

describe("authSaga — request OTP (assignment §8)", () => {
  afterEach(() => jest.clearAllMocks());

  it("dispatches requestOtpSuccess when the code sends", async () => {
    (rollFailure as jest.Mock).mockReturnValue(false);

    const dispatched: Action[] = [];
    await runSaga(ioFor(dispatched), handleRequestOtp).toPromise();

    expect(dispatched.map((a) => a.type)).toContain(requestOtpSuccess.type);
  });

  it("dispatches requestOtpFailure with a network message on failure", async () => {
    (rollFailure as jest.Mock).mockReturnValue(true);

    const dispatched: Action[] = [];
    await runSaga(ioFor(dispatched), handleRequestOtp).toPromise();

    const failure = dispatched.find(
      (a) => a.type === requestOtpFailure.type,
    ) as PayloadAction<string> | undefined;

    expect(failure).toBeDefined();
    expect(failure?.payload).toBe(MESSAGES.auth.networkError);
  });
});

describe("authSaga — verify OTP (assignment §8)", () => {
  afterEach(() => jest.clearAllMocks());

  it("authenticates when the correct code (123456) is entered", async () => {
    const dispatched: Action[] = [];
    await runSaga(ioFor(dispatched), handleVerifyOtp, verifyAction("123456")).toPromise();

    const types = dispatched.map((a) => a.type);
    expect(types).toContain(verifyOtpSuccess.type);
    expect(types).not.toContain(verifyOtpFailure.type);
  });

  it("returns the exact error for a wrong code", async () => {
    const dispatched: Action[] = [];
    await runSaga(ioFor(dispatched), handleVerifyOtp, verifyAction("000000")).toPromise();

    const failure = dispatched.find(
      (a) => a.type === verifyOtpFailure.type,
    ) as PayloadAction<string> | undefined;

    expect(failure).toBeDefined();
    // Wording mandated verbatim by the assignment (§8).
    expect(failure?.payload).toBe("Invalid OTP. Please try again.");
    expect(dispatched.map((a) => a.type)).not.toContain(verifyOtpSuccess.type);
  });

  it("accepts the correct code even when spaced/formatted", async () => {
    const dispatched: Action[] = [];
    await runSaga(ioFor(dispatched), handleVerifyOtp, verifyAction("1 2 3 4 5 6")).toPromise();

    expect(dispatched.map((a) => a.type)).toContain(verifyOtpSuccess.type);
  });
});
