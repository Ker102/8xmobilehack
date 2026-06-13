import { Image, type ImageSource } from 'expo-image';
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

const OTTO_IMAGES = {
  rest: require('../../assets/otto/otto_neutral.png'),
  happy: require('../../assets/otto/otto_happy.png'),
  excited: require('../../assets/otto/otto_excited.png'),
  listening: require('../../assets/otto/otto_listening.png'),
  painting: require('../../assets/otto/otto_painting.png'),
  sad: require('../../assets/otto/otto_gentle_sad.png'),
  waving: require('../../assets/otto/otto_waving.png'),
} satisfies Record<string, ImageSource>;

type OttoProps = {
  size?: number;
  energy?: 'rest' | 'happy';
  state?: keyof typeof OTTO_IMAGES;
  /** show a soft circular tile behind the mascot (the art itself is transparent) */
  disc?: boolean;
  style?: ViewStyle;
};

export function Otto({ size = 140, energy = 'rest', state, disc = false, style }: OttoProps) {
  const bob = useSharedValue(0);
  const imageState = state ?? energy;

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

  const imgInset = disc ? size * 0.08 : 0;
  const imgSize = size - imgInset * 2;
  const cropScale = imageState === 'painting' ? 1.32 : 1.24;
  const cropOffset = imageState === 'painting' ? -imgSize * 0.14 : -imgSize * 0.12;

  return (
    <Animated.View style={[animStyle, style]}>
      <View style={discStyle}>
        <Image
          source={OTTO_IMAGES[imageState]}
          style={{
            width: imgSize * cropScale,
            height: imgSize * cropScale,
            transform: [{ translateY: cropOffset }],
          }}
          contentFit="contain"
        />
      </View>
    </Animated.View>
  );
}
