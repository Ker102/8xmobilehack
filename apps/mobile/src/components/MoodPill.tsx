import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { MOODS, type MoodId } from '@/core/types';
import { AppText } from '@/design/Text';

export function MoodPill({ mood }: { mood: MoodId }) {
  const m = MOODS[mood];
  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: m.color }]} />
      <AppText size={12.5} weight="medium" color={m.color} letterSpacing={0.2}>
        {m.label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  dot: { width: 7, height: 7, borderRadius: 4 },
});
