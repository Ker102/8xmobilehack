import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { Icon } from '@/design/Icon';

export function Spinner({ size = 16, color = Colors.light.accent }: { size?: number; color?: string }) {
  const r = useSharedValue(0);
  useEffect(() => {
    r.value = withRepeat(withTiming(360, { duration: 900, easing: Easing.linear }), -1, false);
  }, [r]);
  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${r.value}deg` }] }));
  return (
    <Animated.View style={style}>
      <Icon name="loader" size={size} color={color} strokeWidth={2.4} />
    </Animated.View>
  );
}
