import React, { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from "@react-navigation/native";

import { navigationRef } from "../navigation/navigationRef";
import { AppStack } from "../navigation/AppStack";
import { AuthStack } from "../navigation/AuthStack";
import { useAppSelector } from "../store/hooks";
import { useTheme } from "../theme";

export function RootNavigator() {
  const { isAuthenticated, isRestored } = useAppSelector((s) => s.auth);
  const { colors, isDarkMode } = useTheme();

  const navTheme = useMemo<Theme>(() => {
    const base = isDarkMode ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.accent,
        background: colors.canvas,
        card: colors.surface,
        text: colors.text1,
        border: colors.border,
        notification: colors.clay,
      },
    };
  }, [isDarkMode, colors]);

  if (!isRestored) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.canvas }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
