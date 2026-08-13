// Base palette — light and dark counterparts.
export const base = {
  ink: { light: '#1A1817', dark: '#EFECE5' },
  graphite: { light: '#4A4642', dark: '#B6B2A8' },
  stone: { light: '#A8A39A', dark: '#777268' },
  chalk: { light: '#EDEAE2', dark: '#2A2722' },
  paper: { light: '#FBF9F4', dark: '#1E1B17' },
  bone: { light: '#F5F2EB', dark: '#161412' },
} as const;

// Accent palette
export const accent = {
  olive: { light: '#6B7553', dark: '#8C9B6E' },
  sage: { light: '#5A7355', dark: '#7C9874' },
  ochre: { light: '#B89968', dark: '#D0B27D' },
  clay: { light: '#A8543E', dark: '#C26B53' },
  slate: { light: '#6B7B8A', dark: '#8595A4' },
} as const;

// Soft tints
export const softTints = {
  oliveSoft: { light: 'rgba(107,117,83,0.10)', dark: 'rgba(140,155,110,0.16)' },
  sageSoft: { light: 'rgba(90,115,85,0.10)', dark: 'rgba(124,152,116,0.16)' },
  ochreSoft: {
    light: 'rgba(184,153,104,0.12)',
    dark: 'rgba(208,178,125,0.16)',
  },
  claySoft: { light: 'rgba(168,84,62,0.10)', dark: 'rgba(194,107,83,0.16)' },
  slateSoft: {
    light: 'rgba(107,123,138,0.10)',
    dark: 'rgba(133,149,164,0.16)',
  },
} as const;

export type Base = typeof base;
export type Accent = typeof accent;
export type SoftTints = typeof softTints;

export type ResolvedColors = {
  canvas: string;
  surface: string;
  surfaceSunken: string;
  border: string;
  borderStrong: string;
  text1: string;
  text2: string;
  text3: string;
  textOnAccent: string;
  accent: string;
  accentSoft: string;
  accentOn: string;
  sage: string;
  sageSoft: string;
  ochre: string;
  ochreSoft: string;
  clay: string;
  claySoft: string;
  slate: string;
  slateSoft: string;
};

export const lightColors: ResolvedColors = {
  canvas: base.bone.light,
  surface: base.paper.light,
  surfaceSunken: '#F0EDE5',
  border: base.chalk.light,
  borderStrong: '#D9D5CB',
  text1: base.ink.light,
  text2: base.graphite.light,
  text3: base.stone.light,
  textOnAccent: base.bone.light,
  accent: accent.olive.light,
  accentSoft: softTints.oliveSoft.light,
  accentOn: base.bone.light,
  sage: accent.sage.light,
  sageSoft: softTints.sageSoft.light,
  ochre: accent.ochre.light,
  ochreSoft: softTints.ochreSoft.light,
  clay: accent.clay.light,
  claySoft: softTints.claySoft.light,
  slate: accent.slate.light,
  slateSoft: softTints.slateSoft.light,
} as const;

export const darkColors: ResolvedColors = {
  canvas: base.bone.dark,
  surface: base.paper.dark,
  surfaceSunken: '#100E0C',
  border: base.chalk.dark,
  borderStrong: '#38332D',
  text1: base.ink.dark,
  text2: base.graphite.dark,
  text3: base.stone.dark,
  textOnAccent: '#0E0C0A',
  accent: accent.olive.dark,
  accentSoft: softTints.oliveSoft.dark,
  accentOn: '#0E0C0A',
  sage: accent.sage.dark,
  sageSoft: softTints.sageSoft.dark,
  ochre: accent.ochre.dark,
  ochreSoft: softTints.ochreSoft.dark,
  clay: accent.clay.dark,
  claySoft: softTints.claySoft.dark,
  slate: accent.slate.dark,
  slateSoft: softTints.slateSoft.dark,
} as const;

export const highContrastColors: ResolvedColors = {
  canvas: '#000000',
  surface: '#111111',
  surfaceSunken: '#000000',
  border: '#555555',
  borderStrong: '#555555',
  text1: '#FFFFFF',
  text2: '#CCCCCC',
  text3: '#CCCCCC',
  textOnAccent: '#000000',
  accent: accent.olive.dark,
  accentSoft: softTints.oliveSoft.dark,
  accentOn: '#000000',
  sage: accent.sage.dark,
  sageSoft: softTints.sageSoft.dark,
  ochre: accent.ochre.dark,
  ochreSoft: softTints.ochreSoft.dark,
  clay: accent.clay.dark,
  claySoft: softTints.claySoft.dark,
  slate: accent.slate.dark,
  slateSoft: softTints.slateSoft.dark,
} as const;

export type ColorToken = keyof ResolvedColors;
