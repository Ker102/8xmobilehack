import { useEffect, useState } from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppText, type AppTextProps } from '@/design/Text';

type NumberTickerProps = AppTextProps & {
  value: number;
  duration?: number;
  format?: (n: number) => string;
};

/** Count-up number (MagicUI-style), driven by Reanimated so it runs on web + native. */
export function NumberTicker({ value, duration = 900, format, ...textProps }: NumberTickerProps) {
  const sv = useSharedValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    sv.value = withTiming(value, { duration, easing: Easing.out(Easing.cubic) });
  }, [sv, value, duration]);

  useAnimatedReaction(
    () => sv.value,
    (v) => runOnJS(setDisplay)(Math.round(v)),
  );

  return <AppText {...textProps}>{format ? format(display) : `${display}`}</AppText>;
}
