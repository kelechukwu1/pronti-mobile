import { otpSchema } from "@/validations/auth.validation";

/**
 * The mock backend accepts any 4–6 digit code
 * at the input layer; the *correct* code (123456) is checked in the auth saga.
 */
const OTP_MAX = 6;

export function getOtpValidationError(code: string): string {
  const res = otpSchema.safeParse({ otp: code ?? "" });
  if (res.success) return "";
  const fieldErrors = res.error.flatten().fieldErrors;
  return fieldErrors.otp?.[0] ?? "";
}

export function isOtpFormatValid(code: string): boolean {
  return getOtpValidationError(code) === "";
}

export const OTP_LENGTH = OTP_MAX;
