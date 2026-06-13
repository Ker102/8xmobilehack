/**
 * Otto design tokens.
 *
 * Brand: warm cream surfaces (#F6F3EA) + a single confident blue (#378ADD).
 * No gradients — depth comes from solid colour, hairlines, and soft shadows.
 * Typography is Geist Sans, loaded in the root layout via @expo-google-fonts/geist.
 */

import '@/global.css';

const palette = {
  cream: '#F4F0E6', // app background — warm, obviously creamy
  creamDeep: '#ECE6D6',
  paper: '#FFFDF8', // cards — warm white, not clinical
  ink: '#1C1A15',
  inkSoft: '#736E60',
  inkFaint: '#A39D8C',
  blue: '#378ADD',
  blueDeep: '#2A6CB0',
  blueSoft: '#DCE9FB', // light-blue fills for active/selected
  blueTint: '#EAF2FC',
  border: '#E6E0D0',
  borderSoft: '#EFEADD',
  // mood accents (small dots / labels only)
  moodJoy: '#E07A4B',
  moodWarm: '#D79A33',
  moodCalm: '#3D86D4',
  moodLow: '#8A93A3',
} as const;

const ottoLight = {
  text: palette.ink,
  textSecondary: palette.inkSoft,
  textFaint: palette.inkFaint,
  background: palette.cream,
  surface: palette.paper,
  backgroundElement: palette.creamDeep,
  backgroundSelected: palette.blueSoft,
  accent: palette.blue,
  accentSoft: palette.blueSoft,
  accentTint: palette.blueTint,
  accentDeep: palette.blueDeep,
  border: palette.border,
  borderSoft: palette.borderSoft,
  moodWarm: palette.moodWarm,
  moodCalm: palette.moodCalm,
  moodLow: palette.moodLow,
  moodJoy: palette.moodJoy,
} as const;

// Force light: dark mirrors light so the brand never breaks if the OS is dark.
export const Colors = {
  light: ottoLight,
  dark: ottoLight,
} as const;

export const Palette = palette;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** Solid scene swatches for page "media" — cohesive cream + blue family, no gradients. */
export const Swatch = {
  blue: { bg: '#378ADD', fg: '#FFFFFF' },
  sky: { bg: '#DCE9FB', fg: '#2A6CB0' },
  sand: { bg: '#EDE4CC', fg: '#977C39' },
  peach: { bg: '#F2DECB', fg: '#BE6A3F' },
  mist: { bg: '#E3E7EE', fg: '#586273' },
} as const;

export type SwatchName = keyof typeof Swatch;

export const FontFamily = {
  regular: 'Geist_400Regular',
  medium: 'Geist_500Medium',
  semibold: 'Geist_600SemiBold',
  bold: 'Geist_700Bold',
} as const;

export const Fonts = {
  sans: FontFamily.regular,
  medium: FontFamily.medium,
  semibold: FontFamily.semibold,
  bold: FontFamily.bold,
  serif: 'serif',
  rounded: FontFamily.medium,
  mono: 'monospace',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  pill: 999,
} as const;

/** Sleek, low-contrast shadows. Depth without the heavy "material" drop shadow. */
export const Shadow = {
  soft: {
    shadowColor: '#1B2A41',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  card: {
    shadowColor: '#1B2A41',
    shadowOpacity: 0.07,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  floating: {
    shadowColor: '#0C1A30',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
} as const;

export const BottomTabInset = 0;
export const MaxContentWidth = 640;
