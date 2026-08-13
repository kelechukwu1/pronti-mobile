import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  CountryPhoneInput,
  CountryPickerModal,
  Screen,
} from "@/components";
import { COUNTRIES, type Country } from "@/data/countries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearError, requestOtp } from "@/store/slices/authSlice";
import { useTheme } from "@/theme";
import { loginSchema, type LoginFormValues } from "@/validations/auth.validation";

import type { AuthStackScreenProps } from "@/types";

const DEFAULT_COUNTRY =
  COUNTRIES.find((c) => c.code === "US") ?? COUNTRIES[0];

export function LoginScreen() {
  const navigation =
    useNavigation<AuthStackScreenProps<"Login">["navigation"]>();
  const { colors, typography } = useTheme();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((s) => s.auth.loading);
  const serverError = useAppSelector((s) => s.auth.error);
  const otpRequested = useAppSelector((s) => s.auth.otpRequested);

  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [pickerOpen, setPickerOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
    mode: "onSubmit",
  });

  // Once the saga confirms the OTP was "sent", advance to the OTP screen.
  useEffect(() => {
    if (otpRequested) {
      navigation.navigate("Otp");
    }
  }, [otpRequested, navigation]);

  const onSubmit = useCallback((data: LoginFormValues) => {
    if (serverError) dispatch(clearError());
    dispatch(
      requestOtp({
        phoneNumber: `${country.dialCode} ${data.phone}`,
        countryCode: country.code,
      }),
    );
  }, [serverError, dispatch, country]);

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[typography.display, { color: colors.text1 }]}>
              Welcome to Pronti
            </Text>
            <Text style={[typography.bodyLarge, styles.subtitle, { color: colors.text3 }]}>
              Enter your phone number and we'll send you a verification code.
            </Text>
          </View>

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <CountryPhoneInput
                label="Phone number"
                isRequired
                value={value}
                onChangeText={onChange}
                selectedCountry={country}
                onPressFlag={() => setPickerOpen(true)}
                error={errors.phone?.message}
                maxLength={10}
              />
            )}
          />

          {!!serverError && !errors.phone && (
            <Text style={[styles.serverError, { color: colors.clay }]}>
              {serverError}
            </Text>
          )}

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading || !isValid}
            style={styles.submit}
          >
            Continue
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>

      <CountryPickerModal
        visible={pickerOpen}
        selectedCountryCode={country.code}
        onSelect={setCountry}
        onClose={() => setPickerOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 12,
  },
  serverError: {
    fontSize: 13,
    marginTop: 12,
    marginLeft: 4,
  },
  submit: {
    marginTop: 24,
  },
  hint: {
    textAlign: "center",
    marginTop: 16,
  },
});
