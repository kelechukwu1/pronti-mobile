export interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  countryCode: string | null;
  otpRequested: boolean;
  loading: boolean;
  error: string | null;
  isRestored: boolean;
}

export interface RequestOtpPayload {
  phoneNumber: string;
  countryCode: string;
}

export interface VerifyOtpPayload {
  code: string;
}
