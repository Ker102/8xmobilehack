import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { Colors, FontFamily, type ThemeColor } from '@/constants/theme';

type Weight = keyof typeof FontFamily;

export type AppTextProps = TextProps & {
  size?: number;
  weight?: Weight;
  color?: ThemeColor | string;
  lineHeight?: number;
  letterSpacing?: number;
  center?: boolean;
};

function resolveColor(color: AppTextProps['color']): string {
  if (!color) return Colors.light.text;
  if (color in Colors.light) return Colors.light[color as ThemeColor];
  return color;
}

export function AppText({
  size = 16,
  weight = 'regular',
  color,
  lineHeight,
  letterSpacing,
  center,
  style,
  ...rest
}: AppTextProps) {
  const computed: TextStyle = {
    fontFamily: FontFamily[weight],
    fontSize: size,
    lineHeight: lineHeight ?? Math.round(size * 1.4),
    color: resolveColor(color),
    letterSpacing,
    textAlign: center ? 'center' : undefined,
  };
  return <RNText style={[computed, style]} {...rest} />;
}
