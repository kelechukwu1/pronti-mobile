import type { ViewStyle } from "react-native";

export type ShadowStyle = Pick<
  ViewStyle,
  "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "elevation"
>;

const WARM_INK = "#1A1817";

export const shadows = {
  elev1: {
    shadowColor: WARM_INK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  elev2: {
    shadowColor: WARM_INK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  elev3: {
    shadowColor: WARM_INK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 12,
  },
} as const satisfies Record<string, ShadowStyle>;

export type ShadowLevel = keyof typeof shadows;

export function applyShadow(
  level: ShadowLevel,
  isDarkMode: boolean,
  isHighContrast = false,
): ShadowStyle {
  if (isHighContrast) return {};
  const base = shadows[level];
  if (!isDarkMode) return base;
  return {
    ...base,
    shadowOpacity: (base.shadowOpacity ?? 0) * 2,
  };
}