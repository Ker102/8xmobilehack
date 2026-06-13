import type { ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  contentStyle?: ViewStyle;
  bottomInset?: number;
  background?: string;
};

/**
 * Brand screen wrapper: cream background, centered max-width column,
 * safe-area aware, optional scroll. Keeps every screen visually consistent.
 */
export function Screen({
  children,
  scroll = true,
  padded = true,
  contentStyle,
  bottomInset = 104,
  background = Colors.light.background,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const pad = padded ? Spacing.four : 0;

  const inner: ViewStyle = {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: pad,
    paddingTop: insets.top + (Platform.OS === 'web' ? Spacing.five : Spacing.three),
    paddingBottom: insets.bottom + bottomInset,
  };

  if (!scroll) {
    return (
      <View style={[styles.fill, { backgroundColor: background }]}>
        <View style={[inner, styles.fill, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.fill, { backgroundColor: background }]}
      contentContainerStyle={[inner, contentStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
