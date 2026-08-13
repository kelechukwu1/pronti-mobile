import { loginSchema } from "@/validations/auth.validation";

export interface PhoneLengthRules {
  min: number;
  max: number;
}

/**
 * Accept exactly 10 digits, whether entered raw
 * ("1234567890") or formatted ("(123) 456-7890").
 * Returns the exact error string for empty/invalid input, or "" when valid.
 */
export function getTenDigitPhoneError(phone: string): string {
  const res = loginSchema.safeParse({ phone: phone ?? "" });
  if (res.success) return "";
  const fieldErrors = res.error.flatten().fieldErrors;
  return fieldErrors.phone?.[0] ?? "";
}

export function isTenDigitPhoneValid(phone: string): boolean {
  return getTenDigitPhoneError(phone) === "";
}

/** Format a 10-digit national number as "(123) 456-7890" for display. */
export function formatUsPhone(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export const getCountryPhoneLength = (
  countryCode: string,
): PhoneLengthRules => {
  switch (countryCode) {
    case "NG":
      return { min: 10, max: 10 };
    case "US":
    case "CA":
      return { min: 10, max: 10 };
    case "GB":
      return { min: 10, max: 10 };
    case "IN":
      return { min: 10, max: 10 };
    case "CN":
      return { min: 11, max: 11 };
    case "JP":
      return { min: 10, max: 10 };
    case "FR":
      return { min: 9, max: 9 };
    case "ZA":
      return { min: 9, max: 9 };
    case "AU":
      return { min: 9, max: 9 };
    case "GH":
      return { min: 9, max: 9 };
    case "KE":
      return { min: 9, max: 9 };
    case "SG":
      return { min: 8, max: 8 };
    case "AE":
      return { min: 9, max: 9 };
    case "SA":
      return { min: 9, max: 9 };
    case "BR":
      return { min: 10, max: 11 };
    case "DE":
      return { min: 10, max: 11 };
    case "NL":
      return { min: 9, max: 9 };
    case "ES":
      return { min: 9, max: 9 };
    case "IT":
      return { min: 9, max: 10 };
    default:
      return { min: 7, max: 12 };
  }
};

export const cleanPhoneNumber = (phone: string): string => {
  let clean = phone.replace(/\D/g, "");
  if (clean.startsWith("0")) {
    clean = clean.substring(1);
  }
  return clean;
};

export const getPhoneValidationError = (
  phoneVal: string,
  countryCode: string,
  countryName: string,
): string => {
  if (!phoneVal) return "";
  const cleaned = cleanPhoneNumber(phoneVal);
  const rules = getCountryPhoneLength(countryCode);
  const len = cleaned.length;

  if (len < rules.min || len > rules.max) {
    if (rules.min === rules.max) {
      return `Phone number must be exactly ${rules.min} digits for ${countryName}.`;
    }
    return `Phone number must be between ${rules.min} and ${rules.max} digits for ${countryName}.`;
  }
  return "";
};

import { Country } from "@/data/countries";

export const filterCountries = (
  countries: Country[],
  searchQuery: string,
): Country[] => {
  if (!searchQuery) return countries;
  const query = searchQuery.toLowerCase();
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.dialCode.includes(query) ||
      c.code.toLowerCase().includes(query),
  );
};
