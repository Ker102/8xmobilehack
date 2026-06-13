import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { Icon, type IconName } from '@/design/Icon';
import { AppText } from '@/design/Text';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  fullWidth?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  icon?: IconName;
  size?: 'md' | 'lg';
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  label,
  onPress,
  variant = 'primary',
  fullWidth,
  style,
  disabled,
  icon,
  size = 'lg',
}: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  const fg = isPrimary ? '#FFFFFF' : isGhost ? Colors.light.accent : Colors.light.text;

  const containerStyle: ViewStyle = {
    backgroundColor: isPrimary ? Colors.light.accent : isGhost ? 'transparent' : Colors.light.surface,
    borderColor: Colors.light.border,
    borderWidth: isPrimary || isGhost ? 0 : 1,
    opacity: disabled ? 0.4 : 1,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    paddingVertical: size === 'lg' ? 15 : 11,
  };

  return (
    <AnimatedPressable
      disabled={disabled}
      onPressIn={() => {
        scale.value = withTiming(0.97, { duration: 90 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 140 });
      }}
      onPress={() => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      style={[
        styles.base,
        containerStyle,
        isPrimary && Shadow.card,
        !isPrimary && !isGhost && Shadow.soft,
        animatedStyle,
        style,
      ]}>
      <View style={styles.content} pointerEvents="none">
        {icon ? <Icon name={icon} size={18} color={fg} strokeWidth={2.4} /> : null}
        <AppText weight="semibold" size={15.5} color={fg} letterSpacing={0.2}>
          {label}
        </AppText>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
