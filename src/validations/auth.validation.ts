import { z } from "zod";
import { MESSAGES } from "@/constants/messages";

export const loginSchema = z.object({
  phone: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: MESSAGES.auth.phoneRequired,
    })
    .refine((val) => val.replace(/\D/g, "").length === 10, {
      message: MESSAGES.auth.phoneInvalid,
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: MESSAGES.auth.otpRequired,
    })
    .refine((val) => {
      const len = val.replace(/\D/g, "").length;
      return len >= 4 && len <= 6;
    }, {
      message: MESSAGES.auth.otpInvalidLength,
    }),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
