import type { TextStyle } from "react-native";

export const FONT_FAMILY = {
  fraunces: "System",
  frauncesItalic: "System",
  frauncesSemibold: "System",
  interRegular: "System",
  interMedium: "System",
  interSemibold: "System",
  interBold: "System",
  mono: "monospace",
  monoMedium: "monospace",
} as const;

export type TypographyStyle = {
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  lineHeight: number;
  fontFamily: string;
  letterSpacing?: number;
  textTransform?: TextStyle["textTransform"];
};

export const typography = {
  display: {
    fontFamily: FONT_FAMILY.fraunces,
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
    letterSpacing: -0.4,
  },
  h1: {
    fontFamily: FONT_FAMILY.fraunces,
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 32,
    letterSpacing: -0.28,
  },
  h2: {
    fontFamily: FONT_FAMILY.fraunces,
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 26,
    letterSpacing: -0.11,
  },
  h3: {
    fontFamily: FONT_FAMILY.interSemibold,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 21,
  },
  bodyLarge: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 25,
  },
  body: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  button: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 15,
    letterSpacing: -0.08,
  },
  label: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 13,
  },
  caption: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  eyebrow: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: 10.5,
    fontWeight: "400",
    lineHeight: 11,
    letterSpacing: 1.47,
    textTransform: "uppercase",
  },
  monoSmall: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: 11.5,
    fontWeight: "400",
    lineHeight: 15,
  },
  numericLarge: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 35,
    letterSpacing: -0.32,
  },
} as const satisfies Record<string, TypographyStyle>;

export type TypographyToken = keyof typeof typography;

export function applyTypography(token: TypographyToken): TextStyle {
  return { ...typography[token] };
}