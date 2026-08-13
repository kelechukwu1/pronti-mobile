import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

import { Icon } from "./Icon";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isRequired?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  function InputField(
    {
      label,
      error,
      isRequired = false,
      containerStyle,
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) {
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
          <TextInput
            ref={ref}
            style={[
              styles.input,
              { color: colors.text1, ...typography.body },
              style,
            ]}
            placeholderTextColor={colors.text3}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
        </View>

        {!!error && (
          <View style={styles.errorRow}>
            <Icon name="alert-circle" size={13} color={colors.clay} />
            <Text style={[styles.errorText, { color: colors.clay }]}>{error}</Text>
          </View>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

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
    borderWidth: 2,
    justifyContent: "center",
  },
  input: {
    height: 54,
    paddingHorizontal: 16,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 4,
    marginTop: 6,
  },
  errorText: {
    fontSize: 13,
  },
});
