import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { AppText } from '@/design/Text';
import { Icon, type IconName } from '@/design/Icon';

const META: Record<string, { label: string; icon: IconName }> = {
  shelf: { label: 'Shelf', icon: 'shelf' },
  feed: { label: 'Feed', icon: 'feed' },
  record: { label: 'Record', icon: 'mic' },
  companion: { label: 'Otto', icon: 'otto' },
  you: { label: 'You', icon: 'user' },
};

export function OttoTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, Spacing.three) }]}>
      <View style={[styles.bar, Shadow.floating]}>
        {state.routes.map((route, index) => {
          const meta = META[route.name] ?? { label: route.name, icon: 'shelf' as IconName };
          const focused = state.index === index;
          const isCenter = route.name === 'record';

          const onPress = () => {
            if (Platform.OS !== 'web') Haptics.selectionAsync();
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          if (isCenter) {
            return (
              <Pressable key={route.key} onPress={onPress} style={styles.centerSlot}>
                <View style={[styles.centerButton, Shadow.card]}>
                  <Icon name="mic" size={24} color="#FFFFFF" strokeWidth={2.2} />
                </View>
              </Pressable>
            );
          }

          return <TabItem key={route.key} meta={meta} focused={focused} onPress={onPress} />;
        })}
      </View>
    </View>
  );
}

function TabItem({
  meta,
  focused,
  onPress,
}: {
  meta: { label: string; icon: IconName };
  focused: boolean;
  onPress: () => void;
}) {
  const s = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    s.value = withSpring(focused ? 1 : 0, { damping: 16, stiffness: 220 });
  }, [focused, s]);
  const iconStyle = useAnimatedStyle(() => ({ transform: [{ scale: 1 + s.value * 0.12 }, { translateY: -s.value * 2 }] }));

  return (
    <Pressable onPress={onPress} style={styles.slot}>
      <Animated.View style={iconStyle}>
        <Icon
          name={meta.icon}
          size={22}
          color={focused ? Colors.light.accent : Colors.light.textFaint}
          strokeWidth={focused ? 2.4 : 2}
        />
      </Animated.View>
      <AppText
        size={10.5}
        weight={focused ? 'semibold' : 'medium'}
        color={focused ? 'accent' : 'textFaint'}
        letterSpacing={0.2}>
        {meta.label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    width: '100%',
    maxWidth: 440,
  },
  slot: { flex: 1, alignItems: 'center', gap: 4 },
  centerSlot: { flex: 1, alignItems: 'center' },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: Colors.light.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
