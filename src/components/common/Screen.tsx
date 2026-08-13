import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context";

import { useTheme } from "@/theme";

export interface ScreenProps {
  children: React.ReactNode;
  edges?: readonly Edge[];
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_EDGES: readonly Edge[] = ["top", "bottom"];

export function Screen({
  children,
  edges = DEFAULT_EDGES,
  padded = true,
  style,
  contentStyle,
}: ScreenProps) {
  const { colors, isDarkMode } = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.root, { backgroundColor: colors.canvas }, style]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View
        style={[
          styles.content,
          padded && styles.padded,
          contentStyle,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
  },
});
