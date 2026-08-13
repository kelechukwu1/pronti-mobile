import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

import type { Country } from "@/data/countries";

import { Icon } from "./Icon";

/** Image fill style, kept off StyleSheet.create to preserve ImageStyle typing. */
const imageFill = { width: "100%", height: "100%" } as const;

export interface CountryPhoneInputProps {
  label?: string;
  placeholder?: string;
  /** The national number (digits only, without the calling code). */
  value: string;
  onChangeText: (text: string) => void;
  selectedCountry: Country;
  error?: string;
  isRequired?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPressFlag: () => void;
  maxLength?: number;
}

export function CountryPhoneInput({
  label,
  placeholder = "(201) 555-0123",
  value,
  onChangeText,
  selectedCountry,
  error,
  isRequired = false,
  containerStyle,
  onPressFlag,
  maxLength,
}: CountryPhoneInputProps) {
  const { colors, typography, radii } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.clay
    : isFocused
      ? colors.accent
      : colors.border;

  return (
    <View style={containerStyle}>
      {!!label && (
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: colors.text2 }]}>{label}</Text>
          {isRequired && (
            <Text style={[styles.label, { color: colors.clay }]}> *</Text>
          )}
        </View>
      )}

      <View
        style={[
          styles.field,
          { backgroundColor: colors.surface, borderColor, borderRadius: radii.lg },
        ]}
      >
        <TouchableOpacity
          onPress={onPressFlag}
          accessibilityRole="button"
          accessibilityLabel={`Selected country ${selectedCountry.name}, dial code ${selectedCountry.dialCode}. Tap to change.`}
          style={[styles.flagButton, { borderRightColor: colors.border }]}
        >
          <View style={styles.flagFrame}>
            <Image
              source={{ uri: selectedCountry.flagUrl }}
              style={imageFill}
              resizeMode="cover"
            />
          </View>
          <Text style={[styles.dialCode, { color: colors.text1 }]}>
            {selectedCountry.dialCode}
          </Text>
          <Icon name="chevron-down" size={16} color={colors.text3} />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { color: colors.text1, ...typography.body }]}
          value={value}
          onChangeText={(text) => onChangeText(text.replace(/\D/g, ""))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.text3}
          keyboardType="phone-pad"
          autoComplete="tel"
          autoCorrect={false}
          maxLength={maxLength}
          accessibilityLabel={label ?? "Phone number"}
        />
      </View>

      {!!error && (
        <Text style={[styles.errorText, { color: colors.clay }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  flagButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  flagFrame: {
    width: 30,
    height: 20,
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  dialCode: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 54,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
});
