import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Header, OtpInput, Screen } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearError,
  requestOtp,
  resetOtpRequest,
  verifyOtp,
} from "@/store/slices/authSlice";
import { useTheme } from "@/theme";
import { isOtpFormatValid, OTP_LENGTH } from "@/utils/otp";
import { otpSchema, type OtpFormValues } from "@/validations/auth.validation";
import { toast } from "@/services/toast";

import type { AuthStackScreenProps } from "@/types";

export function OtpScreen() {
  const navigation = useNavigation<AuthStackScreenProps<"Otp">["navigation"]>();
  const { colors, typography } = useTheme();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((s) => s.auth.loading);
  const serverError = useAppSelector((s) => s.auth.error);
  const phoneNumber = useAppSelector((s) => s.auth.phoneNumber);
  const countryCode = useAppSelector((s) => s.auth.countryCode);

  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
  });

  const otpVal = watch("otp", "");

  // Clear any stale error when arriving on the screen.
  useEffect(() => {
    if (serverError) dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = useCallback((data: OtpFormValues) => {
    if (serverError) dispatch(clearError());
    dispatch(verifyOtp({ code: data.otp }));
  }, [serverError, dispatch]);

  const handleChangeNumber = useCallback(() => {
    dispatch(resetOtpRequest());
    navigation.goBack();
  }, [dispatch, navigation]);

  // Clear the entered code after a failed attempt so the user can retype.
  useEffect(() => {
    if (serverError) setValue("otp", "");
  }, [serverError, setValue]);

  return (
    <Screen>
      <Header onBack={handleChangeNumber} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <Text style={[typography.h1, { color: colors.text1 }]}>
            Enter verification code
          </Text>
          <Text style={[typography.body, styles.subtitle, { color: colors.text3 }]}>
            {phoneNumber
              ? `We sent a code to ${phoneNumber}.`
              : "We sent you a verification code."}
          </Text>

          <View style={styles.otpWrap}>
            <Controller
              control={control}
              name="otp"
              render={({ field: { onChange, value } }) => (
                <OtpInput
                  length={OTP_LENGTH}
                  value={value}
                  onChangeText={onChange}
                  hasError={!!serverError || !!errors.otp}
                  onSubmit={handleSubmit(handleVerify)}
                />
              )}
            />
          </View>

          {(!!serverError || !!errors.otp) && (
            <Text style={[styles.error, { color: colors.clay }]}>
              {errors.otp?.message || serverError}
            </Text>
          )}

          <View style={styles.resendWrap}>
            {secondsLeft > 0 ? (
              <Text style={[typography.body, { color: colors.text3 }]}>
                Resend code in {secondsLeft}s
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (phoneNumber && countryCode) {
                    dispatch(requestOtp({ phoneNumber, countryCode }));
                  }
                  toast.success("OTP resent successfully");
                  setSecondsLeft(30);
                }}
                accessibilityRole="button"
                style={styles.resendButton}
              >
                <Text style={[typography.button, { color: colors.accent }]}>
                  Resend code
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Button
            onPress={handleSubmit(handleVerify)}
            loading={loading}
            disabled={loading || !isOtpFormatValid(otpVal)}
            style={styles.submit}
          >
            Verify
          </Button>

          <TouchableOpacity
            onPress={handleChangeNumber}
            accessibilityRole="button"
            style={styles.changeButton}
          >
            <Text style={[typography.button, { color: colors.accent }]}>
              Change number
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  otpWrap: {
    marginTop: 32,
  },
  error: {
    fontSize: 13,
    marginTop: 16,
    textAlign: "center",
  },
  resendWrap: {
    alignItems: "center",
    marginTop: 24,
  },
  resendButton: {
    padding: 8,
  },
  submit: {
    marginTop: 32,
  },
  changeButton: {
    alignSelf: "center",
    marginTop: 20,
    padding: 8,
  },
});
