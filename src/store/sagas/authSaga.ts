import { call, put, takeLatest } from 'redux-saga/effects';

import { MESSAGES } from '@/constants/messages';
import { delay, randomLatency, rollFailure } from '@/services/mock';
import { toast } from '@/services/toast';
import { setToken } from '@/utils/token';

import {
  requestOtp,
  requestOtpFailure,
  requestOtpSuccess,
  verifyOtp,
  verifyOtpFailure,
  verifyOtpSuccess,
} from '../slices/authSlice';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { VerifyOtpPayload } from '@/types';

const VALID_OTP = '123456';

/** Probability that "sending" the OTP simulates a transient network failure. */
const OTP_SEND_FAILURE_RATE = 0.1;

/** Exported for unit testing; run by the watcher below. */
export function* handleRequestOtp(): Generator<unknown, void, unknown> {
  try {
    yield call(delay, randomLatency());

    // Simulate an occasional network error while requesting the code
    if (rollFailure(OTP_SEND_FAILURE_RATE)) {
      throw new Error('NETWORK');
    }

    yield put(requestOtpSuccess());
    toast.success(MESSAGES.auth.otpSent);
  } catch {
    yield put(requestOtpFailure(MESSAGES.auth.networkError));
    toast.error(MESSAGES.auth.networkError);
  }
}

/** Exported for unit testing; run by the watcher below. */
export function* handleVerifyOtp(
  action: PayloadAction<VerifyOtpPayload>,
): Generator<unknown, void, unknown> {
  try {
    yield call(delay, randomLatency());

    const code = action.payload.code.replace(/\D/g, '');
    if (code !== VALID_OTP) {
      // Wrong code is a validation failure, not a thrown error.
      yield put(verifyOtpFailure(MESSAGES.auth.otpIncorrect));
      return;
    }

    // Success — persist a mock session token, then flip auth state.
    yield call(setToken, `mock-token-${Date.now()}`);
    yield put(verifyOtpSuccess());
  } catch {
    yield put(verifyOtpFailure(MESSAGES.auth.genericError));
    toast.error(MESSAGES.auth.genericError);
  }
}

export function* authSaga() {
  yield takeLatest(requestOtp.type, handleRequestOtp);
  yield takeLatest(verifyOtp.type, handleVerifyOtp);
}
