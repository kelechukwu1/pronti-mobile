import React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/theme";

export interface BadgeProps {
  /** Numeric count; values over `max` render as "{max}+". */
  count: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
}

export function Badge({ count, max = 99, style }: BadgeProps) {
  const { colors } = useTheme();
  if (count <= 0) return null;

  const label = count > max ? `${max}+` : String(count);

  return (
    <View
      style={[styles.badge, { backgroundColor: colors.clay }, style]}
      accessibilityLabel={`${count} items in cart`}
    >
      <Text style={[styles.text, { color: "#FFFFFF" }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
});
