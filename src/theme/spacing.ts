import { Platform } from "react-native";

export const spacing = {
  space4: 4,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space32: 32,
  space40: 40,
  space48: 48,
  space64: 64,
} as const;

export type SpacingToken = keyof typeof spacing;

export const screenHorizontalPadding = spacing.space20;
export const navBarHeight = 44;
export const bottomTabBarHeight = Platform.OS === "ios" ? 83 : 56;

export const layout = {
  screenHorizontalPadding,
  navBarHeight,
  bottomTabBarHeight,
} as const;