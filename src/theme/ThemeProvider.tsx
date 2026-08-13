import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { darkColors, lightColors } from "./colors";
import { radii } from "./radii";
import { applyShadow, type ShadowLevel } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";

import type { ThemeMode, ThemeContextValue, ThemeProviderProps } from "@/types";

const THEME_MODE_STORAGE_KEY = "@pronti/theme-mode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system";
}

export function ThemeProvider({
  children,
  initialMode = "system",
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>(initialMode);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      AsyncStorage.getItem(THEME_MODE_STORAGE_KEY)
    ]).then(([storedMode]) => {
      if (cancelled) return;
      if (isThemeMode(storedMode)) setThemeModeState(storedMode);
    }).catch(() => { });
    return () => {
      cancelled = true;
    };
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, mode).catch(() => { });
  }, []);

  const isDarkMode = useMemo(() => {
    if (themeMode === "dark") return true;
    if (themeMode === "light") return false;
    return systemScheme === "dark";
  }, [themeMode, systemScheme]);

  const colors = isDarkMode ? darkColors : lightColors;

  const shadows = useCallback(
    (level: ShadowLevel) => applyShadow(level, isDarkMode, false),
    [isDarkMode],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors,
      typography,
      spacing,
      radii,
      shadows,
      isDarkMode,
      themeMode,
      setThemeMode
    }),
    [colors, shadows, isDarkMode, themeMode, setThemeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>.");
  }
  return ctx;
}