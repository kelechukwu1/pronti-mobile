import { MESSAGES } from "@/constants/messages";
import {
  getOtpValidationError,
  isOtpFormatValid,
  OTP_LENGTH,
} from "@/utils/otp";
import {
  formatUsPhone,
  getTenDigitPhoneError,
  isTenDigitPhoneValid,
} from "@/utils/phone";

describe("phone validation (assignment §8)", () => {
  it("accepts a raw 10-digit number", () => {
    expect(getTenDigitPhoneError("1234567890")).toBe("");
    expect(isTenDigitPhoneValid("1234567890")).toBe(true);
  });

  it("accepts a formatted 10-digit number", () => {
    expect(getTenDigitPhoneError("(123) 456-7890")).toBe("");
    expect(isTenDigitPhoneValid("(123) 456-7890")).toBe(true);
  });

  it("returns the required message for empty input", () => {
    expect(getTenDigitPhoneError("")).toBe(MESSAGES.auth.phoneRequired);
    expect(getTenDigitPhoneError("   ")).toBe(MESSAGES.auth.phoneRequired);
  });

  it("returns the exact invalid message for too few or too many digits", () => {
    // Wording is mandated verbatim by the assignment.
    expect(getTenDigitPhoneError("12345")).toBe(
      "Please enter a valid 10-digit phone number",
    );
    expect(getTenDigitPhoneError("123456789")).toBe(
      MESSAGES.auth.phoneInvalid,
    );
    expect(getTenDigitPhoneError("123456789012")).toBe(
      MESSAGES.auth.phoneInvalid,
    );
    expect(isTenDigitPhoneValid("12345")).toBe(false);
  });

  it("formats a national number for display", () => {
    expect(formatUsPhone("1234567890")).toBe("(123) 456-7890");
    expect(formatUsPhone("123")).toBe("123");
    expect(formatUsPhone("123456")).toBe("(123) 456");
  });
});

describe("OTP format validation (assignment §8)", () => {
  it("accepts 4 to 6 digits", () => {
    expect(isOtpFormatValid("1234")).toBe(true);
    expect(isOtpFormatValid("12345")).toBe(true);
    expect(isOtpFormatValid("123456")).toBe(true);
  });

  it("rejects fewer than 4 or more than 6 digits", () => {
    expect(isOtpFormatValid("123")).toBe(false);
    expect(isOtpFormatValid("1234567")).toBe(false);
  });

  it("returns messages for empty and malformed codes", () => {
    expect(getOtpValidationError("")).toBe(MESSAGES.auth.otpRequired);
    expect(getOtpValidationError("12")).toBe(MESSAGES.auth.otpInvalidLength);
    expect(getOtpValidationError("123456")).toBe("");
  });

  it("exposes the max length as 6", () => {
    expect(OTP_LENGTH).toBe(6);
  });
});
