import { Image } from 'expo-image';
import { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Colors, Shadow } from '@/constants/theme';

const OTTO_SRC = require('@/assets/images/otto.png');

type OttoProps = {
  size?: number;
  energy?: 'rest' | 'happy';
  /** show a soft circular tile behind the mascot (the art itself is transparent) */
  disc?: boolean;
  style?: ViewStyle;
};

export function Otto({ size = 140, energy = 'rest', disc = false, style }: OttoProps) {
  const bob = useSharedValue(0);

  useEffect(() => {
    const amp = energy === 'happy' ? 5 : 3;
    const dur = energy === 'happy' ? 1150 : 1700;
    bob.value = withRepeat(withTiming(-amp, { duration: dur, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [bob, energy]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bob.value }] }));

  const discStyle: ViewStyle = disc
    ? {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.borderSoft,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.card,
      }
    : { width: size, height: size, alignItems: 'center', justifyContent: 'center' };

  const imgInset = disc ? size * 0.1 : 0;

  return (
    <Animated.View style={[animStyle, style]}>
      <View style={discStyle}>
        <Image
          source={OTTO_SRC}
          style={{ width: size - imgInset * 2, height: size - imgInset * 2 }}
          contentFit="contain"
        />
      </View>
    </Animated.View>
  );
}
