import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputKeyPressEvent,
} from "react-native";

import { useTheme } from "@/theme";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChangeText: (code: string) => void;
  hasError?: boolean;
  autoFocus?: boolean;
  onSubmit?: () => void;
}

const BOX_SIZE = 60;

export function OtpInput({
  length = 6,
  value,
  onChangeText,
  hasError = false,
  autoFocus = true,
  onSubmit,
}: OtpInputProps) {
  const { colors, typography, radii } = useTheme();
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const digits = value.replace(/\D/g, "").slice(0, length);
  const focusedIndex = digits.length;

  const handleChange = (text: string) => {
    onChangeText(text.replace(/\D/g, "").slice(0, length));
  };

  const handleKeyPress = (e: TextInputKeyPressEvent) => {
    if (e.nativeEvent.key === "Backspace" && digits.length === 0) {
      inputRef.current?.focus();
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <View style={styles.wrapper}>
      {/* Hidden real input captures all keystrokes/paste/autofill. */}
      <TextInput
        ref={inputRef}
        value={digits}
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        onSubmitEditing={onSubmit}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        autoFocus={autoFocus}
        caretHidden
        style={styles.hiddenInput}
        accessibilityLabel="One-time passcode"
      />

      <View
        style={styles.boxRow}
        onStartShouldSetResponder={() => true}
        onResponderRelease={focusInput}
      >
        {Array.from({ length }).map((_, i) => {
          const char = digits[i] ?? "";
          const isFocused = i === focusedIndex;
          const borderColor = hasError
            ? colors.clay
            : isFocused || char
              ? colors.accent
              : colors.border;
          return (
            <View
              key={i}
              style={[
                styles.box,
                {
                  backgroundColor: colors.surface,
                  borderColor,
                  borderRadius: radii.md,
                },
              ]}
            >
              {char ? (
                <Text style={[typography.h2, { color: colors.text1 }]}>
                  {char}
                </Text>
              ) : isFocused ? (
                <View style={[styles.caret, { backgroundColor: colors.accent }]} />
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: BOX_SIZE,
    width: "100%",
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  box: {
    flex: 1,
    height: BOX_SIZE,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  caret: {
    width: 2,
    height: 24,
    borderRadius: 1,
  },
});
