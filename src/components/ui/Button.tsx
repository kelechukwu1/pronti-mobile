import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Overrides the auto-generated label style when `children` is a string. */
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const SIZE_STYLES: Record<ButtonSize, ViewStyle> = {
  default: { height: 56, paddingHorizontal: 20 },
  sm: { height: 40, paddingHorizontal: 12 },
  lg: { height: 64, paddingHorizontal: 24 },
  icon: { height: 40, width: 40 },
};

export function Button({
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  style,
  textStyle,
  children,
  onPress,
  ...props
}: ButtonProps) {
  const { colors, radii, typography } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) return;
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const isDisabled = Boolean(disabled) || loading;

  const handlePress = (event: GestureResponderEvent) => {
    if (isDisabled) return;
    onPress?.(event);
  };

  // Per-variant background/border/foreground derived from tokens.
  let backgroundColor = colors.accent;
  let borderColor = "transparent";
  let borderWidth = 0;
  let foreground = colors.textOnAccent;

  switch (variant) {
    case "destructive":
      backgroundColor = colors.clay;
      foreground = "#FFFFFF";
      break;
    case "outline":
      backgroundColor = "transparent";
      borderColor = colors.border;
      borderWidth = StyleSheet.hairlineWidth + 1;
      foreground = colors.text1;
      break;
    case "secondary":
      backgroundColor = colors.surfaceSunken;
      foreground = colors.text1;
      break;
    case "ghost":
      backgroundColor = "transparent";
      foreground = colors.accent;
      break;
    case "link":
      backgroundColor = "transparent";
      foreground = colors.accent;
      break;
    default:
      backgroundColor = colors.accent;
      foreground = colors.textOnAccent;
  }

  const radius = size === "default" ? radii.lg : radii.md;

  const containerStyle: ViewStyle = {
    ...styles.base,
    ...SIZE_STYLES[size],
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: radius,
    opacity: isDisabled ? 0.5 : 1,
  };

  const labelStyle: TextStyle = {
    ...typography.button,
    color: foreground,
    ...(variant === "link" ? { textDecorationLine: "underline" } : null),
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      android_ripple={
        variant === "link" ? undefined : { color: colors.accentSoft }
      }
      style={[containerStyle, style]}
      disabled={isDisabled}
      onPress={handlePress}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={[labelStyle, textStyle]} numberOfLines={1}>
          {children}
        </Text>
      ) : (
        children
      )}
      {loading && (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <ActivityIndicator size="small" color={foreground} />
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
