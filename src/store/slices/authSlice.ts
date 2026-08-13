import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, RequestOtpPayload, VerifyOtpPayload } from '@/types';

const initialState: AuthState = {
  isAuthenticated: false,
  phoneNumber: null,
  countryCode: null,
  otpRequested: false,
  loading: false,
  error: null,
  isRestored: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // --- Request OTP (watched by saga) ---
    requestOtp: (state, action: PayloadAction<RequestOtpPayload>) => {
      state.loading = true;
      state.error = null;
      state.phoneNumber = action.payload.phoneNumber;
      state.countryCode = action.payload.countryCode;
    },
    requestOtpSuccess: state => {
      state.loading = false;
      state.otpRequested = true;
      state.error = null;
    },
    requestOtpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Verify OTP (watched by saga) ---
    verifyOtp: (state, _action: PayloadAction<VerifyOtpPayload>) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess: state => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Plain reducers ---
    restoreSession: state => {
      state.isAuthenticated = true;
      state.isRestored = true;
    },
    completeRestoreSession: state => {
      state.isRestored = true;
    },
    clearError: state => {
      state.error = null;
    },
    /** Return to the phone step (e.g. "change number" from the OTP screen). */
    resetOtpRequest: state => {
      state.otpRequested = false;
      state.error = null;
    },
    logout: () => ({
      ...initialState,
      isRestored: true,
    }),
  },
});

export const {
  requestOtp,
  requestOtpSuccess,
  requestOtpFailure,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFailure,
  restoreSession,
  completeRestoreSession,
  clearError,
  resetOtpRequest,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
