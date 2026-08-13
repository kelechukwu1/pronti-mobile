import type { ReactNode } from "react";

import type { ResolvedColors } from "@/theme/colors";
import type { radii } from "@/theme/radii";
import type { ShadowLevel, ShadowStyle } from "@/theme/shadows";
import type { spacing } from "@/theme/spacing";
import type { typography } from "@/theme/typography";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  colors: ResolvedColors;
  typography: typeof typography;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: (level: ShadowLevel) => ShadowStyle;
  isDarkMode: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial mode before the persisted preference loads. Defaults to "system". */
  initialMode?: ThemeMode;
}
