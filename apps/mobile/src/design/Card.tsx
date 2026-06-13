import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  elevated?: boolean;
  tone?: 'surface' | 'cream' | 'accentSoft';
};

export function Card({ children, style, padded = true, elevated = true, tone = 'surface' }: CardProps) {
  const background =
    tone === 'cream'
      ? Colors.light.backgroundElement
      : tone === 'accentSoft'
        ? Colors.light.accentSoft
        : Colors.light.surface;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: background, padding: padded ? Spacing.four : 0 },
        elevated ? Shadow.card : null,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
  },
});
