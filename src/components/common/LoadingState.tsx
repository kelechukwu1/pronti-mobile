import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";

import { useTheme } from "@/theme";

export interface LoadingStateProps {
  variant?: "grid" | "spinner";
  count?: number;
}

export function LoadingState({ variant = "grid", count = 6 }: LoadingStateProps) {
  const { colors } = useTheme();

  if (variant === "spinner") {
    return (
      <View style={styles.spinnerWrap}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.grid} accessibilityLabel="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

function SkeletonCard() {
  const { colors, radii } = useTheme();
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const block = (style: object, key?: string) => (
    <Animated.View
      key={key}
      style={[
        style,
        { backgroundColor: colors.surfaceSunken, opacity: pulse },
      ]}
    />
  );

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderRadius: radii.lg, borderColor: colors.border },
      ]}
    >
      {block({ height: 120, borderRadius: 12, marginBottom: 12 })}
      {block({ height: 14, borderRadius: 6, width: "80%", marginBottom: 8 })}
      {block({ height: 14, borderRadius: 6, width: "50%", marginBottom: 12 })}
      {block({ height: 18, borderRadius: 6, width: "40%" })}
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrap: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 12,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
